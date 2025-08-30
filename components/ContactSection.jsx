import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageSquare,
  Calculator,
  Award
} from "lucide-react";

export function ContactSection() {
  return (
    <section id="contacto" className="py-24 bg-gradient-to-b from-white to-[#f8f9fa] relative overflow-hidden">
      {/* Industrial Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/10 to-[#ffd23f]/10"></div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-[#ff6b35]/10 to-[#ffd23f]/10 rounded-full px-6 py-3 mb-6 border border-[#ff6b35]/20">
            <Calculator className="h-5 w-5 text-[#ff6b35] mr-2" />
            <span className="text-[#1a1a1a] font-bold uppercase tracking-wide">Solicitud Industrial</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-6">
            CONTACTA
            <span className="block bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent">CON EXPERTOS</span>
          </h2>
          <p className="text-xl text-[#495057] max-w-3xl mx-auto leading-relaxed">
            Nuestro equipo técnico especializado está preparado para diseñar la solución 
            industrial perfecta para tu panadería. Cotización gratuita en 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-white to-[#f8f9fa] border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-[#1a1a1a] to-[#495057] text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-3">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className="text-2xl font-black uppercase tracking-wide">SOLICITAR COTIZACIÓN</span>
                    <div className="text-sm text-[#adb5bd] font-medium">Respuesta garantizada en 24h</div>
                  </div>
                </CardTitle>
                <CardDescription className="text-[#adb5bd] text-base mt-2">
                  Completa el formulario y nuestros expertos te enviarán una cotización industrial personalizada
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo *</Label>
                      <Input id="nombre" placeholder="Tu nombre" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Empresa</Label>
                      <Input id="empresa" placeholder="Nombre de tu panadería" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="tu@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono *</Label>
                      <Input id="telefono" placeholder="+34 600 000 000" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="producto">¿Qué te interesa? *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hornos">Hornos industriales</SelectItem>
                        <SelectItem value="amasadoras">Amasadoras</SelectItem>
                        <SelectItem value="linea-completa">Línea completa de producción</SelectItem>
                        <SelectItem value="repuestos">Repuestos específicos</SelectItem>
                        <SelectItem value="servicio">Servicio técnico</SelectItem>
                        <SelectItem value="otros">Otros productos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje">Mensaje *</Label>
                    <Textarea 
                      id="mensaje" 
                      placeholder="Cuéntanos sobre tu proyecto, capacidad de producción necesaria, presupuesto aproximado, etc."
                      className="min-h-[100px]"
                      required 
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold text-lg py-4 border-0 shadow-lg hover:scale-105 transition-all duration-300" size="lg">
                    <MessageSquare className="h-5 w-5 mr-3" />
                    ENVIAR SOLICITUD INDUSTRIAL
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="bg-gradient-to-br from-white to-[#f8f9fa] border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] text-white rounded-t-lg">
                <CardTitle className="text-xl font-black uppercase tracking-wide">CONTACTO DIRECTO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="flex items-start space-x-4 p-4 bg-[#f8f9fa] rounded-xl border border-[#dee2e6]">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-3">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-[#1a1a1a] text-lg uppercase">Oficinas y Showroom</div>
                    <div className="text-[#495057] font-medium mt-1">
                      Polígono Industrial Norte<br />
                      Calle Maquinaria, 45<br />
                      28050 Madrid, España
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-[#f8f9fa] rounded-xl border border-[#dee2e6]">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-3">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-[#1a1a1a] text-lg uppercase">Teléfono Industrial</div>
                    <div className="text-[#495057] font-bold text-xl">+34 900 123 456</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-[#f8f9fa] rounded-xl border border-[#dee2e6]">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-3">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-[#1a1a1a] text-lg uppercase">Email Comercial</div>
                    <div className="text-[#495057] font-bold text-lg">info@panindustrial.es</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-[#f8f9fa] rounded-xl border border-[#dee2e6]">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-3">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-[#1a1a1a] text-lg uppercase">Horario Industrial</div>
                    <div className="text-[#495057] font-medium mt-1">
                      <div className="flex justify-between"><span>Lun - Vie:</span> <span className="font-bold">8:00 - 18:00</span></div>
                      <div className="flex justify-between"><span>Sábados:</span> <span className="font-bold">9:00 - 14:00</span></div>
                      <div className="flex justify-between"><span>Emergencias:</span> <span className="font-bold text-[#ff6b35]">24/7</span></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Industrial Advantages */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#495057] text-white border-2 border-[#ff6b35] shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] text-white rounded-t-lg">
                <CardTitle className="text-xl font-black uppercase tracking-wide flex items-center">
                  <Award className="h-6 w-6 mr-2" />
                  VENTAJAS INDUSTRIALES
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    "20+ años liderando el sector industrial",
                    "Tecnología europea de última generación",
                    "Ingenieros especializados certificados",
                    "Financiación industrial flexible",
                    "Garantía extendida hasta 5 años",
                    "Mantenimiento predictivo avanzado"
                  ].map((advantage, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-[#ff6b35]/20">
                      <div className="w-3 h-3 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full flex-shrink-0"></div>
                      <span className="font-medium">{advantage}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}