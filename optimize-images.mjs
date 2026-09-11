/**
 * Image optimization script
 * Converts all large PNGs to WebP for significantly smaller file sizes
 * while preserving originals as fallbacks.
 * Run with: node optimize-images.mjs
 */
import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const directories = [
  './public/projects',
  './public',
];

let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let converted = 0;

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  
  // Skip if webp already exists and is newer
  if (existsSync(webpPath)) {
    const origStat = statSync(filePath);
    const webpStat = statSync(webpPath);
    if (webpStat.mtimeMs > origStat.mtimeMs) {
      console.log(`⏭  Skipping (already up to date): ${basename(webpPath)}`);
      return;
    }
  }

  const originalSize = statSync(filePath).size;
  
  try {
    await sharp(filePath)
      .webp({ 
        quality: 82,      // High quality, good compression
        effort: 6,        // Max compression effort (0-6)
        smartSubsample: true,
        nearLossless: false,
      })
      .toFile(webpPath);

    const optimizedSize = statSync(webpPath).size;
    const saving = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    totalOriginalSize += originalSize;
    totalOptimizedSize += optimizedSize;
    converted++;
    
    console.log(`✅ ${basename(filePath)} → ${basename(webpPath)} | ${(originalSize/1024).toFixed(0)}KB → ${(optimizedSize/1024).toFixed(0)}KB (-${saving}%)`);
  } catch (err) {
    console.error(`❌ Failed: ${basename(filePath)} — ${err.message}`);
  }
}

async function processDirectory(dir) {
  if (!existsSync(dir)) return;
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isFile()) {
      await optimizeImage(filePath);
    }
  }
}

console.log('🚀 Starting image optimization...\n');

for (const dir of directories) {
  await processDirectory(dir);
}

if (converted > 0) {
  const totalSaving = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  console.log(`\n📊 Summary:`);
  console.log(`   Converted: ${converted} images`);
  console.log(`   Original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Optimized total: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total savings: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)} MB (-${totalSaving}%)`);
} else {
  console.log('\n✨ All images already optimized!');
}
