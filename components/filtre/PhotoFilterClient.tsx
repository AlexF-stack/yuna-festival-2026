"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { FESTIVAL } from "@/lib/festival";

const SIZE = 1080;
const CIRCLE = { cx: 540, cy: 460, r: 340 };

type PhotoState = {
  img: HTMLImageElement;
  offsetX: number;
  offsetY: number;
  scale: number;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image"));
    img.src = src;
  });
}

function coverScale(img: HTMLImageElement, diameter: number) {
  return Math.max(diameter / img.naturalWidth, diameter / img.naturalHeight);
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawFlame(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  color: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-28, -40, -42, -90, -8, -150);
  ctx.bezierCurveTo(-20, -110, 8, -100, 12, -130);
  ctx.bezierCurveTo(48, -80, 36, -30, 0, 0);
  ctx.fill();
  ctx.restore();
}

/**
 * Filtre photo officiel Bénin Debout — cadre circulaire + branding YUNA.
 */
export function PhotoFilterClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const photoRef = useRef<PhotoState | null>(null);
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [busy, setBusy] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  const paint = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!logoRef.current) {
      try {
        logoRef.current = await loadImage("/brand/yuna-mark.png");
      } catch {
        logoRef.current = null;
      }
    }

    ctx.clearRect(0, 0, SIZE, SIZE);

    // Fond — flammes haut / bleu bas
    const sky = ctx.createLinearGradient(0, 0, 0, SIZE * 0.55);
    sky.addColorStop(0, "#FF8A1A");
    sky.addColorStop(0.35, "#FF3B00");
    sky.addColorStop(0.7, "#C92E00");
    sky.addColorStop(1, "#0077BB");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, SIZE, SIZE * 0.52);

    ctx.fillStyle = "#0077BB";
    ctx.fillRect(0, SIZE * 0.48, SIZE, SIZE * 0.52);

    // Halo flamme droite
    drawFlame(ctx, 860, 780, 2.4, "rgba(255, 255, 255, 0.12)");
    drawFlame(ctx, 820, 740, 1.6, "rgba(255, 193, 77, 0.22)");

    // Photo dans le cercle
    const photo = photoRef.current;
    ctx.save();
    ctx.beginPath();
    ctx.arc(CIRCLE.cx, CIRCLE.cy, CIRCLE.r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    if (photo) {
      const base = coverScale(photo.img, CIRCLE.r * 2);
      const s = base * photo.scale;
      const w = photo.img.naturalWidth * s;
      const h = photo.img.naturalHeight * s;
      ctx.drawImage(
        photo.img,
        CIRCLE.cx - w / 2 + photo.offsetX,
        CIRCLE.cy - h / 2 + photo.offsetY,
        w,
        h,
      );
    } else {
      ctx.fillStyle = "#0A0E14";
      ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = "rgba(255,248,241,0.55)";
      ctx.font = "600 42px 'Space Grotesk', system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Ta photo ici", CIRCLE.cx, CIRCLE.cy);
    }
    ctx.restore();

    // Anneau cercle
    ctx.beginPath();
    ctx.arc(CIRCLE.cx, CIRCLE.cy, CIRCLE.r + 6, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,248,241,0.35)";
    ctx.lineWidth = 10;
    ctx.stroke();

    // Thème
    ctx.textAlign = "center";
    ctx.fillStyle = "#FCD116";
    ctx.font = "800 28px 'JetBrains Mono', monospace";
    ctx.fillText("BÉNIN DEBOUT · 2026", CIRCLE.cx, 78);

    // Verset
    ctx.fillStyle = "rgba(255,248,241,0.92)";
    ctx.font = "italic 500 26px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillText("« Lève-toi, sois éclairée… »", CIRCLE.cx, SIZE - 56);
    ctx.font = "700 20px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#FCD116";
    ctx.fillText("Ésaïe 60:1", CIRCLE.cx, SIZE - 24);

    // Sticker logo
    const stickerX = 48;
    const stickerY = 760;
    const stickerW = 210;
    const stickerH = 210;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 8;
    ctx.fillStyle = "#FFF8F1";
    drawRoundedRect(ctx, stickerX, stickerY, stickerW, stickerH, 28);
    ctx.fill();
    ctx.restore();

    if (logoRef.current) {
      const pad = 22;
      const logoBox = stickerW - pad * 2;
      ctx.drawImage(
        logoRef.current,
        stickerX + pad,
        stickerY + 14,
        logoBox,
        logoBox * 0.78,
      );
      ctx.fillStyle = "#FF3B00";
      ctx.font = "800 34px 'Baloo 2', system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("YUNA", stickerX + stickerW / 2, stickerY + stickerH - 48);
      ctx.fillStyle = "#0077BB";
      ctx.font = "700 20px 'Space Grotesk', system-ui, sans-serif";
      ctx.fillText("festival", stickerX + stickerW / 2, stickerY + stickerH - 22);
    }

    // « j'y serai »
    ctx.save();
    ctx.translate(720, 900);
    ctx.rotate((-8 * Math.PI) / 180);
    ctx.font = "800 72px 'Baloo 2', system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillStyle = "#FF3B00";
    ctx.fillText("j'y serai", 4, 6);
    ctx.fillStyle = "#FFF8F1";
    ctx.fillText("j'y serai", 0, 0);
    ctx.restore();
  }, []);

  useEffect(() => {
    void paint();
  }, [paint, hasPhoto, scale]);

  async function onFile(file: File | null) {
    if (!file || !file.type.startsWith("image/")) return;
    setBusy(true);
    setHint(null);
    try {
      const url = URL.createObjectURL(file);
      const img = await loadImage(url);
      photoRef.current = {
        img,
        offsetX: 0,
        offsetY: 0,
        scale: 1,
      };
      setScale(1);
      setHasPhoto(true);
      await paint();
    } catch {
      setHint("Impossible de lire cette image. Réessaie avec un JPG ou PNG.");
    } finally {
      setBusy(false);
    }
  }

  function pointerToCanvas(clientX: number, clientY: number) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const sx = SIZE / rect.width;
    const sy = SIZE / rect.height;
    return {
      x: (clientX - rect.left) * sx,
      y: (clientY - rect.top) * sy,
    };
  }

  function onPointerDown(e: PointerEvent<HTMLCanvasElement>) {
    if (!photoRef.current) return;
    const p = pointerToCanvas(e.clientX, e.clientY);
    const dx = p.x - CIRCLE.cx;
    const dy = p.y - CIRCLE.cy;
    if (dx * dx + dy * dy > CIRCLE.r * CIRCLE.r) return;
    dragRef.current = { x: p.x, y: p.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLCanvasElement>) {
    if (!dragRef.current || !photoRef.current) return;
    const p = pointerToCanvas(e.clientX, e.clientY);
    photoRef.current.offsetX += p.x - dragRef.current.x;
    photoRef.current.offsetY += p.y - dragRef.current.y;
    dragRef.current = p;
    void paint();
  }

  function onPointerUp(e: PointerEvent<HTMLCanvasElement>) {
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }

  function onScaleChange(value: number) {
    setScale(value);
    if (photoRef.current) {
      photoRef.current.scale = value;
      void paint();
    }
  }

  async function onDownload() {
    const canvas = canvasRef.current;
    if (!canvas || !photoRef.current) {
      setHint("Ajoute d’abord ta photo.");
      return;
    }
    setBusy(true);
    try {
      await paint();
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) throw new Error("blob");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `yuna-benin-debout-jy-serai.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setHint("Téléchargement impossible pour le moment.");
    } finally {
      setBusy(false);
    }
  }

  async function onShare() {
    const canvas = canvasRef.current;
    if (!canvas || !photoRef.current) {
      setHint("Ajoute d’abord ta photo.");
      return;
    }
    setBusy(true);
    try {
      await paint();
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) throw new Error("blob");
      const file = new File([blob], "yuna-benin-debout.png", {
        type: "image/png",
      });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "YUNA 2026 — Bénin Debout",
          text: `J'y serai — ${FESTIVAL.theme} · ${FESTIVAL.datesShort}`,
        });
        return;
      }
      await onDownload();
      setHint("Image téléchargée — partage-la sur tes réseaux.");
    } catch {
      /* annulé */
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="overflow-hidden rounded-[1.5rem] bg-nuit-profonde p-3 shadow-[0_28px_70px_rgba(0,40,80,0.28)] sm:p-4">
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className="aspect-square w-full touch-none rounded-[1.1rem] bg-bleu"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="user"
        className="sr-only"
        onChange={(e) => void onFile(e.target.files?.[0] ?? null)}
      />

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="btn-cta-flame inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3.5 text-[0.95rem] font-bold text-papier disabled:opacity-60"
        >
          {hasPhoto ? "Changer de photo" : "Prendre / choisir ma photo"}
        </button>

        {hasPhoto ? (
          <label className="block rounded-2xl border border-bleu/12 bg-papier px-4 py-3">
            <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-charbon/70">
              Zoom
            </span>
            <input
              type="range"
              min={1}
              max={2.4}
              step={0.02}
              value={scale}
              onChange={(e) => onScaleChange(Number(e.target.value))}
              className="mt-2 w-full accent-feu"
            />
            <p className="mt-1 text-xs text-charbon/65">
              Glisse la photo dans le cercle pour la recadrer.
            </p>
          </label>
        ) : null}

        <div className="grid gap-2 min-[420px]:grid-cols-2">
          <button
            type="button"
            disabled={busy || !hasPhoto}
            onClick={() => void onDownload()}
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-bleu bg-transparent px-6 py-3 text-sm font-bold text-bleu disabled:opacity-50"
          >
            Télécharger
          </button>
          <button
            type="button"
            disabled={busy || !hasPhoto}
            onClick={() => void onShare()}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-bleu px-6 py-3 text-sm font-bold text-papier disabled:opacity-50"
          >
            Partager
          </button>
        </div>

        {hint ? (
          <p className="text-center text-sm text-charbon">{hint}</p>
        ) : null}

        <ButtonLink href="/#inscription" variant="ghost" className="!px-0">
          Réserver mon pass →
        </ButtonLink>
      </div>
    </div>
  );
}
