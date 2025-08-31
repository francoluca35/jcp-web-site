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
  Settings,
  Award,
  Send,
  CheckCircle,
  Zap,
  Star,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    producto: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      producto: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Crear FormData para envío AJAX
      const formDataToSend = new FormData();
      formDataToSend.append('form-name', 'contacto-industrial');
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('empresa', formData.empresa);
      formDataToSend.append('telefono', formData.telefono);
      formDataToSend.append('producto', formData.producto);
      formDataToSend.append('mensaje', formData.mensaje);

      // Enviar usando fetch para evitar redirección
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSend).toString()
      });

      if (response.ok) {
        // Mostrar mensaje de éxito
        setIsSubmitted(true);
        
        // Resetear formulario
        setFormData({
          nombre: '',
          empresa: '',
          email: '',
          telefono: '',
          producto: '',
          mensaje: ''
        });
      } else {
        throw new Error('Error en el envío');
      }

    } catch (error) {
      console.error('Error enviando formulario:', error);
      setError('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
      
      // Ocultar mensaje de éxito después de 5 segundos
      if (isSubmitted) {
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }
    }
  };

  return (
    <section id="contacto" className="py-24 bg-gradient-to-b from-white to-[#f8f9fa] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/10 to-[#ffd23f]/10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-[#ffd23f] to-[#ff6b35] rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-[#ff6b35]/20 to-[#ffd23f]/20 rounded-full px-8 py-4 mb-8 border-2 border-[#ff6b35]/30 shadow-lg">
            <Settings className="h-6 w-6 text-[#ff6b35] mr-3 animate-spin" />
            <span className="text-[#1a1a1a] font-black uppercase tracking-wider text-lg">Solicitud Industrial Premium</span>
          </div>
          <h2 className="text-6xl lg:text-7xl font-black text-[#1a1a1a] mb-8 leading-tight">
            CONTACTA
            <span className="block bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent animate-pulse">
              CON EXPERTOS
            </span>
          </h2>
          <p className="text-2xl text-[#495057] max-w-4xl mx-auto leading-relaxed font-medium">
            Nuestro equipo técnico especializado está preparado para diseñar la solución 
            <span className="text-[#ff6b35] font-bold"> industrial perfecta </span>
            para tu panadería. Cotización gratuita en 24 horas.
          </p>
          
          {/* Success Message */}
          {isSubmitted && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-[#1a1a1a] mb-4">
                  ¡Solicitud Enviada!
                </h3>
                <p className="text-[#495057] text-lg mb-6">
                  Tu solicitud de cotización industrial ha sido recibida exitosamente. Nuestro equipo técnico especializado se pondrá en contacto contigo en las próximas 24 horas.
                </p>
                <div className="bg-gradient-to-r from-[#ff6b35]/10 to-[#ffd23f]/10 p-4 rounded-xl mb-6">
                  <p className="text-sm text-[#495057] font-medium">
                    📧 Recibirás confirmación por email
                  </p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-transform duration-300"
                >
                  ¡Perfecto!
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-8 p-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-2xl animate-bounce">
              <div className="flex items-center justify-center space-x-3">
                <AlertCircle className="h-8 w-8" />
                <span className="text-xl font-bold">Error al enviar</span>
              </div>
              <p className="text-center mt-2">{error}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Enhanced Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-white to-[#f8f9fa] border-4 border-[#dee2e6] hover:border-[#ff6b35]/50 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-[1.02]">
              <CardHeader className="bg-gradient-to-r from-[#1a1a1a] via-[#495057] to-[#1a1a1a] text-white rounded-t-lg relative overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/20 to-[#ffd23f]/20"></div>
                </div>
                <CardTitle className="flex items-center space-x-4 relative z-10">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-4 shadow-lg animate-pulse">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <span className="text-3xl font-black uppercase tracking-wider">SOLICITAR COTIZACIÓN</span>
                    <div className="text-lg text-[#adb5bd] font-bold mt-2 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-[#ffd23f] animate-bounce" />
                      Respuesta garantizada en 24h
                    </div>
                  </div>
                </CardTitle>
                <CardDescription className="text-[#adb5bd] text-lg mt-4 relative z-10">
                  Completa el formulario y nuestros expertos te enviarán una cotización industrial personalizada
                </CardDescription>
              </CardHeader>
              <CardContent className="p-10">
                <form 
                  name="contacto-industrial" 
                  method="POST" 
                  data-netlify="true" 
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                >
                  {/* Hidden inputs for Netlify Forms */}
                  <input type="hidden" name="form-name" value="contacto-industrial" />
                  <div className="hidden">
                    <input name="bot-field" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 group">
                      <Label htmlFor="nombre" className="text-lg font-bold text-[#1a1a1a] flex items-center">
                        <Star className="h-4 w-4 mr-2 text-[#ff6b35]" />
                        Nombre completo *
                      </Label>
                      <Input 
                        id="nombre" 
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Tu nombre completo" 
                        required 
                        className="h-14 text-lg border-2 border-[#dee2e6] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all duration-300 group-hover:border-[#ff6b35]/50"
                      />
                    </div>
                    <div className="space-y-3 group">
                      <Label htmlFor="empresa" className="text-lg font-bold text-[#1a1a1a]">Empresa</Label>
                      <Input 
                        id="empresa" 
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        placeholder="Nombre de tu panadería" 
                        className="h-14 text-lg border-2 border-[#dee2e6] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all duration-300 group-hover:border-[#ff6b35]/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 group">
                      <Label htmlFor="email" className="text-lg font-bold text-[#1a1a1a] flex items-center">
                        <Star className="h-4 w-4 mr-2 text-[#ff6b35]" />
                        Email *
                      </Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com" 
                        required 
                        className="h-14 text-lg border-2 border-[#dee2e6] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all duration-300 group-hover:border-[#ff6b35]/50"
                      />
                    </div>
                    <div className="space-y-3 group">
                      <Label htmlFor="telefono" className="text-lg font-bold text-[#1a1a1a] flex items-center">
                        <Star className="h-4 w-4 mr-2 text-[#ff6b35]" />
                        Teléfono *
                      </Label>
                      <Input 
                        id="telefono" 
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        placeholder="+34 600 000 000" 
                        required 
                        className="h-14 text-lg border-2 border-[#dee2e6] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all duration-300 group-hover:border-[#ff6b35]/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 group">
                    <Label htmlFor="producto" className="text-lg font-bold text-[#1a1a1a] flex items-center">
                      <Star className="h-4 w-4 mr-2 text-[#ff6b35]" />
                      ¿Qué te interesa? *
                    </Label>
                    <Select value={formData.producto} onValueChange={handleSelectChange}>
                      <SelectTrigger className="h-14 text-lg border-2 border-[#dee2e6] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all duration-300 group-hover:border-[#ff6b35]/50">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hornos">🔥 Hornos industriales</SelectItem>
                        <SelectItem value="amasadoras">⚙️ Amasadoras</SelectItem>
                        <SelectItem value="linea-completa">🏭 Línea completa de producción</SelectItem>
                        <SelectItem value="repuestos">🔧 Repuestos específicos</SelectItem>
                        <SelectItem value="servicio">🛠️ Servicio técnico</SelectItem>
                        <SelectItem value="otros">📦 Otros productos</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* Hidden input for the select value */}
                    <input type="hidden" name="producto" value={formData.producto} />
                  </div>

                  <div className="space-y-3 group">
                    <Label htmlFor="mensaje" className="text-lg font-bold text-[#1a1a1a] flex items-center">
                      <Star className="h-4 w-4 mr-2 text-[#ff6b35]" />
                      Mensaje *
                    </Label>
                    <Textarea 
                      id="mensaje" 
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      placeholder="Cuéntanos sobre tu proyecto, capacidad de producción necesaria, presupuesto aproximado, etc."
                      className="min-h-[120px] text-lg border-2 border-[#dee2e6] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all duration-300 group-hover:border-[#ff6b35]/50 resize-none"
                      required 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-black text-xl py-6 border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed" 
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>ENVIANDO SOLICITUD...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <Send className="h-6 w-6" />
                        <span>ENVIAR SOLICITUD INDUSTRIAL</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="bg-gradient-to-br from-white to-[#f8f9fa] border-4 border-[#dee2e6] hover:border-[#ff6b35]/50 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-105">
              <CardHeader className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] text-white rounded-t-lg">
                <CardTitle className="text-2xl font-black uppercase tracking-wider flex items-center">
                  <MessageSquare className="h-6 w-6 mr-3" />
                  CONTACTO DIRECTO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-[#f8f9fa] to-white rounded-2xl border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-lg group">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-[#1a1a1a] text-xl uppercase">Oficinas y Showroom</div>
                    <div className="text-[#495057] font-medium mt-2 text-lg">
                      Polígono Industrial Norte<br />
                      Calle Maquinaria, 45<br />
                      28050 Madrid, España
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-[#f8f9fa] to-white rounded-2xl border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-lg group">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-[#1a1a1a] text-xl uppercase">Teléfono Industrial</div>
                    <div className="text-[#495057] font-black text-2xl">+34 900 123 456</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-[#f8f9fa] to-white rounded-2xl border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-lg group">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-[#1a1a1a] text-xl uppercase">Email Comercial</div>
                    <div className="text-[#495057] font-black text-xl">info@panindustrial.es</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-[#f8f9fa] to-white rounded-2xl border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-lg group">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-[#1a1a1a] text-xl uppercase">Horario Industrial</div>
                    <div className="text-[#495057] font-medium mt-2 text-lg">
                      <div className="flex justify-between mb-2"><span>Lun - Vie:</span> <span className="font-black">8:00 - 18:00</span></div>
                      <div className="flex justify-between mb-2"><span>Sábados:</span> <span className="font-black">9:00 - 14:00</span></div>
                      <div className="flex justify-between"><span>Emergencias:</span> <span className="font-black text-[#ff6b35] text-xl">24/7</span></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Industrial Advantages */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#495057] text-white border-4 border-[#ff6b35] shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500">
              <CardHeader className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] text-white rounded-t-lg">
                <CardTitle className="text-2xl font-black uppercase tracking-wider flex items-center">
                  <Award className="h-8 w-8 mr-3" />
                  VENTAJAS INDUSTRIALES
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {[
                    "🏆 20+ años liderando el sector industrial",
                    "⚡ Tecnología europea de última generación",
                    "👨‍💼 Ingenieros especializados certificados",
                    "💰 Financiación industrial flexible",
                    "🛡️ Garantía extendida hasta 5 años",
                    "🔧 Mantenimiento predictivo avanzado"
                  ].map((advantage, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl border-2 border-[#ff6b35]/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
                      <div className="w-4 h-4 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="font-bold text-lg">{advantage}</span>
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