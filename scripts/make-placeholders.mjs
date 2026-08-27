// One-shot script: generate minimal valid PNG placeholders for missing public assets.
// Run: node scripts/make-placeholders.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, "..");

function crc32(buf) {
  let table = (crc32._t ||= (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })());
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = (table[(c ^ buf[i]) & 0xff] ^ (c >>> 8)) >>> 0;
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function makePng(width, height, paint) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // color type: RGBA
  ihdr[10] = 0;  // compression
  ihdr[11] = 0;  // filter
  ihdr[12] = 0;  // interlace
  const rows = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 4);
    row[0] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = paint(x, y, width, height);
      const o = 1 + x * 4;
      row[o] = r;
      row[o + 1] = g;
      row[o + 2] = b;
      row[o + 3] = a;
    }
    rows.push(row);
  }
  const raw = Buffer.concat(rows);
  const idatData = zlib.deflateSync(raw);
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idatData),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function ensure(file) {
  mkdirSync(dirname(file), { recursive: true });
}

// Background: dark green gradient with subtle vignette
const bg = makePng(512, 512, (x, y, w, h) => {
  const cx = w / 2, cy = h / 2;
  const dx = (x - cx) / cx, dy = (y - cy) / cy;
  const d = Math.sqrt(dx * dx + dy * dy);
  const t = y / h;
  const r = Math.round(10 + (6 - 10) * t);
  const g = Math.round(142 + (180 - 142) * t);
  const b = Math.round(117 + (152 - 117) * t);
  const vignette = Math.max(0, 1 - d * 0.6);
  return [
    Math.round(r * vignette),
    Math.round(g * vignette),
    Math.round(b * vignette),
    255,
  ];
});
ensure(resolve(root, "public/images/bg-profile.png"));
writeFileSync(resolve(root, "public/images/bg-profile.png"), bg);
console.log("wrote public/images/bg-profile.png", bg.length, "bytes");

// Portrait silhouette placeholder
const profile = makePng(256, 256, (x, y, w, h) => {
  const cx = w / 2, cy = h * 0.55;
  const dx = x - cx, dy = y - cy;
  const r = Math.min(w, h) * 0.35;
  const head = (dx * dx + dy * dy) < r * r;
  const shoulderY = h * 0.78;
  const shoulder = Math.abs(dx) < w * 0.32 && y > shoulderY;
  if (head || shoulder) return [16, 185, 129, 255];
  return [10, 10, 15, 255];
});
ensure(resolve(root, "public/profile-cut.png"));
writeFileSync(resolve(root, "public/profile-cut.png"), profile);
console.log("wrote public/profile-cut.png", profile.length, "bytes");

// 1x1 transparent PNG fallback for the font (we keep the @font-face url pointing
// at /fonts/pure-dance-sans.ttf; runtime request will 404 but the build resolves).
const placeholderFont = makePng(1, 1, () => [0, 0, 0, 0]);
ensure(resolve(root, "public/fonts/pure-dance-sans.ttf"));
writeFileSync(resolve(root, "public/fonts/pure-dance-sans.ttf"), placeholderFont);
console.log("wrote public/fonts/pure-dance-sans.ttf (1x1 PNG placeholder)");

console.log("done");
