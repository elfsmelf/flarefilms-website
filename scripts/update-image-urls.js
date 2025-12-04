const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const IMAGE_DIR = path.join(__dirname, '../public/images');

// Patterns to match
const WORDPRESS_PATTERN = /https:\/\/www\.flarefilms\.com\.au\/wp-content\/uploads\//g;
const PIXIESET_PATTERN = /https:\/\/images-pw\.pixieset\.com\/[^"'\s]+/g;

function extractPathFromUrl(url) {
  // Extract the path from WordPress URL
  if (url.includes('www.flarefilms.com.au')) {
    const match = url.match(/\/uploads\/(\d{4})\/(\d{2})\/([^"'\s]+)/);
    if (match) {
      const [, year, month, filename] = match;
      return `/images/${year}/${month}/${filename}`;
    }
  }

  // For Pixieset or other URLs, try to find in misc folder
  const filename = url.split('/').pop().split('?')[0];
  return `/images/misc/${filename}`;
}

function verifyImageExists(imagePath) {
  const fullPath = path.join(__dirname, '../public', imagePath);
  return fs.existsSync(fullPath);
}

async function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  let replacements = [];

  // Find all WordPress URLs
  const wordpressUrls = content.match(new RegExp(WORDPRESS_PATTERN.source + '[^"\'\\s]+', 'g')) || [];

  for (const url of wordpressUrls) {
    const localPath = extractPathFromUrl(url);

    if (verifyImageExists(localPath)) {
      content = content.replace(url, localPath);
      replacements.push({ from: url, to: localPath, exists: true });
      modified = true;
    } else {
      replacements.push({ from: url, to: localPath, exists: false });
    }
  }

  // Find all Pixieset URLs
  const pixiesetUrls = content.match(PIXIESET_PATTERN) || [];

  for (const url of pixiesetUrls) {
    const localPath = extractPathFromUrl(url);

    if (verifyImageExists(localPath)) {
      content = content.replace(url, localPath);
      replacements.push({ from: url, to: localPath, exists: true });
      modified = true;
    } else {
      replacements.push({ from: url, to: localPath, exists: false });
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  return { modified, replacements };
}

async function main() {
  console.log('🔍 Scanning for component files...\n');

  // Find all TSX, JSX, TS, JS files in components and app directories
  const files = await glob('**/*.{tsx,jsx,ts,js}', {
    cwd: path.join(__dirname, '..'),
    ignore: ['node_modules/**', '.next/**', 'scripts/**', 'dist/**', 'build/**'],
    absolute: true
  });

  console.log(`Found ${files.length} files to check\n`);

  let totalModified = 0;
  let totalReplacements = 0;
  let filesWithMissingImages = [];

  for (const file of files) {
    const relativePath = path.relative(path.join(__dirname, '..'), file);
    const result = await updateFile(file);

    if (result.replacements.length > 0) {
      console.log(`📝 ${relativePath}`);

      result.replacements.forEach(rep => {
        if (rep.exists) {
          console.log(`   ✅ ${path.basename(rep.from)} → ${rep.to}`);
          totalReplacements++;
        } else {
          console.log(`   ⚠️  ${path.basename(rep.from)} → ${rep.to} (image not found)`);
          filesWithMissingImages.push({ file: relativePath, url: rep.from, localPath: rep.to });
        }
      });

      if (result.modified) {
        totalModified++;
      }
      console.log('');
    }
  }

  console.log('='.repeat(60));
  console.log(`✅ Updated: ${totalModified} files`);
  console.log(`🔄 Replacements: ${totalReplacements} URLs`);
  console.log('='.repeat(60));

  if (filesWithMissingImages.length > 0) {
    console.log('\n⚠️  Warning: Some images were not found locally:');
    filesWithMissingImages.forEach(({ file, url, localPath }) => {
      console.log(`   ${file}`);
      console.log(`     URL: ${url}`);
      console.log(`     Expected: ${localPath}\n`);
    });
  }

  console.log('\n✨ Done! All image URLs have been updated to local paths.');
}

main().catch(console.error);
