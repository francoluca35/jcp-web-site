import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
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
  Settings
} from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('products');
  const { user, loading, logout } = useAuth();
  
  // Manejar errores en los hooks
  let categories, loadingCategories, addSubcategory, removeSubcategory, loadCategories;
  let products, loadingProducts, createProduct, deleteProduct;
  
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
  } catch (error) {
    console.error('Error en useProducts:', error);
    products = [];
    loadingProducts = false;
    createProduct = () => Promise.resolve({ success: false, error: 'Hook error' });
    deleteProduct = () => Promise.resolve({ success: false, error: 'Hook error' });
  }
  
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
    images: []
  });

  const [newSubcategory, setNewSubcategory] = useState({
    name: '',
    category: 'nuevo'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setProductForm(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const removeImage = (index) => {
    setProductForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await createProduct(productForm);
      
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
          images: []
        });
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
                      Imágenes
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ff6b35]/20 rounded-lg text-white focus:border-[#ff6b35] focus:outline-none"
                    />
                    
                    {/* Preview de imágenes */}
                    {productForm.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        {productForm.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
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
                <h2 className="text-xl font-bold text-white mb-6">
                  Productos Creados ({products.length})
                </h2>

                <div className="space-y-4">
                  {products.length === 0 ? (
                    <p className="text-[#adb5bd] text-center py-8">
                      No hay productos creados aún
                    </p>
                  ) : (
                    products.map((product) => (
                      <div key={product.id} className="bg-[#1a1a1a] border border-[#ff6b35]/10 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold mb-2">{product.title}</h3>
                            <p className="text-[#adb5bd] text-sm mb-2">{product.description}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-[#ff6b35] font-semibold">{product.price}</span>
                              <span className="text-[#adb5bd] capitalize">{product.condition}</span>
                              <span className="text-[#adb5bd]">{product.subcategory}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              <Trash2 className="h-4 w-4" />
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
      </main>
    </>
  );
}