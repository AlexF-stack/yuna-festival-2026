"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import * as THREE from "three";

const OUTPUT_WIDTH = 720;
const OUTPUT_HEIGHT = 1280;

function createFlameGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, -1.35);
  shape.bezierCurveTo(-0.9, -0.85, -1.12, 0.05, -0.55, 0.82);
  shape.bezierCurveTo(-0.2, 1.3, -0.18, 1.78, 0.08, 2.2);
  shape.bezierCurveTo(0.82, 1.37, 1.04, 0.45, 0.68, -0.12);
  shape.bezierCurveTo(1.1, 0.18, 1.32, 0.7, 1.15, 1.12);
  shape.bezierCurveTo(1.8, 0.18, 1.3, -0.98, 0, -1.35);
  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.42,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.11,
    bevelThickness: 0.1,
    curveSegments: 28,
  });
}

function createEmblem() {
  const group = new THREE.Group();

  const flame = new THREE.Mesh(
    createFlameGeometry(),
    new THREE.MeshPhysicalMaterial({
      color: 0xff3b00,
      emissive: 0x6b1300,
      emissiveIntensity: 0.45,
      metalness: 0.15,
      roughness: 0.28,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
    }),
  );
  flame.geometry.center();
  flame.position.y = 0.45;
  flame.castShadow = true;
  group.add(flame);

  const innerFlame = new THREE.Mesh(
    createFlameGeometry(),
    new THREE.MeshPhysicalMaterial({
      color: 0xfcd116,
      emissive: 0xff7a00,
      emissiveIntensity: 0.8,
      roughness: 0.25,
      clearcoat: 1,
    }),
  );
  innerFlame.geometry.center();
  innerFlame.scale.setScalar(0.44);
  innerFlame.position.set(0.03, 0.18, 0.35);
  group.add(innerFlame);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.72, 0.12, 24, 96),
    new THREE.MeshPhysicalMaterial({
      color: 0x0077bb,
      metalness: 0.35,
      roughness: 0.2,
      clearcoat: 1,
    }),
  );
  halo.position.z = -0.28;
  group.add(halo);

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1.7, 1.92, 0.34, 80),
    new THREE.MeshPhysicalMaterial({
      color: 0x004e7a,
      metalness: 0.55,
      roughness: 0.22,
      clearcoat: 0.8,
    }),
  );
  base.rotation.x = Math.PI / 2;
  base.position.set(0, -1.72, 0.05);
  base.castShadow = true;
  group.add(base);

  group.rotation.x = -0.08;
  return group;
}

function drawVideoCover(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
) {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh) return false;
  const scale = Math.max(OUTPUT_WIDTH / vw, OUTPUT_HEIGHT / vh);
  const w = vw * scale;
  const h = vh * scale;
  ctx.drawImage(
    video,
    (OUTPUT_WIDTH - w) / 2,
    (OUTPUT_HEIGHT - h) / 2,
    w,
    h,
  );
  return true;
}

function drawRecordingBrand(ctx: CanvasRenderingContext2D) {
  const shade = ctx.createLinearGradient(0, 0, 0, OUTPUT_HEIGHT);
  shade.addColorStop(0, "rgba(10,14,20,.55)");
  shade.addColorStop(0.24, "rgba(10,14,20,0)");
  shade.addColorStop(0.72, "rgba(10,14,20,0)");
  shade.addColorStop(1, "rgba(0,78,122,.78)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);

  ctx.textAlign = "center";
  ctx.fillStyle = "#FCD116";
  ctx.font = "700 23px monospace";
  ctx.fillText("YUNA FESTIVAL · 2026", OUTPUT_WIDTH / 2, 54);
  ctx.fillStyle = "#FFF8F1";
  ctx.font = "800 52px system-ui, sans-serif";
  ctx.fillText("BÉNIN DEBOUT", OUTPUT_WIDTH / 2, 112);

  ctx.fillStyle = "#FFF8F1";
  ctx.font = "italic 500 24px system-ui, sans-serif";
  ctx.fillText(
    "« Lève-toi, sois éclairée… »",
    OUTPUT_WIDTH / 2,
    OUTPUT_HEIGHT - 62,
  );
  ctx.fillStyle = "#FCD116";
  ctx.font = "700 18px monospace";
  ctx.fillText("ÉSAÏE 60:1", OUTPUT_WIDTH / 2, OUTPUT_HEIGHT - 30);
}

export function FlameAtHomeClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const scaleRef = useRef(1);
  const rotationRef = useRef(0);
  const recordingRef = useRef(false);

  const [cameraOn, setCameraOn] = useState(false);
  const [recording, setRecording] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [hint, setHint] = useState(
    "Autorise la caméra, puis place la flamme dans ton espace.",
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const output = canvas.getContext("2d");
    if (!output) return;

    const renderCanvas = document.createElement("canvas");
    const renderer = new THREE.WebGLRenderer({
      canvas: renderCanvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(OUTPUT_WIDTH, OUTPUT_HEIGHT, false);
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      34,
      OUTPUT_WIDTH / OUTPUT_HEIGHT,
      0.1,
      100,
    );
    camera.position.set(0, 0.2, 10);

    scene.add(new THREE.HemisphereLight(0xfff4d6, 0x003d66, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(4, 6, 7);
    key.castShadow = true;
    scene.add(key);
    const warm = new THREE.PointLight(0xff6a00, 26, 16);
    warm.position.set(-3, 1, 5);
    scene.add(warm);

    const group = createEmblem();
    group.position.set(0, -0.45, 0);
    groupRef.current = group;
    scene.add(group);

    let frame = 0;
    let disposed = false;
    const render = (time: number) => {
      if (disposed) return;
      frame = requestAnimationFrame(render);

      if (!dragRef.current && !recordingRef.current) {
        group.rotation.y += 0.0025;
      }
      group.scale.setScalar(scaleRef.current);
      group.rotation.z = (rotationRef.current * Math.PI) / 180;

      renderer.render(scene, camera);

      output.clearRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);
      const video = videoRef.current;
      const hasVideo =
        video &&
        video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        drawVideoCover(output, video);
      if (!hasVideo) {
        const bg = output.createLinearGradient(0, 0, 0, OUTPUT_HEIGHT);
        bg.addColorStop(0, "#0A0E14");
        bg.addColorStop(0.55, "#004E7A");
        bg.addColorStop(1, "#0077BB");
        output.fillStyle = bg;
        output.fillRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);
      }
      output.drawImage(renderer.domElement, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);
      drawRecordingBrand(output);

      // Sol lumineux sous l’emblème
      output.save();
      output.globalCompositeOperation = "screen";
      const glow = output.createRadialGradient(
        OUTPUT_WIDTH / 2,
        865,
        5,
        OUTPUT_WIDTH / 2,
        865,
        170,
      );
      glow.addColorStop(0, "rgba(255,138,26,.32)");
      glow.addColorStop(1, "rgba(255,59,0,0)");
      output.fillStyle = glow;
      output.fillRect(160, 700, 400, 330);
      output.restore();

      if (time % 5000 < 17) {
        // Maintient une frame récente pour captureStream sur navigateurs mobiles.
        canvas.dispatchEvent(new Event("frame"));
      }
    };
    frame = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  async function startCamera() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setHint("La caméra n’est pas disponible sur ce navigateur.");
      return;
    }
    try {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;
      await video.play();
      streamRef.current = stream;
      videoRef.current = video;
      setCameraOn(true);
      setHint("Glisse la flamme, ajuste sa taille, puis lance la vidéo.");
    } catch {
      setHint(
        "Accès caméra refusé. Autorise la caméra dans ton navigateur et réessaie.",
      );
    }
  }

  function canvasPoint(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
    };
  }

  function onPointerDown(event: PointerEvent<HTMLCanvasElement>) {
    const p = canvasPoint(event);
    dragRef.current = p;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLCanvasElement>) {
    if (!dragRef.current || !groupRef.current) return;
    const p = canvasPoint(event);
    groupRef.current.position.x += (p.x - dragRef.current.x) * 4.5;
    groupRef.current.position.y += (p.y - dragRef.current.y) * 7.8;
    groupRef.current.position.x = THREE.MathUtils.clamp(
      groupRef.current.position.x,
      -2.8,
      2.8,
    );
    groupRef.current.position.y = THREE.MathUtils.clamp(
      groupRef.current.position.y,
      -4.2,
      4,
    );
    dragRef.current = p;
  }

  function onPointerUp(event: PointerEvent<HTMLCanvasElement>) {
    dragRef.current = null;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* ignore */
    }
  }

  function preferredVideoType() {
    const types = [
      "video/webm;codecs=vp9",
      "video/webm;codecs=vp8",
      "video/webm",
    ];
    return types.find((type) => MediaRecorder.isTypeSupported(type)) ?? "";
  }

  function startRecording() {
    const canvas = canvasRef.current;
    if (!canvas || typeof MediaRecorder === "undefined") {
      setHint("L’enregistrement vidéo n’est pas disponible sur ce navigateur.");
      return;
    }
    const stream = canvas.captureStream(30);
    const type = preferredVideoType();
    const recorder = new MediaRecorder(stream, type ? { mimeType: type } : {});
    chunksRef.current = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size) chunksRef.current.push(event.data);
    };
    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, {
        type: recorder.mimeType || "video/webm",
      });
      const extension = recorder.mimeType.includes("mp4") ? "mp4" : "webm";
      const file = new File([blob], `yuna-flamme-chez-moi.${extension}`, {
        type: blob.type,
      });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "La flamme chez moi — YUNA 2026",
            text: "Bénin Debout · Ésaïe 60:1",
          });
          setHint("Vidéo prête à partager.");
          return;
        } catch {
          /* partage annulé : proposer le téléchargement */
        }
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(url);
      setHint("Vidéo téléchargée — partage-la sur tes réseaux.");
    };
    recorderRef.current = recorder;
    recorder.start(250);
    recordingRef.current = true;
    setRecording(true);
    setHint("Ça tourne… déplace-toi autour de la flamme.");
  }

  function stopRecording() {
    recorderRef.current?.stop();
    recorderRef.current = null;
    recordingRef.current = false;
    setRecording(false);
  }

  function resetPlacement() {
    if (!groupRef.current) return;
    groupRef.current.position.set(0, -0.45, 0);
    groupRef.current.rotation.set(-0.08, 0, 0);
    scaleRef.current = 1;
    rotationRef.current = 0;
    setScale(1);
    setRotation(0);
  }

  return (
    <div className="mx-auto grid max-w-[1080px] gap-10 min-[900px]:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.55fr)] min-[900px]:items-start">
      <div className="mx-auto w-full max-w-[520px]">
        <div className="relative overflow-hidden rounded-[2rem] bg-nuit-profonde p-2.5 shadow-[0_30px_80px_rgba(0,40,80,.35)]">
          <canvas
            ref={canvasRef}
            width={OUTPUT_WIDTH}
            height={OUTPUT_HEIGHT}
            className="aspect-[9/16] w-full touch-none rounded-[1.5rem] bg-bleu"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />
          {recording ? (
            <span className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-nuit-profonde/75 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-papier backdrop-blur">
              <span className="size-2 animate-pulse rounded-full bg-rouge" />
              REC
            </span>
          ) : null}
        </div>
      </div>

      <div className="min-[900px]:sticky min-[900px]:top-28">
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
          Expérience caméra
        </p>
        <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.2rem)] font-extrabold uppercase leading-[0.98] text-bleu">
          Pose la flamme.{" "}
          <span className="text-feu">Fais tourner.</span>
        </h2>
        <p className="mt-4 leading-relaxed text-charbon">
          Utilise la caméra arrière, place l’emblème dans ton salon, ta chambre
          ou ton église, puis enregistre une vidéo verticale prête pour tes
          réseaux.
        </p>

        <div className="mt-7 space-y-4">
          <button
            type="button"
            onClick={() => void startCamera()}
            className="btn-cta-flame inline-flex min-h-12 w-full items-center justify-center rounded-full px-7 py-3.5 font-bold text-papier"
          >
            {cameraOn ? "Relancer la caméra" : "Activer la caméra"}
          </button>

          <label className="block rounded-2xl border border-bleu/12 bg-papier p-4">
            <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-charbon/70">
              Taille de l’emblème
            </span>
            <input
              type="range"
              min={0.55}
              max={1.65}
              step={0.01}
              value={scale}
              onChange={(event) => {
                const value = Number(event.target.value);
                scaleRef.current = value;
                setScale(value);
              }}
              className="mt-3 w-full accent-feu"
            />
          </label>

          <label className="block rounded-2xl border border-bleu/12 bg-papier p-4">
            <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-charbon/70">
              Inclinaison
            </span>
            <input
              type="range"
              min={-25}
              max={25}
              step={1}
              value={rotation}
              onChange={(event) => {
                const value = Number(event.target.value);
                rotationRef.current = value;
                setRotation(value);
              }}
              className="mt-3 w-full accent-bleu"
            />
          </label>

          <button
            type="button"
            onClick={resetPlacement}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-bleu/20 px-6 py-3 text-sm font-bold text-bleu"
          >
            Recentrer la flamme
          </button>

          {recording ? (
            <button
              type="button"
              onClick={stopRecording}
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-rouge px-7 py-4 font-bold text-papier"
            >
              Arrêter et partager
            </button>
          ) : (
            <button
              type="button"
              disabled={!cameraOn}
              onClick={startRecording}
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-bleu px-7 py-4 font-bold text-papier disabled:cursor-not-allowed disabled:opacity-45"
            >
              Enregistrer la vidéo
            </button>
          )}
        </div>

        <p className="mt-5 rounded-2xl bg-logo-feu-soft px-4 py-3 text-sm leading-relaxed text-charbon">
          {hint}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-charbon/60">
          La caméra reste sur ton appareil. Aucune image ni vidéo n’est envoyée
          au serveur.
        </p>
      </div>
    </div>
  );
}
