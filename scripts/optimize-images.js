import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupsDir = path.join(__dirname, '..', 'public', 'setups');
const maxWidth = 1080;
const metadataFile = path.join(__dirname, '..', 'public', 'setups', '.optimization-metadata.json');

// Supported image formats
const supportedFormats = /\.(jpe?g|png|webp|tiff|gif|avif)$/i;

// Ensure the setups directory exists
if (!fs.existsSync(setupsDir)) {
  fs.mkdirSync(setupsDir, { recursive: true });
}

// Load or create optimization metadata
let optimizationMetadata = {};
if (fs.existsSync(metadataFile)) {
  try {
    optimizationMetadata = JSON.parse(fs.readFileSync(metadataFile, 'utf8'));
  } catch (error) {
    console.warn('Warning: Could not read optimization metadata, starting fresh');
    optimizationMetadata = {};
  }
}

// Function to get file hash for change detection
const getFileHash = (filePath) => {
  const stats = fs.statSync(filePath);
  return `${stats.mtime.getTime()}-${stats.size}`;
};

// Function to check if image needs optimization
const needsOptimization = (file, filePath) => {
  // Check if original file has been modified since last optimization
  const currentHash = getFileHash(filePath);
  const lastHash = optimizationMetadata[file];
  
  if (lastHash !== currentHash) {
    return true;
  }

  return false;
};

// Function to process images
const processImages = async () => {
  console.log('🖼️  Starting image optimization...');
  
  const files = fs.readdirSync(setupsDir);
  const imageFiles = files.filter(file => supportedFormats.test(file));
  
  if (imageFiles.length === 0) {
    console.log('No images found to optimize');
    return;
  }

  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const file of imageFiles) {
    const filePath = path.join(setupsDir, file);

    // Check if optimization is needed
    if (!needsOptimization(file, filePath)) {
      console.log(`⏭️  Skipping already optimized: ${file}`);
      skippedCount++;
      continue;
    }

    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();
      
      console.log(`🔄 Processing: ${file} (${metadata.width}x${metadata.height})`);

      // Create optimization pipeline
      let pipeline = image;

      // Resize if the image is wider than maxWidth
      if (metadata.width > maxWidth) {
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
      optimizationMetadata[file] = getFileHash(filePath);
      
      console.log(`✅ Optimized: ${file}`);
      processedCount++;

    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
      errorCount++;
    }
  }

  // Save updated metadata
  fs.writeFileSync(metadataFile, JSON.stringify(optimizationMetadata, null, 2));

  console.log('\n📊 Optimization Summary:');
  console.log(`   Processed: ${processedCount} images`);
  console.log(`   Skipped: ${skippedCount} images`);
  console.log(`   Errors: ${errorCount} images`);
  
  if (processedCount > 0) {
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
