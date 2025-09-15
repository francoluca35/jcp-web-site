import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  BookOpen, 
  Zap, 
  Gauge, 
  Shield, 
  ArrowRight, 
  Star,
  TrendingUp,
  Award,
  Settings,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { QuoteModal } from "./QuoteModal";

// Datos por defecto en caso de error
const defaultCatalogPages = [
  {
    id: 1,
    title: "AMASADORAS RÁPIDAS",
    subtitle: "Eficiencia y Velocidad",
    description: "Amasadoras rápidas a espiral diseñadas para máxima productividad. Ideales para pastelerías, pizzerías y panaderías con espacio reducido.",
    products: [
      {
        name: "Amasadora Rápida C-004",
        category: "Compacta",
        image: "https://images.unsplash.com/photo-1703607888337-aae6d77b3d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWl4ZXIlMjBiYWtlcnl8ZW58MXx8fHwxNzU2NDk0MTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specs: {
          capacidad: "25 kg harina / 40 kg masa",
          potencia: "Motor trifásico 4HP",
          tiempo: "6-8 minutos",
          garantia: "2 años"
        },
        features: ["Espiral de acero forjado", "Rulemanes blindados", "Zona cilíndrica optimizada", "Ideal para espacios reducidos"],
        price: "Consultar",
        rating: 4.8,
        isNew: true,
        catalogFile: "/Document/catalogo_maquinaria.pdf",
        description: "El modelo más pequeño de la serie. Ideal para el pastelero, repostero, pizzería, supermercado y espacio reducido. Su capacidad de 25 kg. de harina equivale a 40 kg. de masa (según tipo de preparado de masa), en tan solo de 6 a 8 minutos."
      },
      {
        name: "Amasadora Rápida C-104",
        category: "Profesional",
        image: "https://images.unsplash.com/photo-1572081608077-1af152703136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwcm9kdWN0aW9uJTIwbGluZXxlbnwxfHx8fDE3NTY0OTQxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specs: {
          capacidad: "50 kg harina / 80 kg masa",
          potencia: "Motor trifásico 4HP",
          tiempo: "15 minutos",
          garantia: "2 años",
          produccion: "4-5 amasados/hora",
          harinaMinima: "3 kg mínimo"
        },
        features: [],
        price: "Consultar",
        rating: 4.9,
        isNew: true,
        catalogFile: "/Document/catalogo_maquinaria.pdf",
        description: "Con todas las virtudes de este sistema la nueva C-104 viene a cubrir las necesidades del panadero de hoy, así como pastelerías, pizzerías y afines. Con una capacidad de 50 kg de harina, equivalente a 80 kg de masa aprox. Puede rendir con comodidad, 4 a 5 amasados continuos por hora.",
        dimensions: {
          alto: "750mm",
          ancho: "1116mm",
          profundidad: "1150mm",
          peso: "400 kg"
        }
      }
    ]
  },
  {
    id: 2,
    title: "HORNOS ROTATIVOS",
    subtitle: "Tecnología de Cocción",
    description: "Hornos rotativos de alta eficiencia para producción continua. Diseñados para maximizar la capacidad de cocción con mínimo consumo energético.",
    products: [
      {
        name: "Horno Rotativo ZU-97",
        category: "Industrial",
        image: "https://images.unsplash.com/photo-1656180384586-0f1cde47a9d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnJlYWQlMjBvdmVufGVufDF8fHx8MTc1NjQ5NDEyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specs: {
          capacidad: "50 kg/h cocción",
          bandejas: "9 unidades",
          medidas: "45x70 cm",
          potencia: "17.800 kcal/h",
          consumoGas: "1 kg/h",
          tension: "220V/380V/110V",
          potenciaElectrica: "0.87 HP/0.65 kW"
        },
        features: ["Consumo gas 1 kg/h", "Tensión 220V/380V/110V", "Cámara fermentadora opcional", "Sistema de vapor", "Potencia instalada 0.9 kW", "Consumo eléctrico 12.5 kW/h"],
        price: "Consultar",
        rating: 4.9,
        isNew: true,
        catalogFile: "/Document/catalogo_maquinaria.pdf",
        description: "Horno rotativo de alta eficiencia con capacidad de cocción de 50 kg/h. Incluye 9 bandejas de 45x70 cm y sistema de control avanzado.",
        dimensions: {
          alto: "122cm",
          ancho: "100cm",
          largo: "174cm",
          peso: "200 kg"
        }
      },
      {
        name: "Horno Rotativo SIGMA B-4570",
        category: "Profesional",
        image: "https://images.unsplash.com/photo-1656180384586-0f1cde47a9d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnJlYWQlMjBvdmVufGVufDF8fHx8MTc1NjQ5NDEyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specs: {
          bandejas: "15/18/20 unidades",
          medidas: "450x700 mm",
          superficie: "4.7 m²",
          potencia: "50.000 kcal",
          potenciaHP: "2.5 HP",
          potenciaKW: "1.84 kW",
          produccion: "37.840 kg/h",
          frente: "70/75 mm"
        },
        features: ["Construcción acero inoxidable", "Piso plano reforzado", "Enganche superior", "Vaporizador en cascada", "Campana recta", "Revestimiento exterior acero inoxidable"],
        price: "Consultar",
        rating: 4.8,
        isNew: true,
        catalogFile: "/Document/catalogo_maquinaria.pdf",
        description: "Horno rotativo SIGMA B-4570 con construcción interna y revestimiento exterior en acero inoxidable. Piso plano reforzado y vaporizador en cascada de gran superficie.",
        dimensions: {
          alto: "2550mm",
          ancho: "1250mm",
          largo: "1550mm",
          peso: "770 kg"
        }
      },
     
    ]
  },
  {
    id: 3,
    title: "BATIDORAS PLANETARIAS",
    subtitle: "Versatilidad y Precisión",
    description: "Batidoras planetarias profesionales para todo tipo de preparaciones. Desde masas hasta cremas y merengues.",
    products: [
      {
        name: "Batidora Planetaria B-20",
        category: "Profesional",
        image: "https://images.unsplash.com/photo-1572081608077-1af152703136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwcm9kdWN0aW9uJTIwbGluZXxlbnwxfHx8fDE3NTY0OTQxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specs: {
          capacidad: "20L recipiente",
          potencia: "Motor potente",
          velocidades: "Múltiples velocidades",
          garantia: "2 años",
          material: "Acero inoxidable",
          accesorios: "Incluidos"
        },
        features: ["Sistema planetario", "Accesorios incluidos", "Acero inoxidable", "Fácil limpieza"],
        price: "Consultar",
        rating: 4.7,
        isNew: false,
        catalogFile: "/Document/catalogo_maquinaria.pdf",
        description: "Batidora planetaria profesional ideal para pastelerías y panaderías. Sistema planetario que garantiza mezclado uniforme en todas las preparaciones."
      },
      {
        name: "Batidora Planetaria B-30",
        category: "Industrial",
        image: "https://images.unsplash.com/photo-1572081608077-1af152703136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwcm9kdWN0aW9uJTIwbGluZXxlbnwxfHx8fDE3NTY0OTQxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specs: {
          capacidad: "30L recipiente",
          potencia: "Motor industrial potente",
          velocidades: "Múltiples velocidades",
          garantia: "2 años",
          material: "Acero inoxidable",
          accesorios: "Incluidos"
        },
        features: ["Sistema planetario industrial", "Accesorios incluidos", "Acero inoxidable", "Fácil limpieza", "Uso intensivo"],
        price: "Consultar",
        rating: 4.8,
        isNew: true,
        catalogFile: "/Document/catalogo_maquinaria.pdf",
        description: "Batidora planetaria industrial de alta capacidad ideal para panaderías y pastelerías de gran producción. Sistema planetario robusto para uso intensivo."
      }
    ]
  }
];

export function ModernCatalog() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedProducts, setExpandedProducts] = useState(new Set());

  // Cargar productos destacados desde el JSON
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const response = await fetch('/data/modernProducts.json');
        const data = await response.json();
        
        // Seleccionar los 4 productos más importantes
        const allProducts = data.maquinarias || [];
        
        // Si no hay productos del JSON, usar los datos por defecto
        if (allProducts.length === 0) {
          // Extraer productos destacados de los datos por defecto
          const defaultProducts = [];
          defaultCatalogPages.forEach(category => {
            category.products.forEach(product => {
              defaultProducts.push(product);
            });
          });
          // Tomar solo los primeros 4
          setFeaturedProducts(defaultProducts.slice(0, 4));
        } else {
          // Seleccionar los 4 más importantes del JSON
          setFeaturedProducts(allProducts.slice(0, 4));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error cargando productos:', error);
        // En caso de error, usar los datos por defecto
        const defaultProducts = [];
        defaultCatalogPages.forEach(category => {
          category.products.forEach(product => {
            defaultProducts.push(product);
          });
        });
        setFeaturedProducts(defaultProducts.slice(0, 4));
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b35] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando productos destacados...</p>
        </div>
      </div>
    );
  }

  const handleQuote = (product) => {
    setSelectedProduct(product);
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedProduct(null);
  };

  const toggleProductExpansion = (productIndex) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(productIndex)) {
      newExpanded.delete(productIndex);
    } else {
      newExpanded.add(productIndex);
    }
    setExpandedProducts(newExpanded);
  };

  return (
    <section id="maquinas" className="pt-12 pb-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ff6b35] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ffd23f] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-[#ff6b35]/10 to-[#ffd23f]/10 rounded-full px-6 py-3 mb-6 border border-[#ff6b35]/20">
            <BookOpen className="h-5 w-5 text-[#ff6b35] mr-2" />
            <span className="text-[#1a1a1a] font-bold uppercase tracking-wide">Productos Destacados</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-6">
            NUESTRAS
            <span className="block bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent">MÁQUINAS</span>
          </h2>
          <p className="text-xl text-[#495057] max-w-3xl mx-auto">
            Descubre nuestra selección de equipamiento industrial más destacado. 
            Cada máquina diseñada para maximizar tu productividad y garantizar la máxima calidad.
          </p>
        </div>

        {/* Productos Destacados Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuredProducts.map((product, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#ff6b35]/30 overflow-hidden bg-gradient-to-br from-white to-[#f8f9fa]">
              {/* Product Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <Badge className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] text-white font-bold text-xs px-2 py-1">
                    {product.category}
                  </Badge>
                  {product.isNew && (
                    <Badge className="bg-[#1a1a1a] text-[#ffd23f] font-bold text-xs px-2 py-1">
                      NUEVO
                    </Badge>
                  )}
                </div>

                {/* Rating */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                  <Star className="h-3 w-3 text-[#ffd23f] fill-current mr-1" />
                  <span className="text-xs font-bold text-[#1a1a1a]">{product.rating}</span>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#1a1a1a] to-[#495057] text-white px-3 py-1 rounded-full">
                  <span className="font-black text-sm">{product.price}</span>
                </div>
              </div>

              <CardContent className="p-4">
                <h4 className="text-lg font-black text-[#1a1a1a] mb-2">{product.name}</h4>
                
                {/* Specs Grid - Mostrar 2 o todas según expansión */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {Object.entries(product.specs).slice(0, expandedProducts.has(index) ? Object.keys(product.specs).length : 2).map(([key, value], specIndex) => (
                    <div key={specIndex} className="bg-[#f8f9fa] rounded p-2 border border-[#dee2e6]">
                      <div className="text-xs font-bold text-[#495057] uppercase tracking-wide">{key}</div>
                      <div className="text-xs font-black text-[#1a1a1a]">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Features - Mostrar 2 o todas según expansión */}
                <div className="space-y-1 mb-4">
                  {product.features.slice(0, expandedProducts.has(index) ? product.features.length : 2).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full"></div>
                      <span className="text-xs text-[#495057] font-medium">{feature}</span>
                    </div>
                  ))}
                  {!expandedProducts.has(index) && product.features.length > 2 && (
                    <div className="text-xs text-[#495057] italic">
                      +{product.features.length - 2} características más...
                    </div>
                  )}
                </div>

                {/* Description - Solo mostrar si está expandido */}
                {expandedProducts.has(index) && product.description && (
                  <div className="mb-4">
                    <p className="text-xs text-[#495057] leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Ver más/Ver menos button */}
                {(Object.keys(product.specs).length > 2 || product.features.length > 2 || product.description) && (
                  <div className="mb-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-[#ff6b35] hover:text-[#ff5722] hover:bg-[#ff6b35]/10 p-1 h-auto text-xs font-medium"
                      onClick={() => toggleProductExpansion(index)}
                    >
                      {expandedProducts.has(index) ? (
                        <>
                          <ChevronUp className="h-3 w-3 mr-1" />
                          VER MENOS
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3 mr-1" />
                          VER MÁS
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold border-0 text-xs"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = product.catalogFile;
                      link.download = 'catalogo_maquinaria.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    INFO
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline" 
                    className="border-2 border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white font-bold text-xs"
                    onClick={() => handleQuote(product)}
                  >
                    COTIZAR
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ver Catálogo Completo Button */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-[#ff6b35]/10 to-[#ffd23f]/10 rounded-2xl p-8 border-2 border-[#ff6b35]/20">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              ¿Necesitas ver más opciones?
            </h3>
            <p className="text-[#495057] mb-6 max-w-2xl mx-auto">
              Explora nuestro catálogo completo con todas las máquinas disponibles, 
              especificaciones técnicas detalladas y opciones de personalización.
            </p>
            <Button 
              className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold border-0 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = '/catalog'}
            >
              <BookOpen className="mr-3 h-6 w-6" />
              VER CATÁLOGO COMPLETO
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Industrial Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, value: "200+", label: "Instalaciones", color: "text-[#ff6b35]" },
              { icon: Award, value: "20+", label: "Años Experiencia", color: "text-[#ffd23f]" },
              { icon: Shield, value: "100%", label: "Mano de obra Garantizadoa", color: "text-[#ff6b35]" },
              { icon: Settings, value: "24/7", label: "Soporte Técnico", color: "text-[#ffd23f]" }
            ].map((stat, index) => (
              <Card key={index} className="text-center p-6 bg-gradient-to-br from-white to-[#f8f9fa] border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-lg">
                <div className={`mx-auto mb-4 p-3 rounded-full bg-gradient-to-r from-[#ff6b35]/10 to-[#ffd23f]/10`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-black text-[#1a1a1a] mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-[#495057] uppercase tracking-wide">{stat.label}</div>
              </Card>
            ))}
        </div>
      </div>

      {/* Quote Modal */}
      {selectedProduct && (
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={closeQuoteModal}
          product={selectedProduct}
        />
      )}
    </section>
  );
}