const sharp = require('sharp');
const path = require('path');

async function processLogo() {
  try {
    const inputPath = path.join(__dirname, '../public/bp-logo.png');
    const outputPath = path.join(__dirname, '../public/bp-logo-transparent.png');
    
    console.log('Processing logo:', inputPath);
    
    // Read the image
    const image = await sharp(inputPath);
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    console.log(`Image dimensions: ${info.width}x${info.height}`);
    
    // Process pixels: remove black background, keep white logo
    const processed = Buffer.from(data);
    let transparentCount = 0;
    let keptCount = 0;
    
    for (let i = 0; i < processed.length; i += 4) {
      const r = processed[i];
      const g = processed[i + 1];
      const b = processed[i + 2];
      
      // Calculate brightness
      const brightness = (r + g + b) / 3;
      
      // Remove pure black or very dark pixels (background)
      // Keep white and light pixels (the logo)
      if (brightness < 25 && r < 30 && g < 30 && b < 30) {
        // Pure black/dark - make transparent
        processed[i + 3] = 0;
        transparentCount++;
      } else {
        // White or light color - keep it
        processed[i + 3] = 255;
        keptCount++;
      }
    }
    
    console.log(`Made ${transparentCount} pixels transparent, kept ${keptCount} pixels`);
    
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
    
    console.log('✓ Logo processed successfully!');
    console.log('✓ Black background removed, white logo preserved');
    console.log('✓ Saved to:', outputPath);
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
  }
}

processLogo();




