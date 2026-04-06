/**
 * Headshot Image Processing Pipeline
 * Generates responsive sizes in webp format from source headshots.
 *
 * Usage: node scripts/process-headshots.mjs
 */
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';

const INPUT_DIR = '.pipeline/raw';
const OUTPUT_DIR = 'public/images/headshots';
const METADATA_FILE = 'src/data/headshots.json';

const SIZES = {
  thumbnail: { width: 200, height: 200, fit: 'cover' },
  medium: { width: 600, height: 750, fit: 'cover' },
  large: { width: 1200, height: 1500, fit: 'cover' },
};

const CLASSIFICATIONS = {
  'Image-1': { type: 'professional', usage: ['homepage', 'about', 'metadata'], rank: 1 },
  'Image-2': { type: 'professional', usage: ['about-alternate'], rank: 3 },
  'Image-3': { type: 'professional', usage: ['about-alternate'], rank: 2 },
  'IMG_1424': { type: 'graduation', usage: ['education', 'about'], rank: 1 },
  'IMG_1425': { type: 'graduation', usage: ['education-candid'], rank: 2 },
};

async function processImage(filePath, baseName) {
  const classification = CLASSIFICATIONS[baseName] || { type: 'unknown', usage: [], rank: 99 };
  const slug = baseName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const results = [];

  for (const [sizeName, dims] of Object.entries(SIZES)) {
    const outputName = `${slug}-${sizeName}.webp`;
    const outputPath = join(OUTPUT_DIR, outputName);

    const info = await sharp(filePath)
      .resize(dims.width, dims.height, { fit: dims.fit, position: 'top' })
      .webp({ quality: 85 })
      .toFile(outputPath);

    results.push({
      size: sizeName,
      file: outputName,
      path: `/images/headshots/${outputName}`,
      width: info.width,
      height: info.height,
      bytes: info.size,
    });

    console.log(`  [${sizeName}] ${outputName} — ${info.width}x${info.height} (${(info.size / 1024).toFixed(1)}KB)`);
  }

  return {
    id: slug,
    originalFile: `${baseName}.JPG`,
    type: classification.type,
    usage: classification.usage,
    rank: classification.rank,
    sizes: Object.fromEntries(results.map(r => [r.size, r])),
  };
}

async function main() {
  console.log('=== Headshot Processing Pipeline ===\n');

  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = (await readdir(INPUT_DIR)).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  console.log(`Found ${files.length} images to process.\n`);

  const metadata = [];

  for (const file of files) {
    const { name: baseName } = parse(file);
    console.log(`Processing: ${file}`);
    const result = await processImage(join(INPUT_DIR, file), baseName);
    metadata.push(result);
    console.log('');
  }

  // Sort by type then rank
  metadata.sort((a, b) => a.type.localeCompare(b.type) || a.rank - b.rank);

  await writeFile(METADATA_FILE, JSON.stringify(metadata, null, 2));
  console.log(`\nMetadata written to ${METADATA_FILE}`);

  // Summary
  const professional = metadata.filter(m => m.type === 'professional');
  const graduation = metadata.filter(m => m.type === 'graduation');
  const primary = professional.find(p => p.usage.includes('homepage'));

  console.log('\n=== Summary ===');
  console.log(`Professional headshots: ${professional.length}`);
  console.log(`Graduation photos: ${graduation.length}`);
  console.log(`Primary (homepage): ${primary?.originalFile || 'none'}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log('Done.');
}

main().catch(console.error);
