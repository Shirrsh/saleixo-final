/* One-off script: crop existing selected-work source images down to true,
 * undistorted 1200x630 OG derivatives. Not part of the build pipeline —
 * run once with `node scripts/gen-og-images.cjs`, then delete or keep for
 * future re-generation. Uses sharp's fit:'cover' which preserves aspect
 * ratio while scaling (crops overflow, never stretches). */
const sharp = require('sharp');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src', 'assets', 'selected-work');
// Output to public/ (not src/assets/) so these get a stable, unhashed URL
// (e.g. /og/home-og.jpg) that scripts/prerender-meta.js can reference
// directly without needing Vite's build manifest to resolve a hashed name.
const OUT_DIR = path.join(__dirname, '..', 'public', 'og');

const jobs = [
  { src: 'jewelry-earrings-hero.webp', out: 'home-og.jpg', label: 'home' },
  { src: 'beauty-amber-bottle.webp', out: 'services-og.jpg', label: 'services index' },
  { src: 'handmade-pottery.webp', out: 'about-og.jpg', label: 'about' },
  { src: 'wellness-gift-flatlay.webp', out: 'blog-og.jpg', label: 'blog listing' },
];

(async () => {
  for (const job of jobs) {
    const inputPath = path.join(SRC_DIR, job.src);
    const outputPath = path.join(OUT_DIR, job.out);
    await sharp(inputPath)
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 90 })
      .toFile(outputPath);
    const meta = await sharp(outputPath).metadata();
    console.log(`${job.label}: ${job.src} -> ${job.out} (${meta.width}x${meta.height})`);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
