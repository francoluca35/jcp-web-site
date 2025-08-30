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
import { useState } from "react";

const catalogPages = [
  {
    id: 1,
    title: "HORNOS INDUSTRIALES",
    subtitle: "Tecnología de Vanguardia",
    description: "Hornos de convección y rotación diseñados para máxima eficiencia y producción continua en panaderías industriales.",
    products: [
      {
        name: "Horno Rotativo HR-2000",
        category: "Premium Line",
        image: "https://images.unsplash.com/photo-1656180384586-0f1cde47a9d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnJlYWQlMjBvdmVufGVufDF8fHx8MTc1NjQ5NDEyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specs: {
          capacity: "80 panes/tanda",
          power: "45 kW",
          efficiency: "95%",
          warranty: "3 años"
        },
        features: ["Control Digital Avanzado", "Eficiencia Energética A+++", "Sistema Anti-Vibración"],
        price: "€18.500",
        rating: 4.9,
        isNew: true
      },
      {
        name: "Horno Convección HC-1500",
        category: "Professional Line",
        image: "https://images.unsplash.com/photo-1703607888337-aae6d77b3d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwYmFrZXJ5JTIwbWFjaGluZXJ5fGVufDF8fHx8MTc1NjQ5NDEyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specs: {
          capacity: "60 panes/tanda",
          power: "32 kW",
          efficiency: "92%",
          warranty: "2 años"
        },
        features: ["Control Táctil", "Vapor Automático", "Estructura Robusta"],
        price: "€12.900",
        rating: 4.8,
        isNew: false
      }
    ]
  },
  {
    id: 2,
    title: "AMASADORAS INDUSTRIALES",
    subtitle: "Potencia y Precisión",
    description: "Sistemas de amasado de alta capacidad con tecnología europea para conseguir la consistencia perfecta en cada masa.",
    products: [
      {
        name: "Amasadora Espiral AE-100",
        category: "Heavy Duty",
        image: "https://images.unsplash.com/photo-1703607888337-aae6d77b3d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWl4ZXIlMjBiYWtlcnl8ZW58MXx8fHwxNzU2NDk0MTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specs: {
          capacity: "100 kg masa",
          power: "15 kW",
          speed: "Variable",
          warranty: "5 años"
        },
        features: ["Motor Inverter", "Bowl Extraíble", "Seguridad Máxima"],
        price: "€11.200",
        rating: 4.9,
        isNew: true
      },
      {
        name: "Amasadora Brazo AE-75",
        category: "Professional",
        image: "https://images.unsplash.com/photo-1572081608077-1af152703136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwcm9kdWN0aW9uJTIwbGluZXxlbnwxfHx8fDE3NTY0OTQxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specs: {
          capacity: "75 kg masa",
          power: "12 kW",
          speed: "2 velocidades",
          warranty: "3 años"
        },
        features: ["Sistema Planetario", "Acero Inoxidable", "Fácil Limpieza"],
        price: "€8.900",
        rating: 4.7,
        isNew: false
      }
    ]
  }
];

export function ModernCatalog() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % catalogPages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + catalogPages.length) % catalogPages.length);
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
                <div className="text-right">
                  <div className="text-sm font-medium opacity-75">Página</div>
                  <div className="text-2xl font-bold">{currentPage + 1} / {catalogPages.length}</div>
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

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold border-0">
                          MÁS INFO
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="border-2 border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white font-bold">
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

          {/* Industrial Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, value: "500+", label: "Instalaciones", color: "text-[#ff6b35]" },
              { icon: Award, value: "20+", label: "Años Experiencia", color: "text-[#ffd23f]" },
              { icon: Shield, value: "99.8%", label: "Uptime Garantizado", color: "text-[#ff6b35]" },
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
    </section>
  );
}