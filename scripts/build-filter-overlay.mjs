import fs from "fs";
import sharp from "sharp";

const src =
  process.argv[2] ||
  "C:/Users/ALEX/.cursor/projects/c-Users-ALEX-Desktop-yuna-festival-2026/assets/c__Users_ALEX_AppData_Roaming_Cursor_User_workspaceStorage_08dd6b71cff375d8f94c456a43ba871d_images_Template_J_y_serai-f9d3cad7-713c-496e-9f2b-bd82708c4ca3.jpg";

const SIZE = 1024;
const HOLE = { x: 488, y: 271, w: 458, h: 277, r: 28 };

const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
    <rect x="${HOLE.x}" y="${HOLE.y}" width="${HOLE.w}" height="${HOLE.h}" rx="${HOLE.r}" ry="${HOLE.r}" fill="white"/>
  </svg>`,
);

await sharp(src)
  .resize(SIZE, SIZE, { fit: "fill" })
  .ensureAlpha()
  .composite([{ input: mask, blend: "dest-out" }])
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile("public/media/filter-jy-serai-overlay.png");

await sharp("public/media/filter-jy-serai-overlay.png")
  .webp({ quality: 92, alphaQuality: 100, effort: 6 })
  .toFile("public/media/filter-jy-serai-overlay.webp");

const png = fs.statSync("public/media/filter-jy-serai-overlay.png").size;
const webp = fs.statSync("public/media/filter-jy-serai-overlay.webp").size;
const { data } = await sharp("public/media/filter-jy-serai-overlay.png")
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

let transparent = 0;
let semi = 0;
for (let i = 3; i < data.length; i += 4) {
  if (data[i] === 0) transparent += 1;
  else if (data[i] < 255) semi += 1;
}

console.log({ png, webp, transparent, semi, HOLE });
