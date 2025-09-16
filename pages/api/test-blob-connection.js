export default async function handler(req, res) {
  try {
    console.log('🔍 Probando conexión con Vercel Blob...');
    
    // Verificar variable de entorno
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    console.log('BLOB_READ_WRITE_TOKEN:', blobToken ? '✅ Configurado' : '❌ No configurado');
    
    if (!blobToken) {
      return res.status(500).json({
        success: false,
        error: 'BLOB_READ_WRITE_TOKEN no está configurado',
        details: 'Verifica las variables de entorno en Vercel'
      });
    }
    
    // Probar importación de @vercel/blob
    try {
      const { put } = await import('@vercel/blob');
      console.log('✅ @vercel/blob importado correctamente');
      
      // Probar subida de un archivo de prueba
      const testContent = 'Test file content';
      const testFileName = `test-${Date.now()}.txt`;
      
      console.log('📤 Intentando subir archivo de prueba...');
      const blob = await put(testFileName, testContent, {
        access: 'public',
        contentType: 'text/plain'
      });
      
      console.log('✅ Archivo de prueba subido exitosamente:', blob.url);
      
      return res.status(200).json({
        success: true,
        message: 'Conexión con Vercel Blob exitosa',
        testFile: blob.url,
        blobToken: blobToken ? 'Configurado' : 'No configurado'
      });
      
    } catch (importError) {
      console.error('❌ Error importando @vercel/blob:', importError);
      return res.status(500).json({
        success: false,
        error: 'Error importando @vercel/blob',
        details: importError.message
      });
    }
    
  } catch (error) {
    console.error('❌ Error en test-blob-connection:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      details: error.message
    });
  }
}
