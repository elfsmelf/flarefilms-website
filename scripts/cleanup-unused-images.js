const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const IMAGE_DIR = path.join(__dirname, '../public/images');

async function getAllImageFiles() {
  const images = await glob('**/*.{jpg,jpeg,png,gif,webp,svg,avif}', {
    cwd: IMAGE_DIR,
    nodir: true
  });
  return images;
}

async function getAllCodeFiles() {
  const files = await glob('**/*.{tsx,jsx,ts,js,css,md,mdx}', {
    cwd: path.join(__dirname, '..'),
    ignore: ['node_modules/**', '.next/**', 'scripts/**', 'dist/**', 'build/**', 'public/**'],
    absolute: true
  });
  return files;
}

function extractImageReferences(content) {
  const references = new Set();

  // Match /images/... paths
  const imagePathRegex = /\/images\/[^\s"'`)]+\.(?:jpg|jpeg|png|gif|webp|svg|avif)/gi;
  const matches = content.match(imagePathRegex) || [];

  matches.forEach(match => {
    // Remove /images/ prefix to get relative path
    const relativePath = match.replace(/^\/images\//, '');
    references.add(relativePath);
  });

  return references;
}

async function main() {
  console.log('🔍 Scanning for all images in public/images...\n');
  const allImages = await getAllImageFiles();
  console.log(`Found ${allImages.length} images in public/images\n`);

  console.log('📝 Scanning all code files for image references...\n');
  const codeFiles = await getAllCodeFiles();

  const usedImages = new Set();

  for (const file of codeFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const refs = extractImageReferences(content);
    refs.forEach(ref => usedImages.add(ref));
  }

  console.log(`Found ${usedImages.size} unique image references in code\n`);

  // Find unused images
  const unusedImages = allImages.filter(img => !usedImages.has(img));

  console.log('='.repeat(60));
  console.log(`📊 Summary:`);
  console.log(`   Total images: ${allImages.length}`);
  console.log(`   Used images: ${usedImages.size}`);
  console.log(`   Unused images: ${unusedImages.length}`);
  console.log('='.repeat(60));

  if (unusedImages.length === 0) {
    console.log('\n✅ All images are being used! Nothing to delete.');
    return;
  }

  console.log(`\n🗑️  Unused images (will be deleted):\n`);

  // Group by directory for better readability
  const byDirectory = {};
  unusedImages.forEach(img => {
    const dir = path.dirname(img);
    if (!byDirectory[dir]) byDirectory[dir] = [];
    byDirectory[dir].push(path.basename(img));
  });

  Object.keys(byDirectory).sort().forEach(dir => {
    console.log(`\n  📁 ${dir}/`);
    byDirectory[dir].forEach(file => {
      console.log(`     ${file}`);
    });
  });

  console.log('\n' + '='.repeat(60));
  console.log('⚠️  Ready to delete these files. Press Ctrl+C to cancel...');
  console.log('='.repeat(60));

  // Delete unused images
  let deletedCount = 0;
  let deletedSize = 0;

  for (const img of unusedImages) {
    const fullPath = path.join(IMAGE_DIR, img);
    try {
      const stats = fs.statSync(fullPath);
      deletedSize += stats.size;
      fs.unlinkSync(fullPath);
      deletedCount++;
    } catch (err) {
      console.log(`\n❌ Failed to delete ${img}: ${err.message}`);
    }
  }

  // Clean up empty directories
  console.log('\n🧹 Cleaning up empty directories...');
  const cleanupDirs = async (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const fullPath = path.join(dir, entry.name);
        await cleanupDirs(fullPath);

        // Check if directory is now empty
        const remaining = fs.readdirSync(fullPath);
        if (remaining.length === 0) {
          fs.rmdirSync(fullPath);
          console.log(`   Removed empty directory: ${path.relative(IMAGE_DIR, fullPath)}`);
        }
      }
    }
  };

  await cleanupDirs(IMAGE_DIR);

  const sizeMB = (deletedSize / 1024 / 1024).toFixed(2);

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Cleanup complete!`);
  console.log(`   Deleted: ${deletedCount} files`);
  console.log(`   Freed space: ${sizeMB} MB`);
  console.log('='.repeat(60));
}

main().catch(console.error);
