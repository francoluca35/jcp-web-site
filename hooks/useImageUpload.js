import { useState } from 'react';

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    try {
      // Convertir archivo a base64 en el cliente
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      // Subir a Cloudinary
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64 }),
      });

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          url: result.url,
          public_id: result.public_id
        };
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      setError(error.message);
      return {
        success: false,
        error: error.message
      };
    }
  };

  const uploadMultipleImages = async (files) => {
    setUploading(true);
    setError(null);

    try {
      const uploadPromises = Array.from(files).map(file => uploadImage(file));
      const results = await Promise.all(uploadPromises);

      const successful = results.filter(r => r.success);
      const failed = results.filter(r => !r.success);

      if (failed.length > 0) {
        setError(`${failed.length} imágenes fallaron al subir`);
      }

      return {
        success: successful.length > 0,
        images: successful,
        errors: failed
      };
    } catch (error) {
      console.error('Error subiendo múltiples imágenes:', error);
      setError(error.message);
      return {
        success: false,
        error: error.message
      };
    } finally {
      setUploading(false);
    }
  };

  const uploadPDF = async (file) => {
    try {
      // Convertir archivo a base64 en el cliente
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      // Subir PDF a Vercel Blob
      const response = await fetch('/api/upload-pdf-blob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          pdf: base64,
          fileName: file.name
        }),
      });

      const result = await response.json();
      console.log('Resultado de subida de PDF:', result);

      if (result.success) {
        console.log('PDF subido exitosamente, URL:', result.url);
        return {
          success: true,
          url: result.url,
          fileName: result.fileName,
          originalName: file.name
        };
      } else {
        console.error('Error subiendo PDF:', result.error);
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error subiendo PDF:', error);
      setError(error.message);
      return {
        success: false,
        error: error.message
      };
    }
  };

  return {
    uploadImage,
    uploadMultipleImages,
    uploadPDF,
    uploading,
    error
  };
}
