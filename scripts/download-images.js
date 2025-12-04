const fs = require('fs');
const path = require('path');
const https = require('https');
const { parse } = require('csv-parse/sync');

const CSV_PATH = '/Users/richardpaynter/Downloads/export-media-urls-512818.csv';
const OUTPUT_DIR = path.join(__dirname, '../public/images');

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

function getOrganizedPath(url) {
  const urlPath = new URL(url).pathname;
  const parts = urlPath.split('/');

  const year = parts.find(p => /^\d{4}$/.test(p));
  const month = parts.find(p => /^\d{2}$/.test(p));
  const filename = parts[parts.length - 1];

  if (year && month) {
    return path.join(OUTPUT_DIR, year, month, filename);
  }

  return path.join(OUTPUT_DIR, 'misc', filename);
}

async function main() {
  console.log('Reading CSV file...');
  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    bom: true
  });

  console.log(`Found ${records.length} images to download\n`);

  let downloaded = 0;
  let failed = 0;
  const failedUrls = [];

  for (const record of records) {
    const url = record.URL || record.url;
    if (!url) continue;

    const filepath = getOrganizedPath(url);
    const filename = path.basename(filepath);

    try {
      if (fs.existsSync(filepath)) {
        console.log(`⏭️  Skipping (already exists): ${filename}`);
        downloaded++;
      } else {
        process.stdout.write(`⬇️  Downloading: ${filename}...`);
        await downloadImage(url, filepath);
        console.log(' ✅');
        downloaded++;
      }
    } catch (error) {
      console.log(` ❌ Failed: ${error.message}`);
      failed++;
      failedUrls.push(url);
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`✅ Downloaded: ${downloaded}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`${'='.repeat(50)}`);

  if (failedUrls.length > 0) {
    console.log('\nFailed URLs:');
    failedUrls.forEach(url => console.log(`  - ${url}`));
  }

  console.log(`\n📁 Images saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);
