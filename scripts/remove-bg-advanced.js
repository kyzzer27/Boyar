const sharp = require('sharp');
const path = require('path');

async function removeBackground() {
  try {
    const inputPath = path.join(__dirname, '../public/bp-logo.png');
    const outputPath = path.join(__dirname, '../public/bp-logo-transparent.png');
    
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Try to remove white/black backgrounds by making them transparent
    // This works best for solid color backgrounds
    await image
      .ensureAlpha()
      .composite([
        {
          input: Buffer.from([255, 255, 255, 0]), // Transparent white
          raw: { width: 1, height: 1, channels: 4 },
          tile: true,
          blend: 'dest-in'
        }
      ])
      .toFile(outputPath);
    
    console.log('Processed image saved to:', outputPath);
    console.log('If background is still visible, the logo may need manual editing with a tool like:');
    console.log('- remove.bg (online)');
    console.log('- photopea.com (online)');
    console.log('- GIMP or Photoshop (desktop)');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

removeBackground();




