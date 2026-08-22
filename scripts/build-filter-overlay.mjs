import fs from "fs";
import sharp from "sharp";

const src =
  process.argv[2] ||
  "C:/Users/ALEX/.cursor/projects/c-Users-ALEX-Desktop-yuna-festival-2026/assets/c__Users_ALEX_AppData_Roaming_Cursor_User_workspaceStorage_08dd6b71cff375d8f94c456a43ba871d_images_Template_J_y_serai-f9d3cad7-713c-496e-9f2b-bd82708c4ca3.jpg";

const SIZE = 1024;
/** Cadre photo complet (la mention J’Y SERAI est reposée par-dessus). */
const HOLE = { x: 486, y: 269, w: 461, h: 471, r: 28 };

const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
    <rect x="${HOLE.x}" y="${HOLE.y}" width="${HOLE.w}" height="${HOLE.h}" rx="${HOLE.r}" ry="${HOLE.r}" fill="white"/>
  </svg>`,
);

const punched = await sharp(src)
  .resize(SIZE, SIZE, { fit: "fill" })
  .ensureAlpha()
  .composite([{ input: mask, blend: "dest-out" }])
  .raw()
  .toBuffer({ resolveWithObject: true });

const original = await sharp(src)
  .resize(SIZE, SIZE, { fit: "fill" })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { data, info } = punched;
const srcData = original.data;
const { width, height, channels } = info;

// Remettre « J’Y SERAI » (et son halo) au-dessus de la zone photo.
for (let y = 690; y < 745; y++) {
  for (let x = 520; x < 920; x++) {
    const i = (y * width + x) * channels;
    const r = srcData[i];
    const g = srcData[i + 1];
    const b = srcData[i + 2];
    const isText = r > 140 && g > 50 && b < 130 && r > g && g > b;
    const isHalo =
      r > 80 && g > 30 && b < 100 && r > g + 10 && Math.max(r, g, b) > 100;
    if (isText || isHalo) {
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = 255;
    }
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png({
    compressionLevel: 9,
    palette: true,
    quality: 85,
    effort: 10,
    colors: 256,
  })
  .toFile("public/media/filter-jy-serai-overlay.png");

const png = fs.statSync("public/media/filter-jy-serai-overlay.png").size;
let transparent = 0;
for (let i = 3; i < data.length; i += 4) {
  if (data[i] === 0) transparent += 1;
}

console.log({ png, transparent, HOLE });
