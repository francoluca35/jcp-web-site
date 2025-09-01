import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Cog, 
  Wrench, 
  Clock, 
  Shield, 
  Package,
  Truck,
  Phone,
  Settings,
  Zap,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  X,
  MessageCircle,
  Mail
} from "lucide-react";
import { useState, useEffect } from "react";

// Componente Modal de Contacto
function ContactModal({ isOpen, onClose, item, type }) {
  if (!isOpen) return null;

  const handleWhatsApp = () => {
    let message;
    if (type === "servicio") {
      message = `Hola, quiero contratar el servicio de "${item.title}"`;
    } else {
      message = `Hola, queria saber sobre el producto "${item.name}", que valor tiene y medios de pago.`;
    }
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5491163962947?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleEmail = () => {
    let subject, message;
    if (type === "servicio") {
      subject = `Contratación de ${item.title}`;
      message = `Hola, me gustaría saber más acerca del servicio de "${item.title}"

Cordiales saludos`;
    } else {
      subject = "Presupuesto repuesto";
      message = `Hola JCP, queria saber el presupuesto del repuesto "${item.name}" que precios metodos de pago y demora tienen con la entrega del mismo.

Cordiales saludos`;
    }
    
    const mailtoUrl = `mailto:info@jcp.com.ar?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(mailtoUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Solicitar {type === "servicio" ? item.title : item.name}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Elige cómo quieres contactarnos para solicitar este {type}.
          </p>
          
          <Button 
            onClick={handleWhatsApp} 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Contactar por WhatsApp</span>
          </Button>
          
          <Button 
            onClick={handleEmail} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <Mail className="h-5 w-5" />
            <span>Enviar por Email</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PartsAndServicesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState("");
  const [servicios, setServicios] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar servicios y repuestos desde JSON
  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar servicios
        const serviciosResponse = await fetch('/data/servicios.json');
        const serviciosData = await serviciosResponse.json();
        
        // Mapear los iconos desde strings a componentes
        const serviciosConIconos = serviciosData.servicios.map(servicio => ({
          ...servicio,
          icon: servicio.icon === 'Settings' ? Settings : 
                servicio.icon === 'Wrench' ? Wrench : 
                servicio.icon === 'Cog' ? Cog : Settings
        }));
        
        setServicios(serviciosConIconos);

        // Cargar repuestos
        const repuestosResponse = await fetch('/data/repuestos.json');
        const repuestosData = await repuestosResponse.json();
        setRepuestos(repuestosData.repuestos);

      } catch (error) {
        console.error('Error cargando datos:', error);
        // Fallback con datos por defecto
        setServicios([
          {
            title: "Mantenimiento Preventivo",
            description: "Revisiones programadas para optimizar el rendimiento y prevenir averías.",
            icon: Settings,
            features: ["Inspección completa", "Calibración", "Informe detallado"],
            price: "Desde €120/visita"
          },
          {
            title: "Reparación Urgente",
            description: "Servicio técnico 24/7 para resolver averías críticas en tu producción.",
            icon: Wrench,
            features: ["Respuesta inmediata", "Técnicos certificados", "Garantía reparación"],
            price: "€90/hora + desplazamiento"
          },
          {
            title: "Instalación y Puesta en Marcha",
            description: "Instalación profesional y capacitación para tu nuevo equipamiento.",
            icon: Cog,
            features: ["Instalación completa", "Formación operarios", "Garantía de funcionamiento"],
            price: "Incluido en compra"
          }
        ]);
        
        setRepuestos([
          {
            category: "Hornos",
            items: [
              { name: "Resistencias eléctricas", stock: "En stock", price: "€45-120" },
              { name: "Termostatos digitales", stock: "En stock", price: "€180-350" },
              { name: "Ventiladores de convección", stock: "2-3 días", price: "€220-480" },
              { name: "Válvulas de gas", stock: "En stock", price: "€95-200" }
            ]
          },
          {
            category: "Amasadoras",
            items: [
              { name: "Motores eléctricos", stock: "En stock", price: "€350-850" },
              { name: "Engranajes y transmisiones", stock: "En stock", price: "€120-300" },
              { name: "Sensores de seguridad", stock: "En stock", price: "€80-150" },
              { name: "Brazos amasadores", stock: "1-2 días", price: "€200-450" }
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSolicitar = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setModalType("");
  };

  return (
    <section id="repuestos" className="py-24 bg-gradient-to-b from-[#1a1a1a] to-[#495057] relative overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/10 to-[#ffd23f]/10"></div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-[#ff6b35]/20 to-[#ffd23f]/20 rounded-full px-6 py-3 mb-6 border border-[#ff6b35]/30">
            <Cog className="h-5 w-5 text-[#ffd23f] mr-2 animate-spin" />
            <span className="text-white font-bold uppercase tracking-wide">Soporte Industrial 24/7</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
            REPUESTOS & 
            <span className=" bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent">
               SERVICIOS
               </span>
          </h2>
          <p className="text-xl text-[#adb5bd] max-w-3xl mx-auto leading-relaxed">
            Mantenimiento predictivo, repuestos originales y servicio técnico especializado.
            Tu producción nunca se detiene con nuestro soporte industrial completo.
          </p>
        </div>

        <Tabs defaultValue="repuestos" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-[#374151] rounded-full p-2 flex items-center border border-[#4b5563] max-w-full overflow-hidden">
              <TabsTrigger 
                value="repuestos" 
                className="flex items-center space-x-2 sm:space-x-3 text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff6b35] data-[state=active]:to-[#ffd23f] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-full transition-all duration-300 hover:bg-[#4b5563] hover:scale-102 text-sm sm:text-base"
              >
                <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="uppercase tracking-wide font-black hidden sm:inline">REPUESTOS</span>
                <span className="uppercase tracking-wide font-black sm:hidden">REP.</span>
              </TabsTrigger>
              <TabsTrigger 
                value="servicios" 
                className="flex items-center space-x-2 sm:space-x-3 text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff6b35] data-[state=active]:to-[#ffd23f] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-full transition-all duration-300 hover:bg-[#4b5563] hover:scale-102 text-sm sm:text-base"
              >
                <Wrench className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="uppercase tracking-wide font-black hidden sm:inline">SERVICIOS</span>
                <span className="uppercase tracking-wide font-black sm:hidden">SERV.</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="repuestos">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b35]"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {repuestos.map((categoria, index) => (
                  <Card key={index} className="bg-gradient-to-br from-white to-[#f8f9fa] border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-2xl">
                    <CardHeader className="bg-gradient-to-r from-[#1a1a1a] to-[#495057] text-white rounded-t-lg">
                      <CardTitle className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-2">
                          <Settings className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <span className="text-xl font-black uppercase">Repuestos para {categoria.category}</span>
                          <div className="text-sm text-[#adb5bd] font-medium">Originales certificados</div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {categoria.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="group p-4 bg-white rounded-xl border border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                              <div className="flex-1">
                                <div className="font-bold text-[#1a1a1a] text-base sm:text-lg group-hover:text-[#ff6b35] transition-colors">{item.name}</div>
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mt-2">
                                  <Badge 
                                    variant={item.stock === "En stock" ? "default" : "secondary"} 
                                    className={`font-bold w-fit ${item.stock === "En stock" 
                                      ? "bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] text-white" 
                                      : "bg-[#adb5bd] text-white"
                                    }`}
                                  >
                                    {item.stock === "En stock" ? (
                                      <CheckCircle2 className="h-3 w-3 mr-1" />
                                    ) : (
                                      <Clock className="h-3 w-3 mr-1" />
                                    )}
                                    {item.stock}
                                  </Badge>
                                  <span className="text-base sm:text-lg font-black bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent">{item.price}</span>
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                <Button 
                                  variant="outline"
                                  className="border-2 border-[#ff6b35] bg-slate-500 text-[#c8c8c8] hover:bg-[#ff6b35] hover:text-white font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 transition-all duration-300"
                                  onClick={() => window.location.href = '/catalog'}
                                >
                                  <span className="hidden sm:inline">Ver catálogo</span>
                                  <span className="sm:hidden">Catálogo</span>
                                </Button>
                                <Button 
                                  className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold border-0 group-hover:scale-105 transition-transform text-xs sm:text-sm px-2 sm:px-3 py-1"
                                  onClick={() => handleSolicitar(item, "repuesto")}
                                >
                                  <span className="hidden sm:inline">SOLICITAR</span>
                                  <span className="sm:hidden">PEDIR</span>
                                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Industrial Features Grid */}
            <div className="mt-12 lg:mt-16">
              {/* Desktop: 3 cards in a row */}
              <div className="hidden lg:grid grid-cols-3 gap-8">
                {[
                  {
                    icon: Truck,
                    title: "LOGÍSTICA EXPRESS",
                    description: "24h Cercanos | 72h Mas de 15km",
                    color: "from-[#ff6b35] to-[#ffd23f]"
                  },
                  {
                    icon: Shield,
                    title: "GARANTÍA TOTAL",
                    description: "Repuestos originales certificados | 2 años garantía",
                    color: "from-[#ffd23f] to-[#ff6b35]"
                  },
                  {
                    icon: Package,
                    title: "STOCK INDUSTRIAL",
                    description: "1500+ referencias | Disponibilidad inmediata",
                    color: "from-[#ff6b35] to-[#ffd23f]"
                  }
                ].map((feature, index) => (
                  <Card key={index} className="text-center bg-gradient-to-br from-white to-[#f8f9fa] border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-2xl group">
                    <CardContent className="p-6 lg:p-8">
                      <div className={`mx-auto mb-4 lg:mb-6 p-3 lg:p-4 rounded-2xl bg-gradient-to-r ${feature.color} w-fit group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                      </div>
                      <h3 className="font-black text-lg lg:text-xl text-[#1a1a1a] mb-3 lg:mb-4 uppercase tracking-wide group-hover:text-[#ff6b35] transition-colors">{feature.title}</h3>
                      <p className="text-[#495057] font-medium leading-relaxed text-sm lg:text-base">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Tablet: 2 cards top, 1 centered bottom */}
              <div className="hidden sm:block lg:hidden">
                {/* Top row - 2 cards side by side */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {[
                    {
                      icon: Truck,
                      title: "LOGÍSTICA EXPRESS",
                      description: "24h Cercanos | 72h Mas de 15km",
                      color: "from-[#ff6b35] to-[#ffd23f]"
                    },
                    {
                      icon: Shield,
                      title: "GARANTÍA TOTAL",
                      description: "Repuestos originales certificados | 2 años garantía",
                      color: "from-[#ffd23f] to-[#ff6b35]"
                    }
                  ].map((feature, index) => (
                    <Card key={index} className="text-center bg-gradient-to-br from-white to-[#f8f9fa] border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-2xl group">
                      <CardContent className="p-6 lg:p-8">
                        <div className={`mx-auto mb-4 lg:mb-6 p-3 lg:p-4 rounded-2xl bg-gradient-to-r ${feature.color} w-fit group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                        </div>
                        <h3 className="font-black text-lg lg:text-xl text-[#1a1a1a] mb-3 lg:mb-4 uppercase tracking-wide group-hover:text-[#ff6b35] transition-colors">{feature.title}</h3>
                        <p className="text-[#495057] font-medium leading-relaxed text-sm lg:text-base">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Bottom row - centered card */}
                <div className="flex justify-center">
                  <Card className="text-center bg-gradient-to-br from-white to-[#f8f9fa] border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-2xl group w-full max-w-xs">
                    <CardContent className="p-6 lg:p-8">
                      <div className="mx-auto mb-4 lg:mb-6 p-3 lg:p-4 rounded-2xl bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] w-fit group-hover:scale-110 transition-transform duration-300">
                        <Package className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                      </div>
                      <h3 className="font-black text-lg lg:text-xl text-[#1a1a1a] mb-3 lg:mb-4 uppercase tracking-wide group-hover:text-[#ff6b35] transition-colors">STOCK INDUSTRIAL</h3>
                      <p className="text-[#495057] font-medium leading-relaxed text-sm lg:text-base">
                        1500+ referencias | Disponibilidad inmediata
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Mobile: 3 cards in column */}
              <div className="sm:hidden space-y-6">
                {[
                  {
                    icon: Truck,
                    title: "LOGÍSTICA EXPRESS",
                    description: "24h Cercanos | 72h Mas de 15km",
                    color: "from-[#ff6b35] to-[#ffd23f]"
                  },
                  {
                    icon: Shield,
                    title: "GARANTÍA TOTAL",
                    description: "Repuestos originales certificados | 2 años garantía",
                    color: "from-[#ffd23f] to-[#ff6b35]"
                  },
                  {
                    icon: Package,
                    title: "STOCK INDUSTRIAL",
                    description: "1500+ referencias | Disponibilidad inmediata",
                    color: "from-[#ff6b35] to-[#ffd23f]"
                  }
                ].map((feature, index) => (
                  <Card key={index} className="text-center bg-gradient-to-br from-white to-[#f8f9fa] border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-2xl group">
                    <CardContent className="p-6 lg:p-8">
                      <div className={`mx-auto mb-4 lg:mb-6 p-3 lg:p-4 rounded-2xl bg-gradient-to-r ${feature.color} w-fit group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                      </div>
                      <h3 className="font-black text-lg lg:text-xl text-[#1a1a1a] mb-3 lg:mb-4 uppercase tracking-wide group-hover:text-[#ff6b35] transition-colors">{feature.title}</h3>
                      <p className="text-[#495057] font-medium leading-relaxed text-sm lg:text-base">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="servicios">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b35]"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {servicios.map((servicio, index) => (
                  <Card key={index} className="text-center bg-gradient-to-br from-white to-[#f8f9fa] border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-500 hover:shadow-2xl group hover:scale-105">
                    <CardHeader className="pb-4">
                      <div className={`mx-auto mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl bg-gradient-to-r ${
                        index === 0 ? "from-[#ff6b35] to-[#ffd23f]" :
                        index === 1 ? "from-[#ffd23f] to-[#ff6b35]" :
                        "from-[#ff6b35] to-[#ffd23f]"
                      } w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <servicio.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl font-black text-[#1a1a1a] mb-3 uppercase tracking-wide group-hover:text-[#ff6b35] transition-colors">
                        {servicio.title}
                      </CardTitle>
                      <CardDescription className="text-[#495057] font-medium text-sm sm:text-base leading-relaxed">
                        {servicio.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                        {servicio.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-3 bg-[#f8f9fa] rounded-lg p-2 sm:p-3 border border-[#dee2e6]">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full flex-shrink-0"></div>
                            <span className="text-[#1a1a1a] font-medium text-left text-sm sm:text-base">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent mb-4 sm:mb-6">
                        {servicio.price}
                      </div>
                      <div className="flex space-x-3">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold text-sm sm:text-lg py-2 sm:py-3 border-0 group-hover:scale-105 transition-transform"
                          onClick={() => handleSolicitar(servicio, "servicio")}
                        >
                          <span className="hidden sm:inline">CONTRATAR AHORA</span>
                          <span className="sm:hidden">CONTRATAR</span>
                          <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Emergency Contact - Industrial Style */}
            <Card className="mt-12 lg:mt-16 bg-gradient-to-r from-[#1a1a1a] via-[#495057] to-[#1a1a1a] text-white border-4 border-[#ff6b35] relative overflow-hidden">
              {/* Warning stripes background */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffd23f]/10 to-[#ff6b35]/10"></div>
              </div>
              
              <CardContent className="text-center py-8 lg:py-12 relative">
                <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-4 lg:p-6 w-fit mx-auto mb-4 lg:mb-6 animate-pulse">
                  <Phone className="h-12 w-12 lg:h-16 lg:w-16 text-white" />
                </div>
                <div className="flex items-center justify-center mb-4">
                  <AlertTriangle className="h-4 w-4 lg:h-6 lg:w-6 text-[#ffd23f] mr-2 animate-bounce" />
                  <h3 className="text-xl lg:text-3xl font-black uppercase tracking-wide">ATENCION AL CLIENTE</h3>
                  <AlertTriangle className="h-4 w-4 lg:h-6 lg:w-6 text-[#ffd23f] ml-2 animate-bounce" />
                </div>
                <p className="text-sm lg:text-lg text-[#adb5bd] mb-4 lg:mb-6 font-medium">
                  Horario de atencion: Lunes a Viernes: 8:00 - 18:00, Sabados: 9:00 - 14:00
                </p>
              
                <div className="text-3xl lg:text-5xl font-black bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent mb-6 lg:mb-8">
                  +3500 SOLUCIONES
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold text-base lg:text-xl px-6 lg:px-8 py-3 lg:py-4 border-0 shadow-2xl">
                    <Phone className="mr-2 lg:mr-3 h-4 w-4 lg:h-6 lg:w-6" />
                    <span className="hidden sm:inline">LLAMAR AHORA</span>
                    <span className="sm:hidden">LLAMAR</span>
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-[#ffd23f] text-[#ffd23f] hover:bg-[#ffd23f] hover:text-[#1a1a1a] font-bold text-base lg:text-xl px-6 lg:px-8 py-3 lg:py-4">
                    <Zap className="mr-2 lg:mr-3 h-4 w-4 lg:h-6 lg:w-6" />
                    <span className="hidden sm:inline">CHAT TÉCNICO</span>
                    <span className="sm:hidden">CHAT</span>
                  </Button>
                </div>
                <div className="mt-4 lg:mt-6 text-xs lg:text-sm text-[#adb5bd] font-medium">
                  Tiempo promedio de respuesta: <span className="text-[#ffd23f] font-bold">15 minutos</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Contact Modal */}
      {selectedItem && (
        <ContactModal
          isOpen={isModalOpen}
          onClose={closeModal}
          item={selectedItem}
          type={modalType}
        />
      )}
    </section>
  );
}