const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuración de optimización
const QUALITY = 80;
const WEBP_QUALITY = 85;
const AVIF_QUALITY = 70;

// Tamaños de imagen para diferentes dispositivos
const SIZES = {
  mobile: 640,
  tablet: 1024,
  desktop: 1920,
  large: 2560
};

// Formatos de salida
const FORMATS = ['webp', 'avif', 'jpeg'];

async function optimizeImage(inputPath, outputDir, filename) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Crear directorio de salida si no existe
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Optimizar para diferentes tamaños
    for (const [device, size] of Object.entries(SIZES)) {
      const resizedImage = image.resize(size, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });

      // Generar diferentes formatos
      for (const format of FORMATS) {
        let outputPath;
        let optimizedImage;

        switch (format) {
          case 'webp':
            outputPath = path.join(outputDir, `${filename}-${device}.webp`);
            optimizedImage = resizedImage.webp({ quality: WEBP_QUALITY });
            break;
          case 'avif':
            outputPath = path.join(outputDir, `${filename}-${device}.avif`);
            optimizedImage = resizedImage.avif({ quality: AVIF_QUALITY });
            break;
          case 'jpeg':
            outputPath = path.join(outputDir, `${filename}-${device}.jpg`);
            optimizedImage = resizedImage.jpeg({ 
              quality: QUALITY,
              progressive: true,
              mozjpeg: true
            });
            break;
        }

        if (optimizedImage) {
          await optimizedImage.toFile(outputPath);
          console.log(`✅ Generated: ${outputPath}`);
        }
      }
    }

    // Generar imagen original optimizada
    const originalOptimized = image.jpeg({ 
      quality: QUALITY,
      progressive: true,
      mozjpeg: true
    });
    await originalOptimized.toFile(path.join(outputDir, `${filename}-original.jpg`));

    console.log(`✅ Optimized: ${filename}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);
  }
}

async function processDirectory(inputDir, outputDir) {
  try {
    const files = fs.readdirSync(inputDir);
    
    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const stat = fs.statSync(inputPath);
      
      if (stat.isDirectory()) {
        // Procesar subdirectorios recursivamente
        const subOutputDir = path.join(outputDir, file);
        await processDirectory(inputPath, subOutputDir);
      } else if (isImageFile(file)) {
        // Procesar imagen
        const filename = path.parse(file).name;
        await optimizeImage(inputPath, outputDir, filename);
      }
    }
  } catch (error) {
    console.error(`❌ Error processing directory ${inputDir}:`, error.message);
  }
}

function isImageFile(filename) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

// Función principal
async function main() {
  const inputDir = path.join(__dirname, '../public/Assets');
  const outputDir = path.join(__dirname, '../out/Assets');

  console.log('🚀 Starting image optimization...');
  console.log(`📁 Input directory: ${inputDir}`);
  console.log(`📁 Output directory: ${outputDir}`);

  if (!fs.existsSync(inputDir)) {
    console.error(`❌ Input directory does not exist: ${inputDir}`);
    process.exit(1);
  }

  await processDirectory(inputDir, outputDir);
  
  console.log('🎉 Image optimization completed!');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, processDirectory };
