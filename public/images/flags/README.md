# Flag Images Directory

This directory contains flag images for each jurisdiction.

## Required Flag Images

Place PNG or JPG images in this directory with the following filenames:

1. `bahamas.png` - Bahamas flag
2. `bermuda.png` - Bermuda flag  
3. `cayman.png` - Cayman Islands flag
4. `cook.png` - Cook Islands flag
5. `cyprus.png` - Cyprus flag
6. `delaware.png` - Delaware (USA) flag
7. `costarica.png` - Costa Rica flag
8. `georgia.png` - Georgia (country) flag
9. `gibraltar.png` - Gibraltar flag
10. `guernsey.png` - Guernsey flag

## Image Specifications

- **Format**: PNG or JPG
- **Background**: Pure white (#FFFFFF)
- **Content**: Official flag only, centered
- **Resolution**: High resolution (recommended: 400x267px or higher, maintaining 3:2 aspect ratio)
- **No effects**: No shadows, gradients, borders, or 3D effects

## How to Extract Flags from Your Image

1. Open your flag image in an image editor (Photoshop, GIMP, Preview, etc.)
2. For each flag:
   - Crop the flag to show only the flag on white background
   - Save as PNG with the appropriate filename (e.g., `bahamas.png`)
   - Place in this directory: `public/images/flags/`

## Fallback

If an image file is not found, the application will automatically use the SVG flag component as a fallback.














