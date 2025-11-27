const sharp = require('sharp');
const path = require('path');

async function removeBackground() {
  try {
    const inputPath = path.join(__dirname, '../public/bp-logo.png');
    const outputPath = path.join(__dirname, '../public/bp-logo-transparent.png');
    
    // Try to extract alpha channel or make white/black transparent
    // This is a basic approach - for complex backgrounds, you'd need AI-based removal
    await sharp(inputPath)
      .ensureAlpha()
      .toFile(outputPath);
    
    console.log('Background removal attempted. For best results, use a tool like remove.bg');
    console.log('Output saved to:', outputPath);
  } catch (error) {
    console.error('Error processing image:', error.message);
    console.log('\nNote: Automatic background removal requires specialized tools.');
    console.log('Please use an online service like remove.bg or photopea.com');
  }
}

removeBackground();




