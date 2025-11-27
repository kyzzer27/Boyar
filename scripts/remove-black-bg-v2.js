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
    
    // Process pixels: make ONLY pure black or very dark background transparent
    // Keep white and light colors (the logo)
    const processed = Buffer.from(data);
    for (let i = 0; i < processed.length; i += 4) {
      const r = processed[i];
      const g = processed[i + 1];
      const b = processed[i + 2];
      
      // Calculate brightness
      const brightness = (r + g + b) / 3;
      
      // If pixel is very dark (likely black background), make it transparent
      // Keep everything else (white logo, colors, etc.)
      if (brightness < 20 && r < 30 && g < 30 && b < 30) {
        processed[i + 3] = 0; // Make transparent
      } else {
        // Keep the pixel as is, ensure it's opaque
        processed[i + 3] = 255;
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
    
    console.log('Black background removed while preserving white logo!');
    console.log('Saved to:', outputPath);
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
  }
}

removeBlackBackground();





