import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupsDir = path.join(__dirname, '..', 'public', 'setups');
const themesDir = path.join(__dirname, '..', 'public', 'themes');
const maxWidth = 1080;
const setupsMetadataFile = path.join(__dirname, '..', 'public', 'setups', '.optimization-metadata.json');
const themesMetadataFile = path.join(__dirname, '..', 'public', 'themes', '.optimization-metadata.json');

// Supported image formats
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

// Function to check if image needs optimization
const needsOptimization = (file, filePath, metadata) => {
  // Check if original file has been modified since last optimization
  const currentHash = getFileHash(filePath);
  const lastHash = metadata[file];
  
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
    return { processedCount: 0, skippedCount: 0, errorCount: 0 };
  }

  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const file of imageFiles) {
    const filePath = path.join(dirPath, file);

    // Check if optimization is needed
    if (!needsOptimization(file, filePath, metadata)) {
      console.log(`⏭️  Skipping already optimized: ${file}`);
      skippedCount++;
      continue;
    }

    try {
      const image = sharp(filePath);
      const imageMetadata = await image.metadata();
      
      console.log(`🔄 Processing: ${file} (${imageMetadata.width}x${imageMetadata.height})`);

      // Create optimization pipeline
      let pipeline = image;

      // Resize if the image is wider than maxWidth
      if (imageMetadata.width > maxWidth) {
        pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
      }

      // Optimize based on format
      if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
        pipeline = pipeline.jpeg({ 
          quality: 85, 
          progressive: true,
          mozjpeg: true 
        });
      } else if (file.toLowerCase().endsWith('.png')) {
        pipeline = pipeline.png({ 
          quality: 85,
          progressive: true,
          compressionLevel: 9
        });
      } else if (file.toLowerCase().endsWith('.webp')) {
        pipeline = pipeline.webp({ 
          quality: 85,
          effort: 6
        });
      }

      // Create a temporary file for the optimized image
      const tempPath = filePath + '.tmp';
      
      // Process and save to temporary file
      await pipeline.toFile(tempPath);
      
      // Replace original with optimized version
      fs.renameSync(tempPath, filePath);

      // Update metadata
      metadata[file] = getFileHash(filePath);
      
      console.log(`✅ Optimized: ${file}`);
      processedCount++;

    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
      errorCount++;
    }
  }

  // Save updated metadata
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));

  return { processedCount, skippedCount, errorCount };
};

// Function to process all images
const processImages = async () => {
  console.log('🖼️  Starting image optimization...');
  
  // Process setups directory
  const setupsResults = await processDirectory(setupsDir, 'setups', setupsMetadata, setupsMetadataFile);
  
  // Process themes directory
  const themesResults = await processDirectory(themesDir, 'themes', themesMetadata, themesMetadataFile);

  // Calculate totals
  const totalProcessed = setupsResults.processedCount + themesResults.processedCount;
  const totalSkipped = setupsResults.skippedCount + themesResults.skippedCount;
  const totalErrors = setupsResults.errorCount + themesResults.errorCount;

  console.log('\n📊 Optimization Summary:');
  console.log(`   Setups - Processed: ${setupsResults.processedCount}, Skipped: ${setupsResults.skippedCount}, Errors: ${setupsResults.errorCount}`);
  console.log(`   Themes - Processed: ${themesResults.processedCount}, Skipped: ${themesResults.skippedCount}, Errors: ${themesResults.errorCount}`);
  console.log(`   Total - Processed: ${totalProcessed}, Skipped: ${totalSkipped}, Errors: ${totalErrors}`);
  
  if (totalProcessed > 0) {
    console.log('🎉 Image optimization completed!');
  } else {
    console.log('✨ All images are already optimized!');
  }
};

// Run the optimization
processImages().catch(error => {
  console.error('💥 Fatal error during image optimization:', error);
  process.exit(1);
});
