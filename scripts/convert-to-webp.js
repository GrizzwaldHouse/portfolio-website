const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'images', 'projects');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp') && f !== 'placeholder.webp');

async function convert() {
  for (const file of files) {
    const fp = path.join(dir, file);
    const buf = await sharp(fp).webp({ quality: 85 }).toBuffer();
    fs.writeFileSync(fp, buf);
    console.log('  Converted ' + file + ' (' + Math.round(buf.length / 1024) + 'KB)');
  }
  console.log('Done: ' + files.length + ' files converted to proper webp.');
}

convert().catch(e => {
  console.error(e);
  process.exit(1);
});
