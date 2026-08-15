"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { FESTIVAL } from "@/lib/festival";

const SIZE = 1080;
const CIRCLE = { cx: 540, cy: 481, r: 458 };
const FRAME_SRC = "/media/filter-benin-debout-overlay.png";

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

/**
 * Filtre photo officiel Bénin Debout — visuel fourni par l’équipe YUNA.
 */
export function PhotoFilterClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraVideoRef = useRef<HTMLVideoElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<HTMLImageElement | null>(null);
  const photoRef = useRef<PhotoState | null>(null);
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [busy, setBusy] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  const paint = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!frameRef.current) {
      try {
        frameRef.current = await loadImage(FRAME_SRC);
      } catch {
        frameRef.current = null;
      }
    }

    ctx.clearRect(0, 0, SIZE, SIZE);

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
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = "rgba(255,248,241,0.72)";
      ctx.font = "600 42px 'Space Grotesk', system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Ta photo ici", CIRCLE.cx, CIRCLE.cy);
    }
    ctx.restore();

    if (frameRef.current) {
      ctx.drawImage(frameRef.current, 0, 0, SIZE, SIZE);
    }
  }, []);

  useEffect(() => {
    void paint();
  }, [paint, hasPhoto, scale]);

  useEffect(
    () => () => {
      cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
    },
    [],
  );

  function applyPhoto(img: HTMLImageElement) {
    photoRef.current = {
      img,
      offsetX: 0,
      offsetY: 0,
      scale: 1,
    };
    setScale(1);
    setHasPhoto(true);
  }

  async function onFile(file: File | null) {
    if (!file || !file.type.startsWith("image/")) return;
    setBusy(true);
    setHint(null);
    const url = URL.createObjectURL(file);
    try {
      const img = await loadImage(url);
      applyPhoto(img);
      await paint();
    } catch {
      setHint("Impossible de lire cette image. Réessaie avec un JPG ou PNG.");
    } finally {
      URL.revokeObjectURL(url);
      setBusy(false);
    }
  }

  function closeCamera() {
    cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
    cameraStreamRef.current = null;
    if (cameraVideoRef.current) {
      cameraVideoRef.current.srcObject = null;
    }
    setCameraOpen(false);
  }

  async function startCamera() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setHint("La caméra n’est pas disponible sur ce navigateur.");
      return;
    }
    setBusy(true);
    setHint("Autorise la caméra pour prendre ton portrait.");
    try {
      closeCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "user" },
          width: { ideal: 1280 },
          height: { ideal: 1280 },
        },
        audio: false,
      });
      cameraStreamRef.current = stream;
      setCameraOpen(true);
      const video = cameraVideoRef.current;
      if (!video) throw new Error("video");
      video.srcObject = stream;
      await video.play();
      setHint("Cadre ton visage puis appuie sur « Capturer ».");
    } catch {
      closeCamera();
      setHint(
        "Impossible d’ouvrir la caméra. Vérifie son autorisation dans le navigateur.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function capturePhoto() {
    const video = cameraVideoRef.current;
    if (!video?.videoWidth || !video.videoHeight) {
      setHint("La caméra démarre encore. Réessaie dans un instant.");
      return;
    }
    setBusy(true);
    try {
      const snapshot = document.createElement("canvas");
      snapshot.width = video.videoWidth;
      snapshot.height = video.videoHeight;
      const context = snapshot.getContext("2d");
      if (!context) throw new Error("canvas");
      context.translate(snapshot.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, snapshot.width, snapshot.height);
      const img = await loadImage(snapshot.toDataURL("image/jpeg", 0.92));
      applyPhoto(img);
      closeCamera();
      setHint("Photo capturée. Glisse-la dans le cercle pour la recadrer.");
      await paint();
    } catch {
      setHint("La capture a échoué. Réessaie ou choisis une photo.");
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
        className="sr-only"
        onChange={(e) => void onFile(e.target.files?.[0] ?? null)}
      />

      <div
        className={
          cameraOpen
            ? "mt-5 overflow-hidden rounded-[1.5rem] border border-bleu/15 bg-nuit-profonde p-3"
            : "pointer-events-none h-px w-px overflow-hidden opacity-0"
        }
        aria-hidden={!cameraOpen}
      >
        <video
          ref={cameraVideoRef}
          muted
          playsInline
          autoPlay
          className="aspect-square w-full scale-x-[-1] rounded-[1rem] bg-charbon object-cover"
        />
        {cameraOpen ? (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={closeCamera}
              className="min-h-11 rounded-full border border-papier/40 px-4 text-sm font-bold text-papier"
            >
              Annuler
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void capturePhoto()}
              className="min-h-11 rounded-full bg-feu px-4 text-sm font-bold text-papier"
            >
              Capturer
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <div className="grid gap-2 min-[420px]:grid-cols-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-feu bg-transparent px-6 py-3 text-sm font-bold text-feu disabled:opacity-60"
          >
            {hasPhoto ? "Changer la photo" : "Choisir une photo"}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void startCamera()}
            className="btn-cta-flame inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-papier disabled:opacity-60"
          >
            Prendre une photo
          </button>
        </div>

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
