import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CheckCircle, Award, Truck, ArrowRight, Zap, Settings } from "lucide-react";

export function HeroSection() {
  return (
    <section id="inicio" className=" -mt-2 relative bg-gradient-to-br from-[#1a1a1a] via-[#495057] to-[#1a1a1a] py-16 lg:py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/10 to-[#ffd23f]/10"></div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-white">
            <div className="inline-flex items-center bg-gradient-to-r from-[#ff6b35]/20 to-[#ffd23f]/20 rounded-full px-4 py-2 mb-6 border border-[#ff6b35]/30">
              <Zap className="h-4 w-4 text-[#ffd23f] mr-2" />
              <span className="text-sm font-semibold text-[#ffd23f] uppercase tracking-wide">Líderes en Tecnología Industrial</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="text-white">MAQUINARIA</span>
              <span className="block bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent">INDUSTRIAL</span>
              <span className="text-white block text-3xl lg:text-4xl font-bold mt-2 text-[#adb5bd]">para Panaderías</span>
            </h1>
            
            <p className="text-xl text-[#adb5bd] mb-10 leading-relaxed max-w-xl">
              Más de 20 años equipando panaderías con la tecnología más avanzada. 
              Soluciones completas, repuestos originales y garantía total.
            </p>

            {/* Industrial Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center space-x-3 bg-[#495057]/20 rounded-lg p-4 border border-[#ff6b35]/20">
                <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-2">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">CALIDAD</div>
                  <div className="text-xs text-[#adb5bd]">Certificada ISO</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-[#495057]/20 rounded-lg p-4 border border-[#ffd23f]/20">
                <div className="bg-gradient-to-r from-[#ffd23f] to-[#ff6b35] rounded-full p-2">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">EXPERIENCIA</div>
                  <div className="text-xs text-[#adb5bd]">20+ Años</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-[#495057]/20 rounded-lg p-4 border border-[#ff6b35]/20">
                <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-2">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">LOGÍSTICA</div>
                  <div className="text-xs text-[#adb5bd]">Nacional 24h</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold px-8 py-4 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 text-lg"
                onClick={() => window.location.href = '/catalog'}
              >
                VER CATÁLOGO
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-gray-700 border-2 border-[#ff6b35] hover:bg-[#ff6b35] hover:text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 text-lg"
                onClick={() => {
                  const message = "Hola, necesito un presupuesto de maquinaria industrial para panadería.";
                  const encodedMessage = encodeURIComponent(message);
                  const whatsappUrl = `https://wa.me/5491163962947?text=${encodedMessage}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                SOLICITAR PRESUPUESTO
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#ff6b35]/30">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1703607888337-aae6d77b3d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwYmFrZXJ5JTIwbWFjaGluZXJ5fGVufDF8fHx8MTc1NjQ5NDEyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Maquinaria industrial de panadería"
                className="w-full h-full object-cover"
                loading="eager"
                priority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent"></div>
            </div>
            
            {/* Industrial Stats */}
            <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-[#1a1a1a] to-[#495057] rounded-2xl shadow-2xl p-6 border-2 border-[#ff6b35]">
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent">500+</div>
                <div className="text-sm font-bold text-white uppercase tracking-wide">Clientes</div>
                <div className="text-xs text-[#adb5bd]">Satisfechos</div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-4 right-4 bg-[#ffd23f] rounded-full p-3 shadow-lg animate-pulse">
              <Settings className="h-6 w-6 text-[#1a1a1a]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}