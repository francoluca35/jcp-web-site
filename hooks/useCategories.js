import { useState, useEffect } from 'react';

export function useCategories() {
  const [categories, setCategories] = useState({
    nuevo: [],
    usado: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar categorías desde la API
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/categories');
      const result = await response.json();
      
      if (result.success) {
        setCategories(result.data);
      } else {
        throw new Error(result.error || 'Error cargando categorías');
      }
    } catch (err) {
      console.error('❌ Hook Error cargando categorías:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Agregar nueva subcategoría
  const addSubcategory = async (type, subcategory) => {
    try {
      setError(null);
      
      console.log('📤 Hook: Agregando subcategoría:', { type, subcategory });
      
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, subcategory }),
      });
      
      console.log('📥 Hook: Respuesta recibida, status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText };
        }
        console.error('❌ Hook: Error en respuesta HTTP:', response.status, errorData);
        throw new Error(errorData.error || errorData.details || `Error HTTP ${response.status}: ${errorText}`);
      }
      
      const result = await response.json();
      console.log('📥 Hook: Resultado parseado:', result);
      
      if (result.success) {
        // Actualizar estado local - recargar todas las categorías para asegurar consistencia
        await loadCategories();
        console.log('✅ Hook: Subcategoría agregada exitosamente');
        return { success: true, message: result.message };
      } else {
        throw new Error(result.error || result.details || 'Error agregando subcategoría');
      }
    } catch (err) {
      console.error('❌ Hook Error agregando subcategoría:', err);
      console.error('❌ Error details:', {
        message: err.message,
        stack: err.stack
      });
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Eliminar subcategoría
  const removeSubcategory = async (type, index) => {
    try {
      setError(null);
      
      console.log('📤 Hook: Eliminando subcategoría:', { type, index });
      
      const response = await fetch(`/api/categories?type=${encodeURIComponent(type)}&index=${encodeURIComponent(index)}`, {
        method: 'DELETE',
      });
      
      console.log('📥 Hook: Respuesta recibida, status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText };
        }
        console.error('❌ Hook: Error en respuesta HTTP:', response.status, errorData);
        throw new Error(errorData.error || errorData.details || `Error HTTP ${response.status}: ${errorText}`);
      }
      
      const result = await response.json();
      console.log('📥 Hook: Resultado parseado:', result);
      
      if (result.success) {
        // Actualizar estado local - recargar todas las categorías para asegurar consistencia
        await loadCategories();
        console.log('✅ Hook: Subcategoría eliminada exitosamente');
        return { success: true, message: result.message };
      } else {
        throw new Error(result.error || result.details || 'Error eliminando subcategoría');
      }
    } catch (err) {
      console.error('❌ Hook Error eliminando subcategoría:', err);
      console.error('❌ Error details:', {
        message: err.message,
        stack: err.stack
      });
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Cargar categorías al montar el hook
  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    loadCategories,
    addSubcategory,
    removeSubcategory
  };
}
