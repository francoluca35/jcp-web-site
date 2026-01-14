import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: 'dn99lljzc',
  api_key: '367859347277712',
  api_secret: 'gH-XReQJ2yQrwMyyTdOLoEOrFr4',
  secure: true
});

export default cloudinary;

// Función para subir imagen desde base64
export const uploadImageFromBase64 = async (base64String) => {
  try {
    // Subir a Cloudinary directamente desde base64
    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'jcp-products',
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto'
    });

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    };
  } catch (error) {
    console.error('Error subiendo imagen a Cloudinary:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Nota: Los PDFs ahora se suben a Firebase Storage
// Ver pages/api/upload-pdf.js para la implementación

// Función para eliminar imagen
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: true,
      result
    };
  } catch (error) {
    console.error('Error eliminando imagen de Cloudinary:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
