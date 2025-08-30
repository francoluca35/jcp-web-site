import { Settings, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1a1a1a] to-black text-white relative overflow-hidden">
      {/* Industrial Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/10 to-[#ffd23f]/10"></div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-2xl p-4 mr-4">
                  <Settings className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight">PanIndustrial</h3>
                  <p className="text-[#adb5bd] font-bold uppercase tracking-wide text-sm">MAQUINARIA & REPUESTOS</p>
                </div>
              </div>
              <p className="text-[#adb5bd] mb-8 max-w-lg leading-relaxed text-lg">
                Pioneros en tecnología industrial para panaderías. Más de dos décadas 
                desarrollando soluciones completas con la ingeniería europea más avanzada.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-[#ff6b35]/20">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-2">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-white">+34 900 123 456</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-[#ff6b35]/20">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-2">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-white">info@panindustrial.es</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-[#ff6b35]/20">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-2">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-white">Madrid, España</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-black text-xl text-white mb-6 uppercase tracking-wide border-b border-[#ff6b35] pb-2">Equipamiento</h4>
              <ul className="space-y-3">
                {[
                  "Hornos Industriales",
                  "Amasadoras Profesionales", 
                  "Líneas Automatizadas",
                  "Fermentadoras Controladas",
                  "Divisoras de Precisión",
                  "Repuestos Originales"
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="flex items-center space-x-2 text-[#adb5bd] hover:text-[#ff6b35] transition-colors duration-300 group">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full group-hover:scale-125 transition-transform"></div>
                      <span className="font-medium">{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-black text-xl text-white mb-6 uppercase tracking-wide border-b border-[#ffd23f] pb-2">Servicios</h4>
              <ul className="space-y-3">
                {[
                  "Instalación Llave en Mano",
                  "Mantenimiento Predictivo",
                  "Reparaciones Urgentes",
                  "Formación Técnica",
                  "Consultoría Industrial",
                  "Financiación Flexible"
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="flex items-center space-x-2 text-[#adb5bd] hover:text-[#ffd23f] transition-colors duration-300 group">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#ffd23f] to-[#ff6b35] rounded-full group-hover:scale-125 transition-transform"></div>
                      <span className="font-medium">{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Industrial Newsletter */}
        <div className="border-t border-[#ff6b35]/30 py-12 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-black text-2xl text-white mb-4 uppercase tracking-wide">
                BOLETÍN INDUSTRIAL
              </h4>
              <p className="text-[#adb5bd] font-medium text-lg leading-relaxed">
                Recibe actualizaciones técnicas, lanzamientos de productos y ofertas 
                exclusivas para profesionales del sector.
              </p>
            </div>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="tu.email@empresa.com"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-[#ff6b35]/30 text-white placeholder-[#adb5bd] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent backdrop-blur-sm font-medium"
              />
              <Button className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white px-8 py-4 font-bold border-0 shadow-lg hover:scale-105 transition-all duration-300">
                SUSCRIBIRSE
              </Button>
            </div>
          </div>
        </div>

        {/* Industrial Bottom Footer */}
        <div className="border-t border-[#ff6b35]/30 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#adb5bd] mb-6 md:mb-0 text-center md:text-left">
              <div className="font-bold text-white text-lg mb-2">© 2025 PanIndustrial S.L.</div>
              <div className="text-sm">
                Todos los derechos reservados | Registro Industrial: ES-B-12345678 | ISO 9001:2015
              </div>
            </div>
            
            {/* Industrial Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-[#adb5bd] font-medium uppercase tracking-wide text-sm">Síguenos:</span>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, color: "hover:bg-blue-600" },
                  { icon: Instagram, color: "hover:bg-pink-600" },
                  { icon: Linkedin, color: "hover:bg-blue-700" }
                ].map((social, index) => (
                  <Button 
                    key={index}
                    variant="ghost" 
                    size="sm" 
                    className={`p-3 text-[#adb5bd] hover:text-white border border-[#495057] hover:border-transparent rounded-full transition-all duration-300 hover:scale-110 ${social.color}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}