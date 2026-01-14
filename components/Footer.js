import { Settings, Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import { Button } from "./ui/button.jsx";
import { TikTokIcon } from "./ui/TikTokIcon";

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
                <img 
                  src="/Assets/logojcp2.png" 
                  alt="JCP Maquinarias Logo" 
                  className="h-24 w-24 object-contain mr-4"
                />
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight">MAQUINARIA & REPUESTOS</h3>
                </div>
              </div>
              <p className="text-[#adb5bd] mb-8 max-w-lg leading-relaxed text-lg">
                Líderes en maquinaria industrial para panaderías en Argentina. 
                Amasadoras, hornos rotativos, sobadoras y repuestos originales.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-[#ff6b35]/20">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-2">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-white">011-4441-0705</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-[#ff6b35]/20">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-2">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-white">jcpmaquinasparapanaderias@outlook.com.ar</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-[#ff6b35]/20">
                  <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-2">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-white">San Justo, Buenos Aires</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-black text-xl text-white mb-6 uppercase tracking-wide border-b border-[#ff6b35] pb-2">Equipamiento</h3>
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

            {/* Products */}
            <div>
              <h3 className="font-black text-xl text-white mb-6 uppercase tracking-wide border-b border-[#ffd23f] pb-2">Productos</h3>
              <ul className="space-y-3">
                {[
                  "Amasadoras Industriales",
                  "Hornos Rotativos",
                  "Sobadoras Martino",
                  "Repuestos Originales",
                  "Líneas Completas",
                  "Equipos Personalizados"
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


        {/* Industrial Bottom Footer */}
        <div className="border-t border-[#ff6b35]/30 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[#adb5bd] mb-6 md:mb-0 text-center md:text-left">
              <div className="font-bold text-white text-lg mb-2">© 2025 JCP Maquinarias</div>
              <div className="text-sm">
                Created by <a href="https://www.deamondd.com" target="_blank" rel="noopener noreferrer" className="text-[#ff6b35] hover:text-[#ffd23f] transition-colors font-semibold">@DeamonDD</a> | Registro Industrial: ES-B-12345678 | ISO 9001:2015
              </div>
            </div>
            
            {/* Industrial Social Links */}
            <div className="flex items-center space-x-4 pr-24 md:pr-32">
              <span className="text-[#adb5bd] font-medium uppercase tracking-wide text-sm">Síguenos:</span>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, color: "hover:bg-blue-600", label: "Síguenos en Facebook" },
                  { icon: Instagram, color: "hover:bg-pink-600", label: "Síguenos en Instagram" },
                  { icon: TikTokIcon, color: "hover:bg-black", label: "Síguenos en TikTok" }
                ].map((social, index) => (
                  <Button 
                    key={index}
                    variant="ghost" 
                    size="sm" 
                    aria-label={social.label}
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