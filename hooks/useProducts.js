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
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Agregar producto al estado local
        setProducts(prev => [result.data, ...prev]);
        return { success: true, message: result.message, data: result.data };
      } else {
        throw new Error(result.error || 'Error creando producto');
      }
    } catch (err) {
      console.error('❌ Hook Error creando producto:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Actualizar producto
  const updateProduct = async (id, updateData) => {
    try {
      setError(null);
      
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Actualizar producto en el estado local
        setProducts(prev => prev.map(product => 
          product.id === id ? { ...product, ...result.data } : product
        ));
        return { success: true, message: result.message };
      } else {
        throw new Error(result.error || 'Error actualizando producto');
      }
    } catch (err) {
      console.error('❌ Hook Error actualizando producto:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      setError(null);
      
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Eliminar producto del estado local
        setProducts(prev => prev.filter(product => product.id !== id));
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
