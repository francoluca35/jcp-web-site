import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Método no permitido' 
    });
  }

  try {
    console.log('Recibiendo request de upload PDF');
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
    
    // Crear nombre único para el archivo
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storageFileName = `${timestamp}_${sanitizedFileName}`;
    console.log('Nombre del archivo:', storageFileName);
    
    // Crear directorio si no existe
    const pdfsDir = path.join(process.cwd(), 'public', 'pdfs');
    console.log('Directorio PDFs:', pdfsDir);
    if (!fs.existsSync(pdfsDir)) {
      console.log('Creando directorio PDFs...');
      fs.mkdirSync(pdfsDir, { recursive: true });
    }
    
    // Ruta completa del archivo
    const filePath = path.join(pdfsDir, storageFileName);
    console.log('Ruta completa del archivo:', filePath);
    
    // Escribir el archivo
    console.log('Escribiendo archivo...');
    fs.writeFileSync(filePath, buffer);
    console.log('Archivo escrito exitosamente');
    
    // URL pública del archivo
    const publicUrl = `/pdfs/${storageFileName}`;

    
    console.log('PDF guardado exitosamente:', {
      fileName: storageFileName,
      publicUrl: publicUrl,
      fileSize: buffer.length
    });

    return res.status(200).json({
      success: true,
      url: publicUrl,
      fileName: storageFileName
    });
  } catch (error) {
    console.error('Error en upload-pdf API:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
}
