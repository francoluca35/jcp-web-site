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
  const [currentPage, setCurrentPage] = useState(0);
  const [catalogPages, setCatalogPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cargar productos desde el JSON
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/data/modernProducts.json');
        const data = await response.json();
        
        // Transformar los datos al formato esperado por catalogPages
        const transformedData = [
          {
            id: 1,
            title: "AMASADORAS RÁPIDAS",
            subtitle: "Eficiencia y Velocidad",
            description: "Amasadoras rápidas a espiral diseñadas para máxima productividad. Ideales para pastelerías, pizzerías y panaderías con espacio reducido.",
            products: data.maquinarias.filter(p => p.name.includes("Amasadora"))
          },
          {
            id: 2,
            title: "HORNOS ROTATIVOS",
            subtitle: "Tecnología de Cocción",
            description: "Hornos rotativos de alta eficiencia para producción continua. Diseñados para maximizar la capacidad de cocción con mínimo consumo energético.",
            products: data.maquinarias.filter(p => p.name.includes("Horno"))
          }
        ];
        
        // Si no hay productos del JSON, usar los datos por defecto
        if (transformedData[0].products.length === 0 && transformedData[1].products.length === 0) {
          setCatalogPages(defaultCatalogPages);
        } else {
          setCatalogPages(transformedData);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error cargando productos:', error);
        // En caso de error, usar los datos por defecto
        setCatalogPages(defaultCatalogPages);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b35] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % catalogPages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + catalogPages.length) % catalogPages.length);
  };

  const handleQuote = (product) => {
    setSelectedProduct(product);
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedProduct(null);
  };

  const currentCatalog = catalogPages[currentPage];

  return (
    <section id="maquinas" className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
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
            <span className="text-[#1a1a1a] font-bold uppercase tracking-wide">Catálogo Digital</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-6">
            NUESTRAS
            <span className="block bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent">MÁQUINAS</span>
          </h2>
          <p className="text-xl text-[#495057] max-w-3xl mx-auto">
            Descubre nuestra gama completa de equipamiento industrial. Cada máquina diseñada 
            para maximizar tu productividad y garantizar la máxima calidad.
          </p>
        </div>

        {/* Catalog Book Layout */}
        <div className="relative max-w-7xl mx-auto">
          {/* Book Cover */}
          <div className="bg-gradient-to-br from-[#1a1a1a] via-[#495057] to-[#1a1a1a] rounded-3xl shadow-2xl overflow-hidden border-4 border-[#ff6b35]/20 backdrop-blur-sm">
            
                         {/* Page Header */}
             <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] p-8 text-white">
               <div className="flex justify-between items-center">
                 <div>
                   <h3 className="text-3xl font-black mb-2">{currentCatalog.title}</h3>
                   <p className="text-lg font-medium opacity-90">{currentCatalog.subtitle}</p>
                 </div>
                 <div className="flex items-center gap-4">
                   <Button 
                     variant="ghost" 
                     className="text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300"
                     onClick={prevPage}
                     disabled={currentPage === 0}
                   >
                     <ChevronLeft className="h-5 w-5" />
                   </Button>
                   
                   <div className="text-right">
                     <div className="text-sm font-medium opacity-75">Página</div>
                     <div className="text-2xl font-bold">{currentPage + 1} / {catalogPages.length}</div>
                   </div>
                   
                   <Button 
                     variant="ghost" 
                     className="text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300"
                     onClick={nextPage}
                     disabled={currentPage === catalogPages.length - 1}
                   >
                     <ChevronRight className="h-5 w-5" />
                   </Button>
                 </div>
               </div>
             </div>

            {/* Page Content */}
            <div className="p-8 bg-white">
              <p className="text-lg text-[#495057] mb-12 leading-relaxed">{currentCatalog.description}</p>

              {/* Products Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {currentCatalog.products.map((product, index) => (
                  <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#ff6b35]/30 overflow-hidden bg-gradient-to-br from-white to-[#f8f9fa]">
                    {/* Product Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <Badge className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] text-white font-bold">
                          {product.category}
                        </Badge>
                        {product.isNew && (
                          <Badge className="bg-[#1a1a1a] text-[#ffd23f] font-bold">
                            NUEVO
                          </Badge>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                        <Star className="h-4 w-4 text-[#ffd23f] fill-current mr-1" />
                        <span className="text-sm font-bold text-[#1a1a1a]">{product.rating}</span>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-4 right-4 bg-gradient-to-r from-[#1a1a1a] to-[#495057] text-white px-4 py-2 rounded-full">
                        <span className="font-black text-lg">{product.price}</span>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h4 className="text-2xl font-black text-[#1a1a1a] mb-3">{product.name}</h4>
                      
                      {/* Specs Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {Object.entries(product.specs).map(([key, value], specIndex) => (
                          <div key={specIndex} className="bg-[#f8f9fa] rounded-lg p-3 border border-[#dee2e6]">
                            <div className="text-xs font-bold text-[#495057] uppercase tracking-wide">{key}</div>
                            <div className="text-sm font-black text-[#1a1a1a]">{value}</div>
                          </div>
                        ))}
                      </div>

                                             {/* Features */}
                       <div className="space-y-2 mb-6">
                         {product.features.map((feature, featureIndex) => (
                           <div key={featureIndex} className="flex items-center space-x-2">
                             <div className="w-2 h-2 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full"></div>
                             <span className="text-sm text-[#495057] font-medium">{feature}</span>
                           </div>
                         ))}
                       </div>

                       {/* Description */}
                       {product.description && (
                         <div className="mb-6">
                           <h5 className="text-sm font-bold text-[#495057] uppercase tracking-wide mb-2">DESCRIPCIÓN</h5>
                           <p className="text-sm text-[#495057] leading-relaxed">{product.description}</p>
                         </div>
                       )}

                       {/* Dimensions */}
                       {product.dimensions && (
                         <div className="mb-6">
                           <h5 className="text-sm font-bold text-[#495057] uppercase tracking-wide mb-3">DIMENSIONES</h5>
                           <div className="grid grid-cols-2 gap-3">
                             {Object.entries(product.dimensions).map(([key, value], dimIndex) => (
                               <div key={dimIndex} className="bg-[#f8f9fa] rounded-lg p-2 border border-[#dee2e6]">
                                 <div className="text-xs font-bold text-[#495057] uppercase tracking-wide">{key}</div>
                                 <div className="text-sm font-black text-[#1a1a1a]">{value}</div>
                               </div>
                             ))}
                           </div>
                         </div>
                       )}

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold border-0"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = product.catalogFile;
                            link.download = 'catalogo_maquinaria.pdf';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          MÁS INFO
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-2 border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white font-bold"
                          onClick={() => handleQuote(product)}
                        >
                          COTIZAR
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

                                                   {/* Page Navigation */}
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#495057] p-6 flex justify-between items-center">
                <Button
                  onClick={prevPage}
                  variant="ghost"
                  className="text-white hover:bg-white/10 font-bold"
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  ANTERIOR
                </Button>

                <div className="flex space-x-2">
                  {catalogPages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentPage
                          ? 'bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] scale-125'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextPage}
                  variant="ghost"
                  className="text-white hover:bg-white/10 font-bold"
                  disabled={currentPage === catalogPages.length - 1}
                >
                  SIGUIENTE
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
                           </div>
           </div>

           {/* Ver Catálogos Completos Button */}
           <div className="mt-12 text-center">
             <div className="flex items-center justify-center gap-4">
               
               
               <Button 
                 className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold border-0 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                 onClick={() => window.location.href = '/catalog'}
               >
                 <BookOpen className="mr-3 h-6 w-6" />
                 VER CATÁLOGOS COMPLETOS
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