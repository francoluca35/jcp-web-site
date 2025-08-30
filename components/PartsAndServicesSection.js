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
  ArrowRight
} from "lucide-react";

const repuestos = [
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
];

const servicios = [
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
];

export function PartsAndServicesSection() {
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
            <TabsList className="bg-[#374151] rounded-full p-2 flex items-center  border border-[#4b5563] max-w-full ">
              <TabsTrigger 
                value="repuestos" 
                className="flex items-center space-x-3 text-white data-[state=active]:-ml-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff6b35] data-[state=active]:to-[#ffd23f] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 font-bold py-4 px-8 rounded-full transition-all duration-300 hover:bg-[#4b5563] hover:scale-102"
              >
                <Package className="h-5 w-5" />
                <span className="uppercase tracking-wide text-lg font-black">REPUESTOS</span>
              </TabsTrigger>
              <TabsTrigger 
                value="servicios" 
                className="flex items-center space-x-3 text-white data-[state=active]:-mr-1  data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff6b35] data-[state=active]:to-[#ffd23f] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 font-bold py-4 px-8 rounded-full transition-all duration-300 hover:bg-[#4b5563] hover:scale-102 hover:-mr-2"
              >
                <Wrench className="h-5 w-5" />
                <span className="uppercase tracking-wide text-lg font-black">SERVICIOS</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="repuestos">
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
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-bold text-[#1a1a1a] text-lg group-hover:text-[#ff6b35] transition-colors">{item.name}</div>
                              <div className="flex items-center space-x-3 mt-2">
                                <Badge 
                                  variant={item.stock === "En stock" ? "default" : "secondary"} 
                                  className={`font-bold ${item.stock === "En stock" 
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
                                <span className="text-lg font-black bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent">{item.price}</span>
                              </div>
                            </div>
                            <Button className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold border-0 group-hover:scale-105 transition-transform">
                              SOLICITAR
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Industrial Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  icon: Truck,
                  title: "LOGÍSTICA EXPRESS",
                  description: "24h península | 48h nacional | Urgentes <12h",
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
                  description: "15.000+ referencias | Disponibilidad inmediata",
                  color: "from-[#ff6b35] to-[#ffd23f]"
                }
              ].map((feature, index) => (
                <Card key={index} className="text-center bg-gradient-to-br from-white to-[#f8f9fa] border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-2xl group">
                  <CardContent className="p-8">
                    <div className={`mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-r ${feature.color} w-fit group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-black text-xl text-[#1a1a1a] mb-4 uppercase tracking-wide group-hover:text-[#ff6b35] transition-colors">{feature.title}</h3>
                    <p className="text-[#495057] font-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="servicios">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {servicios.map((servicio, index) => (
                <Card key={index} className="text-center bg-gradient-to-br from-white to-[#f8f9fa] border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-500 hover:shadow-2xl group hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className={`mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-r ${
                      index === 0 ? "from-[#ff6b35] to-[#ffd23f]" :
                      index === 1 ? "from-[#ffd23f] to-[#ff6b35]" :
                      "from-[#ff6b35] to-[#ffd23f]"
                    } w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <servicio.icon className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-black text-[#1a1a1a] mb-3 uppercase tracking-wide group-hover:text-[#ff6b35] transition-colors">
                      {servicio.title}
                    </CardTitle>
                    <CardDescription className="text-[#495057] font-medium text-base leading-relaxed">
                      {servicio.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-8">
                      {servicio.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3 bg-[#f8f9fa] rounded-lg p-3 border border-[#dee2e6]">
                          <div className="w-3 h-3 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full flex-shrink-0"></div>
                          <span className="text-[#1a1a1a] font-medium text-left">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-2xl font-black bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent mb-6">
                      {servicio.price}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold text-lg py-3 border-0 group-hover:scale-105 transition-transform">
                      CONTRATAR AHORA
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Contact - Industrial Style */}
            <Card className="mt-16 bg-gradient-to-r from-[#1a1a1a] via-[#495057] to-[#1a1a1a] text-white border-4 border-[#ff6b35] relative overflow-hidden">
              {/* Warning stripes background */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffd23f]/10 to-[#ff6b35]/10"></div>
              </div>
              
              <CardContent className="text-center py-12 relative">
                <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-6 w-fit mx-auto mb-6 animate-pulse">
                  <Phone className="h-16 w-16 text-white" />
                </div>
                <div className="flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-[#ffd23f] mr-2 animate-bounce" />
                  <h3 className="text-3xl font-black uppercase tracking-wide">EMERGENCIA 24/7</h3>
                  <AlertTriangle className="h-6 w-6 text-[#ffd23f] ml-2 animate-bounce" />
                </div>
                <p className="text-xl text-[#adb5bd] mb-6 font-medium">
                  Línea directa para averías críticas y paradas de producción
                </p>
                <div className="text-5xl font-black bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent mb-8">
                  +34 900 URGENTE
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold text-xl px-8 py-4 border-0 shadow-2xl">
                    <Phone className="mr-3 h-6 w-6" />
                    LLAMAR AHORA
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-[#ffd23f] text-[#ffd23f] hover:bg-[#ffd23f] hover:text-[#1a1a1a] font-bold text-xl px-8 py-4">
                    <Zap className="mr-3 h-6 w-6" />
                    CHAT TÉCNICO
                  </Button>
                </div>
                <div className="mt-6 text-sm text-[#adb5bd] font-medium">
                  Tiempo promedio de respuesta: <span className="text-[#ffd23f] font-bold">15 minutos</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}