import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupsDir = path.join(__dirname, '..', 'public', 'setups');
const themesDir = path.join(__dirname, '..', 'public', 'themes');
const maxWidth = 1080;
const webpQuality = 80;
const webpEffort = 6;
const setupsMetadataFile = path.join(__dirname, '..', 'public', 'setups', '.optimization-metadata.json');
const themesMetadataFile = path.join(__dirname, '..', 'public', 'themes', '.optimization-metadata.json');

// Supported image formats (input formats to convert)
const supportedFormats = /\.(jpe?g|png|webp|tiff|gif|avif)$/i;

// Ensure the directories exist
if (!fs.existsSync(setupsDir)) {
  fs.mkdirSync(setupsDir, { recursive: true });
}
if (!fs.existsSync(themesDir)) {
  fs.mkdirSync(themesDir, { recursive: true });
}

// Load or create optimization metadata
let setupsMetadata = {};
let themesMetadata = {};

if (fs.existsSync(setupsMetadataFile)) {
  try {
    setupsMetadata = JSON.parse(fs.readFileSync(setupsMetadataFile, 'utf8'));
  } catch {
    console.warn('Warning: Could not read setups optimization metadata, starting fresh');
    setupsMetadata = {};
  }
}

if (fs.existsSync(themesMetadataFile)) {
  try {
    themesMetadata = JSON.parse(fs.readFileSync(themesMetadataFile, 'utf8'));
  } catch {
    console.warn('Warning: Could not read themes optimization metadata, starting fresh');
    themesMetadata = {};
  }
}

// Function to get file hash for change detection
const getFileHash = (filePath) => {
  const stats = fs.statSync(filePath);
  return `${stats.mtime.getTime()}-${stats.size}`;
};

// Function to get file size in bytes
const getFileSize = (filePath) => {
  return fs.statSync(filePath).size;
};

// Function to format file size for display
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

// Function to get WebP filename from original filename
const getWebpFilename = (originalFile) => {
  const ext = path.extname(originalFile).toLowerCase();
  if (ext === '.webp') {
    return originalFile; // Already WebP
  }
  return originalFile.replace(/\.(jpe?g|png|tiff|gif|avif)$/i, '.webp');
};

// Function to check if image needs optimization
const needsOptimization = (file, filePath, metadata, webpFile) => {
  // Always process if converting to WebP (different format)
  const ext = path.extname(file).toLowerCase();
  if (ext !== '.webp') {
    return true; // Need to convert to WebP
  }
  
  // For existing WebP files, check if they've been modified
  const currentHash = getFileHash(filePath);
  const lastHash = metadata[webpFile] || metadata[file];
  
  if (lastHash !== currentHash) {
    return true;
  }

  return false;
};

// Function to process images in a directory
const processDirectory = async (dirPath, dirName, metadata, metadataFile) => {
  console.log(`🖼️  Processing ${dirName} images...`);
  
  const files = fs.readdirSync(dirPath);
  const imageFiles = files.filter(file => supportedFormats.test(file));
  
  if (imageFiles.length === 0) {
    console.log(`No images found in ${dirName} to optimize`);
    return { processedCount: 0, skippedCount: 0, errorCount: 0, totalSizeReduction: 0 };
  }

  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  let totalSizeReduction = 0;

  for (const file of imageFiles) {
    const filePath = path.join(dirPath, file);
    const webpFile = getWebpFilename(file);
    const webpPath = path.join(dirPath, webpFile);

    // Check if optimization is needed
    if (!needsOptimization(file, filePath, metadata, webpFile)) {
      console.log(`⏭️  Skipping already optimized: ${file}`);
      skippedCount++;
      continue;
    }

    try {
      // Get original file size
      const originalSize = getFileSize(filePath);
      
      const image = sharp(filePath);
      const imageMetadata = await image.metadata();
      
      const originalFormat = path.extname(file).toLowerCase();
      const isConverting = originalFormat !== '.webp';
      
      console.log(`🔄 Processing: ${file} (${imageMetadata.width}x${imageMetadata.height})${isConverting ? ` → Converting to WebP` : ''}`);

      // Create optimization pipeline
      let pipeline = image;

      // Strip all metadata (Sharp automatically strips most metadata when converting formats,
      // but we explicitly remove EXIF orientation data)
      pipeline = pipeline.rotate();
      
      // Resize if the image is wider than maxWidth
      if (imageMetadata.width > maxWidth) {
        pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
      }

      // Convert all formats to WebP
      // Configure WebP output with quality and effort settings
      const webpOptions = {
        quality: webpQuality,
        effort: webpEffort,
      };
      
      // Convert to WebP (Sharp preserves alpha channel automatically)
      pipeline = pipeline.webp(webpOptions);

      // Create a temporary file for the optimized image
      const tempPath = webpPath + '.tmp';
      
      // Process and save to temporary file
      await pipeline.toFile(tempPath);
      
      // Get optimized file size
      const optimizedSize = getFileSize(tempPath);
      const sizeReduction = originalSize - optimizedSize;
      const reductionPercent = ((sizeReduction / originalSize) * 100).toFixed(1);
      
      // If converting format, delete original file
      if (isConverting && filePath !== webpPath) {
        fs.unlinkSync(filePath);
      }
      
      // Replace temporary file with final WebP file
      if (fs.existsSync(webpPath)) {
        fs.unlinkSync(webpPath);
      }
      fs.renameSync(tempPath, webpPath);

      // Update metadata with WebP filename
      metadata[webpFile] = getFileHash(webpPath);
      // Remove old metadata entry if filename changed
      if (file !== webpFile && metadata[file]) {
        delete metadata[file];
      }
      
      totalSizeReduction += sizeReduction;
      
      const sizeInfo = sizeReduction > 0 
        ? ` (${formatFileSize(originalSize)} → ${formatFileSize(optimizedSize)}, -${reductionPercent}%)`
        : ` (${formatFileSize(optimizedSize)})`;
      
      console.log(`✅ Optimized: ${isConverting ? `${file} → ${webpFile}` : webpFile}${sizeInfo}`);
      processedCount++;

    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
      errorCount++;
    }
  }

  // Save updated metadata
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));

  return { processedCount, skippedCount, errorCount, totalSizeReduction };
};

// Function to process all images
const processImages = async () => {
  console.log('🖼️  Starting image optimization...');
  console.log('📝 Converting all images to WebP format...\n');
  
  // Process setups directory
  const setupsResults = await processDirectory(setupsDir, 'setups', setupsMetadata, setupsMetadataFile);
  
  // Process themes directory
  const themesResults = await processDirectory(themesDir, 'themes', themesMetadata, themesMetadataFile);

  // Calculate totals
  const totalProcessed = setupsResults.processedCount + themesResults.processedCount;
  const totalSkipped = setupsResults.skippedCount + themesResults.skippedCount;
  const totalErrors = setupsResults.errorCount + themesResults.errorCount;
  const totalSizeReduction = setupsResults.totalSizeReduction + themesResults.totalSizeReduction;

  console.log('\n📊 Optimization Summary:');
  console.log(`   Setups - Processed: ${setupsResults.processedCount}, Skipped: ${setupsResults.skippedCount}, Errors: ${setupsResults.errorCount}`);
  if (setupsResults.totalSizeReduction > 0) {
    console.log(`            Size reduction: ${formatFileSize(setupsResults.totalSizeReduction)}`);
  }
  console.log(`   Themes - Processed: ${themesResults.processedCount}, Skipped: ${themesResults.skippedCount}, Errors: ${themesResults.errorCount}`);
  if (themesResults.totalSizeReduction > 0) {
    console.log(`            Size reduction: ${formatFileSize(themesResults.totalSizeReduction)}`);
  }
  console.log(`   Total - Processed: ${totalProcessed}, Skipped: ${totalSkipped}, Errors: ${totalErrors}`);
  if (totalSizeReduction > 0) {
    console.log(`            Total size reduction: ${formatFileSize(totalSizeReduction)}`);
  }
  
  if (totalProcessed > 0) {
    console.log('\n🎉 Image optimization completed!');
    console.log('⚠️  Remember to update JSON data files to change file extensions from .jpeg/.png to .webp');
  } else {
    console.log('\n✨ All images are already optimized!');
  }
};

// Run the optimization
processImages().catch(error => {
  console.error('💥 Fatal error during image optimization:', error);
  process.exit(1);
});
