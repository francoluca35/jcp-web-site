export default async function handler(req, res) {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL requerida'
      });
    }
    
    console.log('🔍 Verificando URL de PDF:', url);
    
    try {
      // Intentar hacer una petición HEAD para verificar si la URL es accesible
      const response = await fetch(url, { method: 'HEAD' });
      
      console.log('📊 Respuesta del servidor:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (response.ok) {
        return res.status(200).json({
          success: true,
          url: url,
          status: response.status,
          contentType: response.headers.get('content-type'),
          contentLength: response.headers.get('content-length'),
          accessible: true
        });
      } else {
        return res.status(200).json({
          success: false,
          url: url,
          status: response.status,
          statusText: response.statusText,
          accessible: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        });
      }
    } catch (fetchError) {
      console.error('❌ Error verificando URL:', fetchError);
      return res.status(200).json({
        success: false,
        url: url,
        accessible: false,
        error: fetchError.message
      });
    }
    
  } catch (error) {
    console.error('❌ Error en verify-pdf-url:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      details: error.message
    });
  }
}
