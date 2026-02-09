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
  Send,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  Zap
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

  const handleWhatsApp = () => {
    const message = `Hola, me gustaría solicitar información sobre productos industriales para panadería.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5491163962947?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const subject = "Consulta sobre productos industriales";
    const body = `Hola JCP,

Me gustaría recibir información sobre sus productos industriales para panadería.

Cordiales saludos`;
    const mailtoUrl = `mailto:jcppanaderia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('📧 Respuesta del servidor:', result);
        setIsSubmitted(true);
        console.log('✅ Formulario enviado exitosamente');
      } else {
        throw new Error('Error en el envío');
      }

    } catch (error) {
      console.error('Error enviando formulario:', error);
      setError('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-12 bg-gradient-to-b from-white via-[#f8f9fa] to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-[#ffd23f] to-[#ff6b35] rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-3 leading-tight">
            CONTACTO
          </h2>
          <p className="text-lg text-[#495057] max-w-3xl mx-auto">
            Elige la forma más cómoda para contactarnos. Estamos aquí para ayudarte.
          </p>
        </div>

        {/* Quick Contact Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* WhatsApp Button */}
          <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-500 bg-gradient-to-br from-green-50 to-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 to-green-400/0 group-hover:from-green-400/10 group-hover:to-green-400/5 transition-all duration-300"></div>
            <CardContent className="p-5 relative">
              <button
                onClick={handleWhatsApp}
                className="w-full text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-[#1a1a1a] mb-1">WhatsApp</h3>
                    <p className="text-[#495057] mb-3 text-sm">
                      Respuesta inmediata. Escríbenos ahora mismo.
                    </p>
                    <div className="flex items-center text-green-600 font-bold text-base group-hover:translate-x-2 transition-transform duration-300">
                      <span>Contactar ahora</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </div>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Email Button */}
          <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#ff6b35] bg-gradient-to-br from-orange-50 to-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 to-orange-400/0 group-hover:from-orange-400/10 group-hover:to-orange-400/5 transition-all duration-300"></div>
            <CardContent className="p-5 relative">
              <button
                onClick={handleEmail}
                className="w-full text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-xl p-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-[#1a1a1a] mb-1">Email</h3>
                    <p className="text-[#495057] mb-3 text-sm">
                      Envíanos un correo detallado. Te responderemos pronto.
                    </p>
                    <div className="flex items-center text-[#ff6b35] font-bold text-base group-hover:translate-x-2 transition-transform duration-300">
                      <span>Enviar email</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </div>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-[#e9ecef] hover:border-[#ff6b35]/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-[#1a1a1a] to-[#495057] text-white py-4">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-lg p-2">
                    <Send className="h-5 w-5" />
                  </div>
                  <span>Formulario de Contacto</span>
                </CardTitle>
                <CardDescription className="text-gray-300 mt-1 text-sm">
                  Completa el formulario y te responderemos en 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 lg:p-6">
                <form 
                  name="contacto-industrial" 
                  method="POST" 
                  data-netlify="true" 
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="contacto-industrial" />
                  <div className="hidden">
                    <input name="bot-field" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-sm font-semibold text-[#1a1a1a]">
                        Nombre completo *
                      </Label>
                      <Input 
                        id="nombre" 
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Tu nombre completo" 
                        required 
                        className="h-11 border-2 border-[#dee2e6] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="empresa" className="text-sm font-semibold text-[#1a1a1a]">
                        Empresa
                      </Label>
                      <Input 
                        id="empresa" 
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        placeholder="Nombre de tu empresa" 
                        className="h-11 border-2 border-[#dee2e6] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-[#1a1a1a]">
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
                        className="h-11 border-2 border-[#dee2e6] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="text-sm font-semibold text-[#1a1a1a]">
                        Teléfono *
                      </Label>
                      <Input 
                        id="telefono" 
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        placeholder="011-4441-0705" 
                        required 
                        className="h-11 border-2 border-[#dee2e6] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="producto" className="text-sm font-semibold text-[#1a1a1a]">
                      ¿Qué te interesa? *
                    </Label>
                    <Select value={formData.producto} onValueChange={handleSelectChange} required>
                      <SelectTrigger className="h-11 border-2 border-[#dee2e6] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hornos">🔥 Hornos industriales</SelectItem>
                        <SelectItem value="amasadoras">⚙️ Amasadoras</SelectItem>
                        <SelectItem value="linea-completa">🏭 Línea completa de producción</SelectItem>
                        <SelectItem value="repuestos">🔧 Repuestos específicos</SelectItem>
                        <SelectItem value="otros">📦 Otros productos</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="producto" value={formData.producto} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje" className="text-sm font-semibold text-[#1a1a1a]">
                      Mensaje *
                    </Label>
                    <Textarea 
                      id="mensaje" 
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      placeholder="Cuéntanos sobre tu proyecto, capacidad de producción necesaria, presupuesto aproximado, etc."
                      className="min-h-[100px] border-2 border-[#dee2e6] focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all resize-none"
                      required 
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <p className="text-red-700">{error}</p>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold text-base py-5 border-0 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Enviando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <Send className="h-5 w-5" />
                        <span>Enviar Formulario</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
         
        </div>

        {/* Success Modal */}
        {isSubmitted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl transform scale-100 animate-in fade-in-0 zoom-in-95">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-[#1a1a1a] mb-4">
                ¡Solicitud Enviada!
              </h3>
              <p className="text-[#495057] text-lg mb-6">
                Tu solicitud ha sido recibida exitosamente. Nos pondremos en contacto contigo pronto.
              </p>
              <div className="bg-gradient-to-r from-[#ff6b35]/10 to-[#ffd23f]/10 p-4 rounded-xl mb-6">
                <p className="text-sm text-[#495057] font-medium">
                  📧 Recibirás confirmación por email
                </p>
              </div>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    nombre: '',
                    empresa: '',
                    email: '',
                    telefono: '',
                    producto: '',
                    mensaje: ''
                  });
                }}
                className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] text-white font-bold py-3 px-8 rounded-xl hover:scale-105 transition-transform duration-300"
              >
                ¡Perfecto!
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}