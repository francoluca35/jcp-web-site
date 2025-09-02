const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const optimizeImages = async () => {
  const publicDir = path.join(__dirname, '../public');
  const assetsDir = path.join(publicDir, 'Assets');

  console.log('🚀 Iniciando optimización automática de imágenes...');
  console.log('📁 Directorio de assets:', assetsDir);

  if (!fs.existsSync(assetsDir)) {
    console.log('❌ Directorio Assets no encontrado');
    return;
  }

  const files = fs.readdirSync(assetsDir);
  const imageFiles = files.filter(file =>
    /\.(jpg|jpeg|png|gif)$/i.test(file)
  );

  console.log(`📸 Encontradas ${imageFiles.length} imágenes para optimizar:`);

  for (const file of imageFiles) {
    const filePath = path.join(assetsDir, file);
    const stats = fs.statSync(filePath);
    const originalSizeKB = (stats.size / 1024).toFixed(2);
    
    console.log(`\n🔄 Optimizando: ${file} (${originalSizeKB} KB)`);

    try {
      const fileName = path.parse(file).name;
      const extension = path.parse(file).ext.toLowerCase();
      
      // Crear versión WebP optimizada
      const webpPath = path.join(assetsDir, `${fileName}.webp`);
      await sharp(filePath)
        .resize(800, 800, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .webp({ 
          quality: 80,
          effort: 6 
        })
        .toFile(webpPath);

      const webpStats = fs.statSync(webpPath);
      const webpSizeKB = (webpStats.size / 1024).toFixed(2);
      const savingsKB = (stats.size - webpStats.size / 1024).toFixed(2);
      const savingsPercent = ((1 - webpStats.size / stats.size) * 100).toFixed(1);

      console.log(`   ✅ WebP creado: ${fileName}.webp (${webpSizeKB} KB)`);
      console.log(`   💾 Ahorro: ${savingsKB} KB (${savingsPercent}%)`);

      // Crear versión AVIF para navegadores modernos
      const avifPath = path.join(assetsDir, `${fileName}.avif`);
      await sharp(filePath)
        .resize(800, 800, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .avif({ 
          quality: 80,
          effort: 9 
        })
        .toFile(avifPath);

      const avifStats = fs.statSync(avifPath);
      const avifSizeKB = (avifStats.size / 1024).toFixed(2);
      const avifSavingsKB = (stats.size - avifStats.size / 1024).toFixed(2);
      const avifSavingsPercent = ((1 - avifStats.size / stats.size) * 100).toFixed(1);

      console.log(`   ✅ AVIF creado: ${fileName}.avif (${avifSizeKB} KB)`);
      console.log(`   💾 Ahorro: ${avifSavingsKB} KB (${avifSavingsPercent}%)`);

      // Crear versión PNG optimizada (más pequeña que la original)
      const optimizedPngPath = path.join(assetsDir, `${fileName}_optimized.png`);
      await sharp(filePath)
        .resize(800, 800, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .png({ 
          compressionLevel: 9,
          adaptiveFiltering: true
        })
        .toFile(optimizedPngPath);

      const optimizedPngStats = fs.statSync(optimizedPngPath);
      const optimizedPngSizeKB = (optimizedPngStats.size / 1024).toFixed(2);
      const pngSavingsKB = (stats.size - optimizedPngStats.size / 1024).toFixed(2);
      const pngSavingsPercent = ((1 - optimizedPngStats.size / stats.size) * 100).toFixed(1);

      console.log(`   ✅ PNG optimizado: ${fileName}_optimized.png (${optimizedPngSizeKB} KB)`);
      console.log(`   💾 Ahorro: ${pngSavingsKB} KB (${pngSavingsPercent}%)`);

    } catch (error) {
      console.error(`   ❌ Error optimizando ${file}:`, error.message);
    }
  }

  console.log('\n📊 RESUMEN DE OPTIMIZACIÓN:');
  console.log('✅ Todas las imágenes han sido optimizadas');
  console.log('💡 Ahora puedes usar las versiones .webp y .avif en tu código');
  console.log('💡 Las versiones originales se mantienen como backup');
  
  console.log('\n🚀 PRÓXIMOS PASOS:');
  console.log('1. Actualiza tu código para usar las imágenes optimizadas');
  console.log('2. Implementa lazy loading para imágenes grandes');
  console.log('3. Usa <picture> tag para fallbacks automáticos');
  console.log('4. Considera eliminar las versiones originales grandes después de las pruebas');
  
  console.log('\n✅ Optimización automática completada');
};

// Ejecutar el script
optimizeImages().catch(error => {
  console.error('❌ Error durante la optimización:', error.message);
  process.exit(1);
});
