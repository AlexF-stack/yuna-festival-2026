import sharp from "sharp";
import { stat } from "node:fs/promises";

const FILES = [
  "crowd",
  "concert",
  "hero-plate-a",
  "festival",
  "hero-plate-b",
  "worship",
];

for (const name of FILES) {
  const src = `public/media/${name}.jpg`;
  const out = `public/media/${name}.webp`;
  await sharp(src).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 68 }).toFile(out);
  const a = await stat(src);
  const b = await stat(out);
  console.log(`${name}: ${(a.size / 1024).toFixed(0)} Ko -> ${(b.size / 1024).toFixed(0)} Ko`);
}
