import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Search,
  Filter,
  MapPin,
  Eye,
  ShoppingCart,
  ArrowLeft,
  ArrowUp
} from "lucide-react";
import { useState, useEffect } from "react";
import { ContactModal } from "./ContactModal";
import { ImageGallery } from "./ImageGallery";

export function CompleteCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedCondition, setSelectedCondition] = useState("Todos");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Cargar productos desde la base de datos
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Cargar productos desde la API
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Error al cargar productos');
        }
        
        // Transformar los productos de la BD al formato esperado por el catálogo
        const transformedProducts = result.data.map(product => {
          const catalogFile = product.pdfUrl || '/Document/catalogo_maquinaria.pdf';
          console.log(`🔍 Producto: ${product.title}`);
          console.log(`📄 PDF URL: ${catalogFile}`);
          console.log(`🌐 URL completa: ${catalogFile.startsWith('http') ? catalogFile : window.location.origin + catalogFile}`);
          console.log(`✅ Tiene PDF específico: ${!!product.pdfUrl}`);
          return {
            id: product.id,
            name: product.title,
            description: product.description,
            price: product.price,
            condition: product.condition === 'nuevo' ? 'Nuevo' : 'Usado',
            category: product.subcategory || 'Maquinarias', // Usar subcategoría como categoría
            images: product.images || [],
            mainImageIndex: product.mainImageIndex || 0,
            characteristics: product.characteristics,
            // Campos adicionales para compatibilidad
            image: product.images && product.images.length > 0 
              ? product.images[product.mainImageIndex || 0] 
              : '/Assets/logo.png',
            catalogFile: catalogFile // PDF del producto o por defecto
          };
        });
        
        setAllProducts(transformedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando productos:', error);
        setError(error.message);
        setLoading(false);
        // Establecer productos vacíos en caso de error
        setAllProducts([]);
      }
    };

    loadProducts();
  }, []);

  // Detectar scroll para mostrar/ocultar botón de ir arriba
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtrar productos de forma segura
  const filteredProducts = allProducts.filter(product => {
    if (!product || typeof product !== 'object') return false;
    
    const matchesSearch = (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (product.characteristics && product.characteristics.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesCondition = selectedCondition === "Todos" || product.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const handleContact = (product) => {
    if (product && typeof product === 'object') {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Mostrar error si ocurrió
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error al cargar productos
          </h3>
          <p className="text-gray-600 mb-4">
            {error}
          </p>
          <Button 
            onClick={() => window.location.reload()}
            aria-label="Reintentar cargar catálogo"
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
             {/* Header */}
       <div className="bg-[#1a1a1a] shadow-sm border-b">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Botón Volver - Esquina izquierda en móvil */}
              <div className="flex text-white justify-start sm:hidden order-1">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="text-white hover:text-gray-900"
                >
                  <ArrowLeft className="h-5 text-white w-5 mr-2" />
                  Volver
                </Button>
              </div>
              
              {/* Logo JCP - Centrado en móvil, derecha en desktop */}
              <div className="flex items-center justify-center sm:justify-end order-2 sm:order-2">
                <img 
                  src="Assets/logo.png" 
                  alt="JCP Logo" 
                  className="h-12 sm:h-14 lg:h-16 w-auto"
                />
              </div>
              
              {/* Título y Botón Volver (desktop) */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 order-3 sm:order-1 sm:flex-1">
                {/* Botón Volver - Solo visible en desktop */}
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="hidden sm:flex text-white hover:text-gray-900 self-start sm:self-auto"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Volver
                </Button>
                
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl text-center font-bold text-white leading-tight">
                    Catálogo de Herramientas, Maquinarias y Repuestos
                  </h1>
                  <p className="text-sm sm:text-base text-center text-white mt-1 leading-relaxed">
                    Encuentra el equipo perfecto para tu panadería. Productos nuevos y usados de la mejor calidad.
                  </p>
                </div>
              </div>
            </div>
         </div>
       </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filtros */}
          <div className="lg:w-80">
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Filter className="h-5 w-5 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
              </div>

              {/* Buscar productos */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar productos
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Categoría */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Categoría
                </label>
                <div className="space-y-2">
                  {["Todos", ...new Set(allProducts.map(p => p.category).filter(Boolean))].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condición */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Condición
                </label>
                <div className="space-y-2">
                  {["Todos", "Nuevo", "Usado"].map((condition) => (
                    <button
                      key={condition}
                      onClick={() => setSelectedCondition(condition)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCondition === condition
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contador de productos */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Mostrando {filteredProducts.length} de {allProducts.length} productos
                </p>
              </div>
            </Card>
          </div>

          {/* Contenido principal - Grid de productos */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                                     {/* Galería de imágenes del producto */}
                   <div className="relative">
                     <ImageGallery 
                       images={product.images && product.images.length > 0 ? product.images : [product.image]} 
                       productName={product.name}
                       mainImageIndex={product.mainImageIndex || 0}
                     />
                     
                     {/* Badge de condición */}
                     <div className="absolute top-3 right-3 z-10">
                       <Badge 
                         className={`${
                           product.condition === "Nuevo" 
                             ? "bg-gray-900 text-white" 
                             : "bg-gray-100 text-gray-700"
                         } font-medium`}
                       >
                         {product.condition}
                       </Badge>
                     </div>
                   </div>

                  <CardContent className="p-4">
                    {/* Categoría */}
                    <Badge variant="secondary" className="mb-3 text-xs">
                      {product.category}
                    </Badge>

                    {/* Título */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Descripción */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                  

                    {/* Precio */}
                    <div className="text-xl font-bold text-gray-900 mb-4">
                      {product.price}
                    </div>

                    {/* Botones de acción */}
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        className={`flex-1 text-sm ${
                          product.catalogFile && 
                          product.catalogFile !== '/Document/catalogo_maquinaria.pdf' &&
                          (product.catalogFile.startsWith('/pdfs/') || product.catalogFile.startsWith('http'))
                            ? 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                            : 'border-gray-500 text-gray-500'
                        }`}
                        size="sm"
                        onClick={() => {
                          console.log('🖱️ Click en botón PDF para:', product.name);
                          console.log('📄 catalogFile:', product.catalogFile);
                          
                          // Verificar si el producto tiene un PDF específico
                          if (product.catalogFile && 
                              product.catalogFile !== '/Document/catalogo_maquinaria.pdf' &&
                              (product.catalogFile.startsWith('/pdfs/') || product.catalogFile.startsWith('http'))) {
                            // PDF específico del producto - abrir en nueva pestaña
                            console.log('🚀 Abriendo PDF específico:', product.catalogFile);
                            window.open(product.catalogFile, '_blank');
                          } else {
                            // PDF general del catálogo - abrir en nueva pestaña
                            console.log('📚 Abriendo catálogo general');
                            window.open('/Document/catalogo_maquinaria.pdf', '_blank');
                          }
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        {product.catalogFile && 
                         product.catalogFile !== '/Document/catalogo_maquinaria.pdf' &&
                         (product.catalogFile.startsWith('/pdfs/') || product.catalogFile.startsWith('http'))
                          ? 'F. Técnica' 
                          : 'Catálogo'}
                      </Button>
                                             <Button 
                         className="flex-1 text-sm bg-gray-900 hover:bg-orange-600"
                         size="sm"
                         onClick={() => handleContact(product)}
                       >
                         <ShoppingCart className="h-4 w-4 mr-1" />
                         Contactar
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mensaje cuando no hay productos */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-600">
                  Intenta ajustar los filtros o términos de búsqueda
                </p>
              </div>
            )}
          </div>
                 </div>
       </div>
       
               {/* Contact Modal */}
        {selectedProduct && (
          <ContactModal
            isOpen={isModalOpen}
            onClose={closeModal}
            product={selectedProduct}
          />
        )}

        {/* Botón Ir hacia arriba */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-0 right-6 bg-[#1a1a1a] hover:bg-orange-600 text-white  p-3  transition-all duration-300 z-40"
            size="sm"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </div>
    );
  }
