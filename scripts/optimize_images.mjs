/**
 * Image Optimization Pipeline
 * Compresses and resizes character PNGs and movie posters for high-performance delivery.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Dynamic import of sharp from frontend dependencies
const sharpModulePath = path.resolve(ROOT_DIR, 'frontend/node_modules/sharp/dist/index.mjs');
let sharp;
try {
  const mod = await import(`file://${sharpModulePath.replace(/\\/g, '/')}`);
  sharp = mod.default || mod;
} catch (e) {
  try {
    const mod = await import('sharp');
    sharp = mod.default || mod;
  } catch (err) {
    console.error('Error loading sharp module. Please run "npm install --prefix frontend":', err.message);
    process.exit(1);
  }
}

const PUBLIC_DIR = path.resolve(ROOT_DIR, 'frontend/public');
const MOVIES_DIR = path.resolve(ROOT_DIR, 'frontend/public/movies');

async function optimizeDirectory(dir, isMovie = false) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  let totalSaved = 0;
  let totalOrig = 0;
  let optimizedCount = 0;

  console.log(`\n🔍 Scanning directory: ${dir} (${files.length} items)...`);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

    totalOrig += stat.size;

    try {
      const inputBuffer = fs.readFileSync(filePath);
      const image = sharp(inputBuffer);
      const metadata = await image.metadata();

      const maxDimension = isMovie ? 600 : 900;
      let shouldResize = false;
      let targetWidth = metadata.width;
      let targetHeight = metadata.height;

      if (metadata.width > maxDimension || metadata.height > maxDimension) {
        shouldResize = true;
        if (metadata.width >= metadata.height) {
          targetWidth = maxDimension;
          targetHeight = Math.round((metadata.height / metadata.width) * maxDimension);
        } else {
          targetHeight = maxDimension;
          targetWidth = Math.round((metadata.width / metadata.height) * maxDimension);
        }
      }

      let pipeline = sharp(inputBuffer);
      if (shouldResize) {
        pipeline = pipeline.resize(targetWidth, targetHeight, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      let buffer;
      if (ext === '.png') {
        buffer = await pipeline
          .png({
            compressionLevel: 9,
            palette: true,
            quality: 85,
            effort: 7,
          })
          .toBuffer();
      } else {
        buffer = await pipeline
          .jpeg({
            quality: 82,
            mozjpeg: true,
          })
          .toBuffer();
      }

      // If optimized buffer is smaller, replace file
      if (buffer.length < stat.size) {
        fs.writeFileSync(filePath, buffer);
        const saved = stat.size - buffer.length;
        totalSaved += saved;
        optimizedCount++;
        if (stat.size > 200 * 1024) {
          console.log(`  ✓ ${file}: ${(stat.size / 1024).toFixed(0)}KB -> ${(buffer.length / 1024).toFixed(0)}KB (-${((saved / stat.size) * 100).toFixed(0)}%)`);
        }
      }
    } catch (err) {
      console.warn(`  ⚠ Skip ${file}: ${err.message}`);
    }
  }

  console.log(`\n🎉 Finished ${dir}:`);
  console.log(`   Optimized: ${optimizedCount} files`);
  console.log(`   Original: ${(totalOrig / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (-${((totalSaved / totalOrig) * 100).toFixed(1)}%)`);
  console.log(`   New Size: ${((totalOrig - totalSaved) / 1024 / 1024).toFixed(2)} MB`);
}

async function main() {
  console.log('🚀 Starting Marvel Image Optimization Pipeline...');
  await optimizeDirectory(PUBLIC_DIR, false);
  await optimizeDirectory(MOVIES_DIR, true);
  console.log('\n✨ All image optimizations completed successfully!');
}

main().catch(console.error);
