export default async function handler(req, res) {
  try {
    console.log('🔍 Probando configuración de Vercel Blob en producción...');
    
    // Verificar variable de entorno
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    console.log('BLOB_READ_WRITE_TOKEN:', blobToken ? '✅ Configurado' : '❌ No configurado');
    
    // Verificar entorno
    const environment = process.env.NODE_ENV;
    const vercelEnv = process.env.VERCEL_ENV;
    const vercelUrl = process.env.VERCEL_URL;
    
    console.log('Entorno:', environment);
    console.log('Vercel ENV:', vercelEnv);
    console.log('Vercel URL:', vercelUrl);
    
    // Listar todas las variables de entorno relacionadas con BLOB
    const blobVars = Object.keys(process.env).filter(key => key.includes('BLOB'));
    console.log('Variables BLOB encontradas:', blobVars);
    
    if (!blobToken) {
      return res.status(500).json({
        success: false,
        error: 'BLOB_READ_WRITE_TOKEN no está configurado',
        environment: environment,
        vercelEnv: vercelEnv,
        vercelUrl: vercelUrl,
        blobVars: blobVars,
        allEnvVars: Object.keys(process.env).length
      });
    }
    
    // Probar importación de @vercel/blob
    try {
      const { put } = await import('@vercel/blob');
      console.log('✅ @vercel/blob importado correctamente');
      
      // Probar subida de un archivo de prueba
      const testContent = 'Test file content for production';
      const testFileName = `test-production-${Date.now()}.txt`;
      
      console.log('📤 Intentando subir archivo de prueba en producción...');
      const blob = await put(testFileName, testContent, {
        access: 'public',
        contentType: 'text/plain'
      });
      
      console.log('✅ Archivo de prueba subido exitosamente en producción:', blob.url);
      
      return res.status(200).json({
        success: true,
        message: 'Vercel Blob funcionando correctamente en producción',
        testFile: blob.url,
        environment: environment,
        vercelEnv: vercelEnv,
        blobToken: blobToken ? 'Configurado' : 'No configurado'
      });
      
    } catch (importError) {
      console.error('❌ Error importando @vercel/blob:', importError);
      return res.status(500).json({
        success: false,
        error: 'Error importando @vercel/blob',
        details: importError.message,
        environment: environment,
        vercelEnv: vercelEnv
      });
    }
    
  } catch (error) {
    console.error('❌ Error en test-production-blob:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      details: error.message,
      environment: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV
    });
  }
}
