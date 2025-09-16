import { put } from '@vercel/blob';

// Configurar límite de tamaño para esta API específica
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Método no permitido' 
    });
  }

  try {
    console.log('Recibiendo request de upload PDF a Vercel Blob');
    
    // Verificar que la variable de entorno esté configurada
    let blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    
    // Si no está configurado, usar token temporal (SOLO PARA DESARROLLO)
    if (!blobToken && process.env.NODE_ENV === 'development') {
      console.log('⚠️ BLOB_READ_WRITE_TOKEN no configurado, usando token temporal');
      // REEMPLAZA ESTA LÍNEA CON TU TOKEN REAL DE VERCEL BLOB
      // Ve a Vercel Dashboard → Settings → Environment Variables → BLOB_READ_WRITE_TOKEN
      blobToken = 'vercel_blob_rw_cdaciholxftq4uxp_HFd7H9SRCYsr8GIVL1zaosegaLxrhf';
    }
    
    console.log('Verificando BLOB_READ_WRITE_TOKEN:', blobToken ? 'Configurado' : 'No configurado');
    
    if (!blobToken) {
      console.log('Error: BLOB_READ_WRITE_TOKEN no está configurado');
      console.log('Variables de entorno disponibles:', Object.keys(process.env).filter(key => key.includes('BLOB')));
      return res.status(500).json({ 
        success: false, 
        error: 'BLOB_READ_WRITE_TOKEN no está configurado. Verifica las variables de entorno en Vercel.',
        environment: process.env.NODE_ENV,
        availableEnvVars: Object.keys(process.env).filter(key => key.includes('BLOB'))
      });
    }
    
    const { pdf, fileName } = req.body;
    console.log('Datos recibidos:', { fileName, pdfLength: pdf ? pdf.length : 0 });

    if (!pdf) {
      console.log('Error: No se proporcionó PDF');
      return res.status(400).json({ 
        success: false, 
        error: 'No se proporcionó PDF' 
      });
    }

    // Convertir base64 a buffer
    console.log('Convirtiendo base64 a buffer...');
    const base64Data = pdf.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    console.log('Buffer creado, tamaño:', buffer.length);
    
    // Verificar tamaño del archivo (máximo 25MB para Vercel)
    const maxSize = 25 * 1024 * 1024; // 25MB
    if (buffer.length > maxSize) {
      console.log('Error: Archivo demasiado grande:', buffer.length, 'bytes');
      return res.status(413).json({
        success: false,
        error: 'El archivo es demasiado grande. Máximo 25MB permitido.',
        fileSize: buffer.length,
        maxSize: maxSize
      });
    }
    
    // Crear nombre único para el archivo
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const blobFileName = `pdfs/${timestamp}_${sanitizedFileName}`;
    console.log('Nombre del archivo en Blob:', blobFileName);
    
    // Subir a Vercel Blob
    console.log('Subiendo a Vercel Blob...');
    const blob = await put(blobFileName, buffer, {
      access: 'public',
      contentType: 'application/pdf',
      token: blobToken
    });
    
    console.log('PDF subido exitosamente a Vercel Blob:', {
      fileName: blobFileName,
      url: blob.url,
      fileSize: buffer.length
    });

    return res.status(200).json({
      success: true,
      url: blob.url,
      fileName: blobFileName
    });
  } catch (error) {
    console.error('Error en upload-pdf-blob API:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      details: error.message
    });
  }
}
