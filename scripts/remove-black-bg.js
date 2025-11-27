const sharp = require('sharp');
const path = require('path');

async function removeBlackBackground() {
  try {
    const inputPath = path.join(__dirname, '../public/bp-logo.png');
    const outputPath = path.join(__dirname, '../public/bp-logo-transparent.png');
    
    // Read the image
    const image = await sharp(inputPath);
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    // Process pixels: make black (or very dark) pixels transparent
    const processed = Buffer.from(data);
    for (let i = 0; i < processed.length; i += 4) {
      const r = processed[i];
      const g = processed[i + 1];
      const b = processed[i + 2];
      const a = processed[i + 3];
      
      // If pixel is black or very dark (threshold), make it transparent
      // Keep white and other colors
      const brightness = (r + g + b) / 3;
      if (brightness < 30) { // Threshold for black/dark pixels
        processed[i + 3] = 0; // Make transparent
      } else {
        processed[i + 3] = 255; // Keep opaque
      }
    }
    
    // Save the processed image
    await sharp(processed, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
      .png()
      .toFile(outputPath);
    
    console.log('Black background removed! Logo saved to:', outputPath);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

removeBlackBackground();





