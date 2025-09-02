const fs = require('fs');
const path = require('path');

// Script mejorado para optimización de imágenes
const optimizeImages = () => {
  const publicDir = path.join(__dirname, '../public');
  const assetsDir = path.join(publicDir, 'Assets');

  console.log('🔍 Analizando imágenes para optimización...');
  console.log('📁 Directorio de assets:', assetsDir);

  if (!fs.existsSync(assetsDir)) {
    console.log('❌ Directorio Assets no encontrado');
    return;
  }

  const files = fs.readdirSync(assetsDir);
  const imageFiles = files.filter(file =>
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
  );

  console.log(`📸 Encontradas ${imageFiles.length} imágenes:`);

  let totalSize = 0;
  let optimizationOpportunities = [];

  imageFiles.forEach(file => {
    const filePath = path.join(assetsDir, file);
    const stats = fs.statSync(filePath);
    const sizeInKB = (stats.size / 1024).toFixed(2);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    totalSize += stats.size;

    console.log(`📁 ${file}: ${sizeInKB} KB`);

    // Identificar oportunidades de optimización
    if (stats.size > 100 * 1024) { // > 100KB
      optimizationOpportunities.push({
        file,
        currentSize: stats.size,
        currentSizeKB: sizeInKB,
        recommendations: []
      });

      if (stats.size > 500 * 1024) { // > 500KB
        optimizationOpportunities[optimizationOpportunities.length - 1].recommendations.push(
          '⚠️  CRÍTICO: Imagen muy pesada - optimizar urgentemente'
        );
      } else {
        optimizationOpportunities[optimizationOpportunities.length - 1].recommendations.push(
          '⚠️  Considerar optimización'
        );
      }

      // Recomendaciones específicas por tipo de archivo
      if (/\.(png|jpg|jpeg)$/i.test(file)) {
        optimizationOpportunities[optimizationOpportunities.length - 1].recommendations.push(
          '💡 Convertir a WebP para mejor compresión'
        );
      }

      if (stats.size > 200 * 1024) { // > 200KB
        optimizationOpportunities[optimizationOpportunities.length - 1].recommendations.push(
          '💡 Implementar lazy loading'
        );
      }
    }
  });

  console.log('\n📊 RESUMEN DE OPTIMIZACIÓN:');
  console.log(`📈 Tamaño total actual: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
  
  if (optimizationOpportunities.length > 0) {
    console.log('\n🎯 OPORTUNIDADES DE OPTIMIZACIÓN:');
    optimizationOpportunities.forEach(opp => {
      console.log(`\n📁 ${opp.file} (${opp.currentSizeKB} KB):`);
      opp.recommendations.forEach(rec => console.log(`   ${rec}`));
    });
  } else {
    console.log('✅ Todas las imágenes están optimizadas');
  }

  console.log('\n🚀 RECOMENDACIONES GENERALES:');
  console.log('1. Convertir PNG/JPG a WebP (mejor compresión)');
  console.log('2. Implementar lazy loading para imágenes grandes');
  console.log('3. Usar diferentes tamaños para diferentes dispositivos');
  console.log('4. Comprimir imágenes con herramientas como TinyPNG o ImageOptim');
  console.log('5. Considerar usar AVIF para navegadores modernos');

  console.log('\n💡 HERRAMIENTAS RECOMENDADAS:');
  console.log('- TinyPNG (online): https://tinypng.com/');
  console.log('- ImageOptim (Mac): https://imageoptim.com/');
  console.log('- Squoosh (Google): https://squoosh.app/');
  console.log('- Sharp (Node.js): npm install sharp');

  if (optimizationOpportunities.length > 0) {
    console.log('\n⚠️  ACCIÓN REQUERIDA:');
    console.log('Hay imágenes que necesitan optimización antes del deploy');
    console.log('Esto mejorará significativamente la performance del sitio');
  }

  console.log('\n✅ Análisis de optimización completado');
};

// Ejecutar el script
try {
  optimizeImages();
} catch (error) {
  console.error('❌ Error durante la optimización:', error.message);
  process.exit(1);
}
