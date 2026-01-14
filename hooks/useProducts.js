import { useState, useEffect } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar productos desde la API
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/products');
      const result = await response.json();
      
      if (result.success) {
        setProducts(result.data);
      } else {
        throw new Error(result.error || 'Error cargando productos');
      }
    } catch (err) {
      console.error('❌ Hook Error cargando productos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear nuevo producto
  const createProduct = async (productData) => {
    try {
      setError(null);
      
      console.log('📤 Hook: Enviando producto a la API:', {
        title: productData.title,
        condition: productData.condition,
        subcategory: productData.subcategory,
        imagesCount: productData.images?.length || 0
      });
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      console.log('📥 Hook: Respuesta recibida, status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Hook: Error en respuesta HTTP:', response.status, errorText);
        throw new Error(`Error HTTP ${response.status}: ${errorText}`);
      }
      
      const result = await response.json();
      console.log('📥 Hook: Resultado parseado:', result);
      
      if (result.success) {
        console.log('✅ Hook: Producto creado exitosamente');
        // Agregar producto al estado local
        setProducts(prev => [result.data, ...prev]);
        return { success: true, message: result.message, data: result.data };
      } else {
        console.error('❌ Hook: Error en resultado:', result.error);
        throw new Error(result.error || result.details || 'Error creando producto');
      }
    } catch (err) {
      console.error('❌ Hook Error creando producto:', err);
      console.error('❌ Error details:', {
        message: err.message,
        stack: err.stack
      });
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Actualizar producto (ahora solo necesita el ID, no condition ni subcategory)
  const updateProduct = async (id, updateData) => {
    try {
      setError(null);
      
      console.log('📤 Hook: Actualizando producto:', {
        id,
        updateDataKeys: Object.keys(updateData)
      });
      
      // Ahora solo necesitamos el ID en la URL
      const url = `/api/products?id=${encodeURIComponent(id)}`;
      console.log('📤 Hook: URL de actualización:', url);
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
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
        console.log('✅ Hook: Producto actualizado exitosamente');
        // Actualizar producto en el estado local
        setProducts(prev => prev.map(product => 
          String(product.id) === String(id) ? { ...product, ...result.data } : product
        ));
        return { success: true, message: result.message, data: result.data };
      } else {
        console.error('❌ Hook: Error en resultado:', result.error);
        throw new Error(result.error || result.details || 'Error actualizando producto');
      }
    } catch (err) {
      console.error('❌ Hook Error actualizando producto:', err);
      console.error('❌ Error details:', {
        message: err.message,
        stack: err.stack
      });
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Eliminar producto (ahora solo necesita el ID)
  const deleteProduct = async (id) => {
    try {
      setError(null);
      
      console.log('📤 Hook: Eliminando producto:', { id });
      
      const response = await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
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
        console.log('✅ Hook: Producto eliminado exitosamente');
        // Eliminar producto del estado local
        setProducts(prev => prev.filter(product => String(product.id) !== String(id)));
        return { success: true, message: result.message };
      } else {
        throw new Error(result.error || 'Error eliminando producto');
      }
    } catch (err) {
      console.error('❌ Hook Error eliminando producto:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Cargar productos al montar el hook
  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct
  };
}
