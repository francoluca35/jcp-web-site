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
      
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, subcategory }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Actualizar estado local
        setCategories(prev => ({
          ...prev,
          [type]: result.data.subcategorias
        }));
        return { success: true, message: result.message };
      } else {
        throw new Error(result.error || 'Error agregando subcategoría');
      }
    } catch (err) {
      console.error('❌ Hook Error agregando subcategoría:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Eliminar subcategoría
  const removeSubcategory = async (type, index) => {
    try {
      setError(null);
      
      const response = await fetch(`/api/categories?type=${type}&index=${index}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Actualizar estado local
        setCategories(prev => ({
          ...prev,
          [type]: result.data.subcategorias
        }));
        return { success: true, message: result.message };
      } else {
        throw new Error(result.error || 'Error eliminando subcategoría');
      }
    } catch (err) {
      console.error('❌ Hook Error eliminando subcategoría:', err);
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
