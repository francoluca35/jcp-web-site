import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import { useImageUpload } from '../../hooks/useImageUpload';
import SEOHead from '../../components/SEOHead';
import { 
  Package, 
  Plus,
  Upload,
  Save,
  X,
  Edit,
  Trash2,
  LogOut,
  Settings,
  Search,
  Filter,
  Award
} from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('products');
  const { user, loading, logout } = useAuth();
  
  // Manejar errores en los hooks
  let categories, loadingCategories, addSubcategory, removeSubcategory, loadCategories;
  let products, loadingProducts, createProduct, deleteProduct, updateProduct; // Add updateProduct here
  
  
  try {
    const categoriesHook = useCategories();
    categories = categoriesHook.categories || { nuevo: [], usado: [] };
    loadingCategories = categoriesHook.loading;
    addSubcategory = categoriesHook.addSubcategory;
    removeSubcategory = categoriesHook.removeSubcategory;
    loadCategories = categoriesHook.loadCategories;
  } catch (error) {
    console.error('Error en useCategories:', error);
    categories = { nuevo: [], usado: [] };
    loadingCategories = false;
    addSubcategory = () => Promise.resolve({ success: false, error: 'Hook error' });
    removeSubcategory = () => Promise.resolve({ success: false, error: 'Hook error' });
    loadCategories = () => Promise.resolve();
  }
  
 try {
    const productsHook = useProducts();
    products = productsHook.products || [];
    loadingProducts = productsHook.loading;
    createProduct = productsHook.createProduct;
    deleteProduct = productsHook.deleteProduct;
    updateProduct = productsHook.updateProduct; // Add this line
  } catch (error) {
    console.error('Error en useProducts:', error);
    products = [];
    loadingProducts = false;
    createProduct = () => Promise.resolve({ success: false, error: 'Hook error' });
    deleteProduct = () => Promise.resolve({ success: false, error: 'Hook error' });
    updateProduct = () => Promise.resolve({ success: false, error: 'Hook error' }); // And this line for the fallback
  }

  // Hook para subida de imágenes
  const { uploadMultipleImages, uploading: imageUploading } = useImageUpload();
  
  const router = useRouter();

  // Estados para el formulario de productos
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    characteristics: '',
    price: '',
    category: '',
    subcategory: '',
    condition: '', // nuevo o usado
    images: [],
    imagePreviews: [] // Para mostrar previews locales
  });

  const [newSubcategory, setNewSubcategory] = useState({
    name: '',
    category: 'nuevo'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  
  // Estados para búsqueda y filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('all');
  const [filterSubcategory, setFilterSubcategory] = useState('all');
  
  // Estados para manejo de imágenes
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [fixedSelection, setFixedSelection] = useState([]);
  const [savingFixed, setSavingFixed] = useState(false);

  const isRepuestoForm = (form) => {
    const subcategory = (form.subcategory || '').toLowerCase();
    const title = (form.title || '').toLowerCase();
    const description = (form.description || '').toLowerCase();

    return (
      subcategory.includes('repuesto') ||
      subcategory.includes('repuestos') ||
      subcategory.includes('spare') ||
      title.includes('repuesto') ||
      description.includes('repuesto')
    );
  };

  const isRepuestoProduct = (product) => {
    const subcategory = (product.subcategory || '').toLowerCase();
    const title = (product.title || '').toLowerCase();
    const description = (product.description || '').toLowerCase();

    return (
      subcategory.includes('repuesto') ||
      subcategory.includes('repuestos') ||
      subcategory.includes('spare') ||
      title.includes('repuesto') ||
      description.includes('repuesto')
    );
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!products || products.length === 0) return;
    const fixed = products.filter((product) => product.fixedFeatured).map((product) => product.id);
    setFixedSelection(fixed);
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleFixed = (productId) => {
    setFixedSelection((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, productId];
    });
  };

  const handleSaveFixed = async () => {
    if (fixedSelection.length !== 3) {
      alert('Debes seleccionar exactamente 3 máquinas fijas.');
      return;
    }

    setSavingFixed(true);
    try {
      const machines = products.filter((product) => !isRepuestoProduct(product));
      await Promise.all(
        machines.map((product) =>
          updateProduct(product.id, {
            fixedFeatured: fixedSelection.includes(product.id)
          })
        )
      );
      alert('Máquinas fijas actualizadas correctamente.');
    } catch (error) {
      console.error('Error guardando máquinas fijas:', error);
      alert('Error al guardar las máquinas fijas.');
    } finally {
      setSavingFixed(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    // Validar número de imágenes
    const totalImages = productForm.images.length + files.length;
    if (totalImages > 5) {
      setImageErrors({ 
        ...imageErrors, 
        maxImages: 'Máximo 5 imágenes permitidas' 
      });
      return;
    }
    
    // Validar tipos de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setImageErrors({ 
        ...imageErrors, 
        invalidType: 'Solo se permiten archivos JPG, PNG y WebP' 
      });
      return;
    }
    
    // Limpiar errores si todo está bien
    setImageErrors({});
    
    try {
      // Subir imágenes a Cloudinary
      const result = await uploadMultipleImages(files);
      
      if (result.success) {
        // Crear URLs de preview locales para mostrar inmediatamente
        const previewUrls = files.map(file => URL.createObjectURL(file));
        
        // Agregar las URLs de Cloudinary al formulario
        const cloudinaryUrls = result.images.map(img => img.url);
        
        setProductForm(prev => ({
          ...prev,
          images: [...prev.images, ...cloudinaryUrls],
          imagePreviews: [...(prev.imagePreviews || []), ...previewUrls]
        }));
      } else {
        setImageErrors({ 
          ...imageErrors, 
          uploadError: result.error || 'Error subiendo imágenes' 
        });
      }
    } catch (error) {
      console.error('Error subiendo imágenes:', error);
      setImageErrors({ 
        ...imageErrors, 
        uploadError: 'Error subiendo imágenes' 
      });
    }
    
    // Resetear el input para permitir subir el mismo archivo otra vez
    e.target.value = '';
  };

  const removeImage = (index) => {
    setProductForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews ? prev.imagePreviews.filter((_, i) => i !== index) : []
    }));
    
    // Ajustar el índice de imagen principal si es necesario
    if (mainImageIndex >= index && mainImageIndex > 0) {
      setMainImageIndex(mainImageIndex - 1);
    } else if (mainImageIndex >= productForm.images.length - 1) {
      setMainImageIndex(0);
    }
    
    // Limpiar errores
    setImageErrors({});
  };

  // PDF upload removed from form

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar imágenes
    if (productForm.images.length === 0) {
      setImageErrors({ minImages: 'Debe subir al menos 1 imagen' });
      setIsSubmitting(false);
      return;
    }

    if (productForm.images.length > 5) {
      setImageErrors({ maxImages: 'Máximo 5 imágenes permitidas' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Agregar información de imagen principal al producto
      const productData = {
        ...productForm,
        mainImageIndex: mainImageIndex
      };

      console.log('📋 Estado del formulario antes de enviar:', productForm);
      console.log('📤 Enviando producto a la base de datos:', productData);
      console.log('🔍 PDF URL que se está enviando:', productData.pdfUrl);
      const result = await createProduct(productData);
      
      if (result.success) {
        // Reset form
        setProductForm({
          title: '',
          description: '',
          characteristics: '',
          price: '',
          category: '',
          subcategory: '',
          condition: '',
          images: [],
          imagePreviews: []
        });
        setMainImageIndex(0);
        setImageErrors({});
        alert('Producto creado exitosamente!');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error al crear el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSubcategory = async () => {
    if (newSubcategory.name.trim()) {
      const result = await addSubcategory(newSubcategory.category, newSubcategory.name);
      
      if (result.success) {
        setNewSubcategory({ name: '', category: 'nuevo' });
        alert('Subcategoría agregada exitosamente!');
      } else {
        alert(`Error: ${result.error}`);
      }
    }
  };

  const handleRemoveSubcategory = async (category, index) => {
    const result = await removeSubcategory(category, index);
    
    if (result.success) {
      alert('Subcategoría eliminada exitosamente!');
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  // Funciones para editar productos
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      title: product.title,
      description: product.description,
      characteristics: product.characteristics,
      price: product.price,
      category: product.category || '',
      subcategory: product.subcategory,
      condition: product.condition,
      images: product.images || [],
      imagePreviews: [] // No hay previews para productos existentes
    });
    setMainImageIndex(product.mainImageIndex || 0);
    setImageErrors({});
    setShowEditModal(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar imágenes
    if (productForm.images.length === 0) {
      setImageErrors({ minImages: 'Debe subir al menos 1 imagen' });
      setIsSubmitting(false);
      return;
    }

    if (productForm.images.length > 5) {
      setImageErrors({ maxImages: 'Máximo 5 imágenes permitidas' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Agregar información de imagen principal al producto
      const productData = {
        ...productForm,
        mainImageIndex: mainImageIndex
      };

      const result = await updateProduct(
        editingProduct.id,
        productData
      );
      
      if (result.success) {
        setShowEditModal(false);
        setEditingProduct(null);
        setProductForm({
          title: '',
          description: '',
          characteristics: '',
          price: '',
          category: '',
          subcategory: '',
          condition: '',
          images: [],
          imagePreviews: []
        });
        setMainImageIndex(0);
        setImageErrors({});
        alert('Producto actualizado exitosamente!');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error al actualizar el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Funciones para eliminar productos
  const handleDeleteProduct = async (product) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${product.title}"?`)) {
      setDeletingProduct(product.id);
      
      try {
        const result = await deleteProduct(product.id);
        
        if (result.success) {
          alert('Producto eliminado exitosamente!');
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error al eliminar el producto');
      } finally {
        setDeletingProduct(null);
      }
    }
  };

  // Función para filtrar productos
  const filteredProducts = products.filter(product => {
    // Filtro por término de búsqueda
    const matchesSearch = searchTerm === '' || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.characteristics.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por condición
    const matchesCondition = filterCondition === 'all' || product.condition === filterCondition;
    
    // Filtro por subcategoría
    const matchesSubcategory = filterSubcategory === 'all' || product.subcategory === filterSubcategory;
    
    return matchesSearch && matchesCondition && matchesSubcategory;
  });

  const machineProducts = products.filter((product) => !isRepuestoProduct(product));

  // Obtener subcategorías únicas para el filtro
  const getUniqueSubcategories = () => {
    const subcategories = new Set();

    const addSubcategoryIfValid = (subcategory) => {
      if (subcategory && subcategory.toString().trim()) {
        subcategories.add(subcategory);
      }
    };

    if (filterCondition === 'all') {
      (categories?.nuevo || []).forEach(addSubcategoryIfValid);
      (categories?.usado || []).forEach(addSubcategoryIfValid);
    } else {
      (categories?.[filterCondition] || []).forEach(addSubcategoryIfValid);
    }

    products.forEach(product => {
      if (filterCondition === 'all' || product.condition === filterCondition) {
        addSubcategoryIfValid(product.subcategory);
      }
    });

    return Array.from(subcategories).sort();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#ff6b35] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <SEOHead 
        title="Panel de Administración - JCP Maquinaria Industrial"
        description="Panel de administración para gestionar productos de JCP Maquinaria Industrial."
        keywords="admin, administración, JCP, maquinaria industrial, productos"
      />
      
      <main className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Panel de Administración
                </h1>
                <p className="text-[#adb5bd]">
                  Bienvenido, {user.usuario} ({user.email}) • Gestiona tus productos
                </p>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-[#2d2d2d] p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'products'
                    ? 'bg-[#ff6b35] text-white'
                    : 'text-[#adb5bd] hover:text-white'
                }`}
              >
                <Package className="h-4 w-4" />
                <span>Productos</span>
              </button>
                <button
                onClick={() => setActiveTab('categories')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'categories'
                      ? 'bg-[#ff6b35] text-white'
                    : 'text-[#adb5bd] hover:text-white'
                  }`}
                >
                <Settings className="h-4 w-4" />
                <span>Categorías</span>
                </button>
              <button
                onClick={() => setActiveTab('fixed')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'fixed'
                    ? 'bg-[#ff6b35] text-white'
                    : 'text-[#adb5bd] hover:text-white'
                }`}
              >
                <Award className="h-4 w-4" />
                <span>Fijas</span>
              </button>
            </div>
          </div>

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Form */}
              <div className="bg-[#2d2d2d] border border-[#ff6b35]/20 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Crear Nuevo Producto
                </h2>

                <form onSubmit={handleSubmitProduct} className="space-y-6">
                  {/* Título */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Título del Producto
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={productForm.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white placeholder-[#adb5bd] focus:border-[#ff6b35] focus:outline-none"
                      placeholder="Ej: Horno Industrial 50L"
                    />
                  </div>

                  {/* Descripción */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Descripción
                    </label>
                    <textarea
                      name="description"
                      value={productForm.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white placeholder-[#adb5bd] focus:border-[#ff6b35] focus:outline-none"
                      placeholder="Descripción detallada del producto..."
                    />
                  </div>

                  {/* Características */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Características
                    </label>
                    <textarea
                      name="characteristics"
                      value={productForm.characteristics}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white placeholder-[#adb5bd] focus:border-[#ff6b35] focus:outline-none"
                      placeholder="• Capacidad: 50L&#10;• Potencia: 3KW&#10;• Material: Acero inoxidable&#10;• Dimensiones: 60x50x80cm"
                    />
          </div>

                  {/* Precio */}
                      <div>
                    <label className="block text-white font-medium mb-2">
                      Precio
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={productForm.price}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white placeholder-[#adb5bd] focus:border-[#ff6b35] focus:outline-none"
                      placeholder="Ej: $2,500"
                    />
                      </div>

                  {/* Condición (Nuevo/Usado) */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Condición
                    </label>
                    <select
                      name="condition"
                      value={productForm.condition}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white focus:border-[#ff6b35] focus:outline-none"
                    >
                      <option value="">Seleccionar condición</option>
                      <option value="nuevo">Nuevo</option>
                      <option value="usado">Usado</option>
                    </select>
                      </div>

                  {/* Subcategoría */}
                  {productForm.condition && (
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Subcategoría
                      </label>
                      <select
                        name="subcategory"
                        value={productForm.subcategory}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white focus:border-[#ff6b35] focus:outline-none"
                      >
                        <option value="">Seleccionar subcategoría</option>
                        {categories[productForm.condition]?.map((sub, index) => (
                          <option key={index} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Imágenes */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Imágenes <span className="text-red-400">*</span>
                      <span className="text-sm text-[#adb5bd] ml-2">
                        (Mínimo 1, máximo 5 imágenes)
                      </span>
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageUpload}
                      disabled={imageUploading}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white focus:border-[#ff6b35] focus:outline-none disabled:opacity-50"
                    />
                    
                    {/* Indicador de carga */}
                    {imageUploading && (
                      <div className="mt-2 flex items-center text-[#ff6b35]">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#ff6b35] mr-2"></div>
                        <span className="text-sm">Subiendo imágenes...</span>
                      </div>
                    )}
                    
                    {/* Mostrar errores de imágenes */}
                    {Object.keys(imageErrors).length > 0 && (
                      <div className="mt-2 space-y-1">
                        {Object.values(imageErrors).map((error, index) => (
                          <p key={index} className="text-red-400 text-sm">{error}</p>
                        ))}
                      </div>
                    )}
                    
                    {/* Contador de imágenes */}
                    <div className="mt-2 text-sm text-[#adb5bd]">
                      {productForm.images.length}/5 imágenes
                    </div>
                    
                    {/* Preview de imágenes */}
                    {productForm.images.length > 0 && (
                      <div className="mt-4">
                        <p className="text-white font-medium mb-3">
                          Selecciona la imagen principal (aparecerá en el catálogo):
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {productForm.images.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={productForm.imagePreviews && productForm.imagePreviews[index] ? productForm.imagePreviews[index] : image}
                                alt={`Preview ${index + 1}`}
                                className={`w-full h-32 object-cover rounded-lg cursor-pointer transition-all ${
                                  mainImageIndex === index 
                                    ? 'ring-4 ring-[#ff6b35] ring-opacity-50' 
                                    : 'hover:ring-2 hover:ring-[#ff6b35] hover:ring-opacity-30'
                                }`}
                                onClick={() => setMainImageIndex(index)}
                              />
                              
                              {/* Indicador de imagen principal */}
                              {mainImageIndex === index && (
                                <div className="absolute top-2 left-2 bg-[#ff6b35] text-white px-2 py-1 rounded-full text-xs font-medium">
                                  Principal
                                </div>
                              )}
                              
                              {/* Botón eliminar */}
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                              >
                                <X className="h-4 w-4" />
                              </button>
                              
                              {/* Número de imagen */}
                              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                                {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creando...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Crear Producto</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Products List */}
              <div className="bg-[#2d2d2d] border border-[#ff6b35]/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">
                    Productos Creados ({filteredProducts.length} de {products.length})
                  </h2>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-[#ff6b35] hover:text-[#ffd23f] transition-colors"
                    title="Recargar productos"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                </div>

                {/* Buscador y Filtros */}
                <div className="mb-6 space-y-4">
                  {/* Barra de búsqueda */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#adb5bd]" />
                    <input
                      type="text"
                      placeholder="Buscar productos por título, descripción o características..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white placeholder-[#adb5bd] focus:border-[#ff6b35] focus:outline-none"
                    />
                  </div>

                  {/* Filtros */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                    {/* Filtro por condición */}
                    <div className="flex items-center space-x-2 min-w-0">
                      <Filter className="h-4 w-4 text-[#ff6b35]" />
                      <select
                        value={filterCondition}
                        onChange={(e) => {
                          setFilterCondition(e.target.value);
                          setFilterSubcategory('all'); // Reset subcategory filter
                        }}
                        className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white focus:border-[#ff6b35] focus:outline-none"
                      >
                        <option value="all">Todas las condiciones</option>
                        <option value="nuevo">Nuevo</option>
                        <option value="usado">Usado</option>
                      </select>
                    </div>

                    {/* Filtro por subcategoría */}
                    <div className="flex items-center space-x-2 min-w-0">
                      <Package className="h-4 w-4 text-[#ff6b35]" />
                      <select
                        value={filterSubcategory}
                        onChange={(e) => setFilterSubcategory(e.target.value)}
                        className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white focus:border-[#ff6b35] focus:outline-none"
                      >
                        <option value="all">Todas las subcategorías</option>
                        {getUniqueSubcategories().map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>

                    {/* Botón para limpiar filtros */}
                    {(searchTerm || filterCondition !== 'all' || filterSubcategory !== 'all') && (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setFilterCondition('all');
                          setFilterSubcategory('all');
                        }}
                        className="px-4 py-2 bg-[#6c757d] hover:bg-[#5a6268] text-white rounded-lg transition-colors text-sm w-full"
                      >
                        Limpiar filtros
                      </button>
                    )}
                  </div>

                  {/* Indicadores de filtros activos */}
                  {(searchTerm || filterCondition !== 'all' || filterSubcategory !== 'all') && (
                    <div className="flex flex-wrap gap-2">
                      {searchTerm && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#ff6b35]/20 text-[#ff6b35] border border-[#ff6b35]/30">
                          <Search className="h-3 w-3 mr-1" />
                          "{searchTerm}"
                        </span>
                      )}
                      {filterCondition !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#ff6b35]/20 text-[#ff6b35] border border-[#ff6b35]/30">
                          <Filter className="h-3 w-3 mr-1" />
                          {filterCondition === 'nuevo' ? 'Nuevo' : 'Usado'}
                        </span>
                      )}
                      {filterSubcategory !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#ff6b35]/20 text-[#ff6b35] border border-[#ff6b35]/30">
                          <Package className="h-3 w-3 mr-1" />
                          {filterSubcategory}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {products.length === 0 ? (
                    <p className="text-[#adb5bd] text-center py-8">
                      No hay productos creados aún
                    </p>
                  ) : filteredProducts.length === 0 ? (
                    <p className="text-[#adb5bd] text-center py-8">
                      No se encontraron productos con los filtros aplicados
                    </p>
                  ) : (
                    filteredProducts.map((product) => (
                      <div key={product.id} className="bg-[#1a1a1a] border border-[#ff6b35]/10 rounded-lg p-4">
                        <div className="flex gap-4">
                          {/* Imagen del producto */}
                          <div className="flex-shrink-0">
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={product.images[product.mainImageIndex || 0]}
                                alt={product.title}
                                className="w-20 h-20 object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.src = '/Assets/logojcp.png';
                                }}
                              />
                            ) : (
                              <div className="w-20 h-20 bg-[#2d2d2d] rounded-lg flex items-center justify-center">
                                <Package className="h-8 w-8 text-[#adb5bd]" />
                              </div>
                            )}
                          </div>
                          
                          {/* Información del producto */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold mb-1 truncate">{product.title}</h3>
                            <p className="text-[#adb5bd] text-sm mb-2 line-clamp-2">{product.description}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-[#ff6b35] font-semibold">{product.price}</span>
                              <span className="text-[#adb5bd] capitalize bg-[#2d2d2d] px-2 py-1 rounded">
                                {product.condition}
                              </span>
                              <span className="text-[#adb5bd] bg-[#2d2d2d] px-2 py-1 rounded">
                                {product.subcategory}
                              </span>
                            </div>
                            {product.characteristics && (
                              <p className="text-[#adb5bd] text-xs mt-2 line-clamp-2">
                                {product.characteristics}
                              </p>
                            )}
                          </div>
                          
                          {/* Botones de acción */}
                          <div className="flex flex-col space-y-2">
                            <button 
                              onClick={() => handleEditProduct(product)}
                              className="text-blue-400 hover:text-blue-300 p-2 hover:bg-[#2d2d2d] rounded transition-colors"
                              title="Editar producto"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product)}
                              disabled={deletingProduct === product.id || product.fixedFeatured}
                              className="text-red-400 hover:text-red-300 p-2 hover:bg-[#2d2d2d] rounded transition-colors disabled:opacity-50"
                              title={product.fixedFeatured ? 'No se puede eliminar un producto fijo' : 'Eliminar producto'}
                            >
                              {deletingProduct === product.id ? (
                                <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Fixed Products Tab */}
          {activeTab === 'fixed' && (
            <div className="bg-[#2d2d2d] border border-[#ff6b35]/20 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Máquinas Fijas (3)
                  </h2>
                  <p className="text-[#adb5bd] text-sm">
                    Selecciona las 3 máquinas que se verán fijas en la portada. No se pueden borrar.
                  </p>
                </div>
                <div className="text-sm text-[#adb5bd]">
                  Seleccionadas: <span className="text-white font-semibold">{fixedSelection.length}</span>/3
                </div>
              </div>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                {machineProducts.length === 0 ? (
                  <p className="text-[#adb5bd] text-center py-6">No hay máquinas disponibles</p>
                ) : (
                  machineProducts.map((product) => {
                    const isSelected = fixedSelection.includes(product.id);
                    const isDisabled = !isSelected && fixedSelection.length >= 3;
                    return (
                      <label
                        key={product.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                          isSelected
                            ? 'border-[#ff6b35] bg-[#1a1a1a]'
                            : 'border-[#ff6b35]/10 bg-[#1a1a1a]/60'
                        } ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-[#ff6b35]/40'}`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          disabled={isDisabled}
                          onChange={() => handleToggleFixed(product.id)}
                          className="h-4 w-4 accent-[#ff6b35]"
                        />
                        <div className="flex items-center gap-4 flex-1">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[product.mainImageIndex || 0]}
                              alt={product.title}
                              className="w-16 h-16 object-cover rounded-lg border border-[#ff6b35]/10"
                              onError={(e) => {
                                e.target.src = '/Assets/logojcp.png';
                              }}
                            />
                          ) : (
                            <div className="w-16 h-16 bg-[#2d2d2d] rounded-lg flex items-center justify-center">
                              <Package className="h-6 w-6 text-[#adb5bd]" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="text-white font-semibold truncate">{product.title}</div>
                            <div className="text-[#adb5bd] text-sm truncate">{product.subcategory}</div>
                          </div>
                        </div>
                      </label>
                    );
                  })
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-end">
                <button
                  onClick={handleSaveFixed}
                  disabled={savingFixed || fixedSelection.length !== 3}
                  className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingFixed ? 'Guardando...' : 'Guardar Fijas'}
                </button>
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Add Subcategory */}
              <div className="bg-[#2d2d2d] border border-[#ff6b35]/20 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Crear Nueva Subcategoría
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Categoría
                    </label>
                    <select
                      value={newSubcategory.category}
                      onChange={(e) => setNewSubcategory(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white focus:border-[#ff6b35] focus:outline-none"
                    >
                      <option value="nuevo">Nuevo</option>
                      <option value="usado">Usado</option>
                    </select>
              </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Nombre de la Subcategoría
                    </label>
                  <input
                    type="text"
                      value={newSubcategory.name}
                      onChange={(e) => setNewSubcategory(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white placeholder-[#adb5bd] focus:border-[#ff6b35] focus:outline-none"
                      placeholder="Ej: Hornos de Convección"
                  />
                </div>

                  <button
                    onClick={handleAddSubcategory}
                    className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Agregar Subcategoría</span>
                </button>
                </div>
              </div>

              {/* Subcategories List */}
              <div className="bg-[#2d2d2d] border border-[#ff6b35]/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">
                    Subcategorías Existentes
                  </h2>
                  <div className="flex items-center space-x-2">
                    {loadingCategories && (
                      <div className="w-4 h-4 border-2 border-[#ff6b35] border-t-transparent rounded-full animate-spin"></div>
                    )}
                    <button
                      onClick={loadCategories}
                      className="text-[#ff6b35] hover:text-[#ffd23f] transition-colors"
                      title="Recargar categorías"
                    >
                      <Settings className="h-4 w-4" />
                              </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Nuevo */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#ff6b35] mb-3">Nuevo</h3>
                    <div className="space-y-2">
                      {!categories?.nuevo || categories.nuevo.length === 0 ? (
                        <p className="text-[#adb5bd] text-sm py-4 text-center">
                          No hay subcategorías para productos nuevos
                        </p>
                      ) : (
                        (categories?.nuevo || []).map((sub, index) => (
                          <div key={index} className="flex items-center justify-between bg-[#1a1a1a] p-3 rounded-lg">
                            <span className="text-white">{sub}</span>
                            <button
                              onClick={() => handleRemoveSubcategory('nuevo', index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                              </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Usado */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#ff6b35] mb-3">Usado</h3>
                    <div className="space-y-2">
                      {!categories?.usado || categories.usado.length === 0 ? (
                        <p className="text-[#adb5bd] text-sm py-4 text-center">
                          No hay subcategorías para productos usados
                        </p>
                      ) : (
                        (categories?.usado || []).map((sub, index) => (
                          <div key={index} className="flex items-center justify-between bg-[#1a1a1a] p-3 rounded-lg">
                            <span className="text-white">{sub}</span>
                            <button
                              onClick={() => handleRemoveSubcategory('usado', index)}
                              className="text-red-400 hover:text-red-300"
                            >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal de Edición */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2d2d2d] border border-[#ff6b35]/20 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Edit className="h-5 w-5 mr-2" />
                  Editar Producto
                </h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingProduct(null);
                  }}
                  className="text-[#adb5bd] hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleUpdateProduct} className="space-y-6">
                {/* Título */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Título del Producto
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={productForm.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white placeholder-[#adb5bd] focus:border-[#ff6b35] focus:outline-none"
                    placeholder="Ej: Horno Industrial 50L"
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    value={productForm.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white placeholder-[#adb5bd] focus:border-[#ff6b35] focus:outline-none"
                    placeholder="Descripción detallada del producto..."
                  />
                </div>

                {/* Características */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Características
                  </label>
                  <textarea
                    name="characteristics"
                    value={productForm.characteristics}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white placeholder-[#adb5bd] focus:border-[#ff6b35] focus:outline-none"
                    placeholder="• Capacidad: 50L&#10;• Potencia: 3KW&#10;• Material: Acero inoxidable&#10;• Dimensiones: 60x50x80cm"
                  />
                </div>

                {/* Precio */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Precio
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={productForm.price}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white placeholder-[#adb5bd] focus:border-[#ff6b35] focus:outline-none"
                    placeholder="Ej: $2,500"
                  />
                </div>

                {/* Condición (Nuevo/Usado) */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Condición
                  </label>
                  <select
                    name="condition"
                    value={productForm.condition}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white focus:border-[#ff6b35] focus:outline-none"
                  >
                    <option value="">Seleccionar condición</option>
                    <option value="nuevo">Nuevo</option>
                    <option value="usado">Usado</option>
                  </select>
                </div>

                {/* Subcategoría */}
                {productForm.condition && (
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Subcategoría
                    </label>
                    <select
                      name="subcategory"
                      value={productForm.subcategory}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white focus:border-[#ff6b35] focus:outline-none"
                    >
                      <option value="">Seleccionar subcategoría</option>
                      {categories[productForm.condition]?.map((sub, index) => (
                        <option key={index} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Imágenes */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Imágenes <span className="text-red-400">*</span>
                    <span className="text-sm text-[#adb5bd] ml-2">
                      (Mínimo 1, máximo 5 imágenes)
                    </span>
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white focus:border-[#ff6b35] focus:outline-none disabled:opacity-50"
                  />
                  
                  {/* Indicador de carga */}
                  {imageUploading && (
                    <div className="mt-2 flex items-center text-[#ff6b35]">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#ff6b35] mr-2"></div>
                      <span className="text-sm">Subiendo imágenes...</span>
                    </div>
                  )}
                  
                  {/* Mostrar errores de imágenes */}
                  {Object.keys(imageErrors).length > 0 && (
                    <div className="mt-2 space-y-1">
                      {Object.values(imageErrors).map((error, index) => (
                        <p key={index} className="text-red-400 text-sm">{error}</p>
                      ))}
                    </div>
                  )}
                  
                  {/* Contador de imágenes */}
                  <div className="mt-2 text-sm text-[#adb5bd]">
                    {productForm.images.length}/5 imágenes
                  </div>
                  
                  {/* Preview de imágenes */}
                  {productForm.images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-white font-medium mb-3">
                        Selecciona la imagen principal (aparecerá en el catálogo):
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {productForm.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={productForm.imagePreviews && productForm.imagePreviews[index] ? productForm.imagePreviews[index] : image}
                              alt={`Preview ${index + 1}`}
                              className={`w-full h-32 object-cover rounded-lg cursor-pointer transition-all ${
                                mainImageIndex === index 
                                  ? 'ring-4 ring-[#ff6b35] ring-opacity-50' 
                                  : 'hover:ring-2 hover:ring-[#ff6b35] hover:ring-opacity-30'
                              }`}
                              onClick={() => setMainImageIndex(index)}
                            />
                            
                            {/* Indicador de imagen principal */}
                            {mainImageIndex === index && (
                              <div className="absolute top-2 left-2 bg-[#ff6b35] text-white px-2 py-1 rounded-full text-xs font-medium">
                                Principal
                              </div>
                            )}
                            
                            {/* Botón eliminar */}
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            
                            {/* Número de imagen */}
                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                              {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>


                {/* Botones */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingProduct(null);
                    }}
                    className="flex-1 bg-[#6c757d] hover:bg-[#5a6268] text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Actualizando...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Actualizar Producto</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
