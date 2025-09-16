import { uploadImageFromBase64 } from '../../lib/cloudinary';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Método no permitido' 
    });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ 
        success: false, 
        error: 'No se proporcionó imagen' 
      });
    }

    // Subir directamente desde base64
    const result = await uploadImageFromBase64(image);

    if (result.success) {
      return res.status(200).json({
        success: true,
        url: result.url,
        public_id: result.public_id
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error en upload-image API:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
}
