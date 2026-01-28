import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Search,
  Filter,
  MapPin,
  Eye,
  ArrowLeft,
  ArrowUp
} from "lucide-react";
import { useState, useEffect } from "react";
import { ContactModal } from "./ContactModal";
import { ImageGallery } from "./ImageGallery";

const WhatsAppIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M20.52 3.48A11.8 11.8 0 0 0 12.02 0C5.5 0 .2 5.3.2 11.82c0 2.08.54 4.12 1.56 5.93L0 24l6.4-1.68a11.82 11.82 0 0 0 5.62 1.43h.01c6.52 0 11.82-5.3 11.82-11.82 0-3.16-1.23-6.14-3.33-8.45ZM12.03 21.1h-.01a9.3 9.3 0 0 1-4.74-1.3l-.34-.2-3.8 1 1.01-3.7-.22-.36a9.2 9.2 0 0 1-1.42-4.96c0-5.07 4.12-9.2 9.2-9.2 2.46 0 4.77.96 6.5 2.7a9.13 9.13 0 0 1 2.69 6.5c0 5.08-4.13 9.2-9.2 9.2Zm5.35-6.95c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.14-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.64-.93-2.24-.24-.58-.48-.5-.68-.51-.17-.01-.38-.01-.58-.01-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5 0 1.48 1.08 2.91 1.23 3.11.15.2 2.12 3.25 5.14 4.56.72.31 1.29.5 1.73.64.73.23 1.4.2 1.93.12.59-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35Z"
    />
  </svg>
);
// Función para formatear el precio
const formatPrice = (price) => {
  // Si el precio es null, undefined, cadena vacía, o 0, mostrar "A consultar"
  if (!price || price === 0 || price === '0' || price === '' || price === null || price === undefined) {
    return 'A consultar';
  }
  
  // Convertir a número si es string
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  // Si no es un número válido, mostrar "A consultar"
  if (isNaN(numPrice) || numPrice === 0) {
    return 'A consultar';
  }
  
  // Formatear con signo de pesos
  return `$${numPrice.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export function CompleteCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedCondition, setSelectedCondition] = useState("Todos");
  const [expandedText, setExpandedText] = useState({});

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
        
        // Guardar todos los productos (incluyendo repuestos) para búsqueda por ID
        const allProductsData = result.data;
        
        // Transformar todos los productos (máquinas y repuestos) para búsqueda
        const transformedAllProducts = allProductsData.map(product => {
          const catalogFile = product.pdfUrl || '/Document/catalogo_maquinaria.pdf';
          return {
            id: product.id,
            name: product.title,
            description: product.description,
            price: product.price,
            condition: product.condition === 'nuevo' ? 'Nuevo' : 'Usado',
            category: product.subcategory || 'Maquinarias',
            images: product.images || [],
            mainImageIndex: product.mainImageIndex || 0,
            characteristics: product.characteristics,
            image: product.images && product.images.length > 0 
              ? product.images[product.mainImageIndex || 0] 
              : '/Assets/logojcp.png',
            catalogFile: catalogFile,
            isRepuesto: (() => {
              const subcategory = (product.subcategory || '').toLowerCase();
              const title = (product.title || '').toLowerCase();
              const description = (product.description || '').toLowerCase();
              return subcategory.includes('repuesto') || 
                     subcategory.includes('repuestos') ||
                     title.includes('repuesto') ||
                     description.includes('repuesto') ||
                     subcategory.includes('spare');
            })()
          };
        });
        
        console.log(`✅ Cargados ${transformedAllProducts.length} productos totales (incluyendo repuestos)`);
        setAllProducts(transformedAllProducts);
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

  // Detectar productId en la URL y hacer scroll al producto específico
  useEffect(() => {
    if (allProducts.length === 0 || loading) return;

    // Obtener productId de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    if (productId) {
      // Buscar el producto en todos los productos (incluyendo repuestos)
      const foundProduct = allProducts.find(p => p.id === productId || p.id.toString() === productId);
      
      if (foundProduct) {
        setTimeout(() => {
          const productElement = document.getElementById(`product-${productId}`);
          if (productElement) {
            // Hacer scroll al producto con un offset para el header
            const headerHeight = 100; // Ajustar según la altura del header
            const elementPosition = productElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });

            // Resaltar el producto brevemente
            productElement.style.transition = 'box-shadow 0.3s ease';
            productElement.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.5)';
            
            setTimeout(() => {
              productElement.style.boxShadow = '';
            }, 2000);

            // Limpiar el parámetro de la URL sin recargar la página
            const newUrl = window.location.pathname;
            window.history.replaceState({}, '', newUrl);
          }
        }, 500);
      }
    }
  }, [allProducts, loading]);

  // Detectar scroll para mostrar/ocultar botón de ir arriba
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getProductDescription = (product) => {
    const description = (product?.description || '').trim();
    if (description) return description;
    const characteristics = (product?.characteristics || '').trim();
    return characteristics;
  };

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
       <div className="bg-[#424242] shadow-sm border-b">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Botón Volver - Esquina izquierda en móvil */}
          
              
              {/* Logo JCP - Centrado en móvil, derecha en desktop */}
              <div className="flex items-center justify-center sm:justify-end order-2 sm:order-2">
                <img 
                  src="/Assets/logojcp2.png" 
                  alt="JCP Logo" 
                  className="h-12 sm:h-14 lg:h-16 w-auto rotate-3 scale-x-150 scale-y-90"
                />
              </div>
              
              {/* Título y Botón Volver (desktop) */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 order-3 sm:order-1 sm:flex-1">
                {/* Botón Volver - Solo visible en desktop */}
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="hidden sm:flex text-xl text-white hover:text-yellow-600 self-start sm:self-auto"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Volver
                </Button>
                
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl text-center font-bold text-white leading-tight">
                    Catálogo de Maquinarias, Repuestos y utiles
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
              {filteredProducts.map((product) => {
                const fullDescription = getProductDescription(product);
                const displayDescription = fullDescription || 'Sin descripción';
                const showMoreDescription = fullDescription.length > 50;
                const fullCharacteristics = (product?.characteristics || '').trim();
                const displayCharacteristics = fullCharacteristics || 'Sin características';
                const showMoreCharacteristics = fullCharacteristics.length > 50;
                const descriptionKey = `${product.id}-description`;
                const characteristicsKey = `${product.id}-characteristics`;
                const isDescriptionExpanded = !!expandedText[descriptionKey];
                const isCharacteristicsExpanded = !!expandedText[characteristicsKey];

                return (
                <Card key={product.id} id={`product-${product.id}`} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
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
                    <div className="mb-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">
                        Descripción
                      </p>
                      <p className={`text-sm text-gray-700 ${isDescriptionExpanded ? '' : 'line-clamp-2'}`}>
                        {displayDescription}
                      </p>

                      {showMoreDescription && (
                        <button
                          onClick={() =>
                            setExpandedText((prev) => ({
                              ...prev,
                              [descriptionKey]: !prev[descriptionKey]
                            }))
                          }
                          className="text-orange-600 font-semibold hover:underline mt-1 text-sm"
                        >
                          {isDescriptionExpanded ? 'Ver menos' : 'Ver descripción completa'}
                        </button>
                      )}
                    </div>

                    {/* Características */}
                    <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">
                        Características
                      </p>
                      <p className={`text-sm text-gray-700 ${isCharacteristicsExpanded ? '' : 'line-clamp-2'}`}>
                        {displayCharacteristics}
                      </p>
                      {showMoreCharacteristics && (
                        <button
                          onClick={() =>
                            setExpandedText((prev) => ({
                              ...prev,
                              [characteristicsKey]: !prev[characteristicsKey]
                            }))
                          }
                          className="text-orange-600 font-semibold hover:underline mt-1 text-sm"
                        >
                          {isCharacteristicsExpanded ? 'Ver menos' : 'Ver características completas'}
                        </button>
                      )}
                    </div>



                  

                    {/* Precio */}
                    <div className="text-xl font-bold text-gray-900 mb-4">
                      {formatPrice(product.price)}
                    </div>

                    {/* Botones de acción */}
                    <div className="flex space-x-2">
                      {/* <Button 
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
                      </Button> */}
                                             <Button 
                         className="flex-1 text-sm text-white bg-gray-900 hover:bg-green-600"
                         size="sm"
                         onClick={() => handleContact(product)}
                       >
                        <WhatsAppIcon className="h-4 w-4 mr-1" />
                         Contactar
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
