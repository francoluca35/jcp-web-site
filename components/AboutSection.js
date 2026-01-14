import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Users, 
  Award, 
  Clock, 
  CheckCircle, 
  Zap,
  Shield,
  Building,
  Target,
  StarHalf,
  Star,
 
} from "lucide-react";

export function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Aquí pones las rutas de tus 3 imágenes
  const images = [
   
    "/Assets/about2.jpeg",
    "/Assets/about3.png",
    "/Assets/maquina3.jpeg"
   
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5000ms = 5 segundos

    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <section id="nosotros" className="pt-16 lg:pt-20 pb-12 bg-gradient-to-b from-white to-[#f8f9fa] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b35] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ffd23f] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-[#ff6b35]/10 to-[#ffd23f]/10 rounded-full px-6 py-3 mb-6 border border-[#ff6b35]/20">
            <Building className="h-5 w-5 text-[#ff6b35] mr-2" />
            <span className="text-[#1a1a1a] font-bold uppercase tracking-wide">Sobre Nosotros</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-6">
            NUESTRA
            <span className="block bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent">HISTORIA</span>
          </h2>
          <p className="text-xl text-[#495057] max-w-4xl mx-auto leading-relaxed">
            Somos una empresa familiar dedicada a la fabricación de maquinarias nuevas para panaderías, como amasadoras rápidas, sobadoras y trinchadoras, y a la fabricación de repuestos de otras marcas y modelos, con experiencia real de taller. Nuestra trayectoria se construyó dentro del rubro fabricando equipos propios, modernos y repuestos. Realizando reparaciones y reacondicionamiento de máquinas para panaderías, resolviendo problemas concretos del trabajo diario.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Mission Statement */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#495057] rounded-2xl p-8 text-white shadow-2xl border-2 border-[#ff6b35]/20">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-full p-3 mr-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-black">NUESTRA MISIÓN</h3>
              </div>
              <p className="text-lg text-[#adb5bd] leading-relaxed">
                Ser el socio estratégico de confianza para panaderías y pastelerías, 
                proporcionando soluciones tecnológicas innovadoras que impulsen su crecimiento 
                y rentabilidad en un mercado cada vez más competitivo. Nos comprometemos a 
                ofrecer asesoramiento especializado y repuestos originales de excelencia.
              </p>
            </div>

            {/* Vision Statement */}
            <div className="bg-gradient-to-br from-white to-[#f8f9fa] rounded-2xl p-8 shadow-xl border-2 border-[#ffd23f]/20">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-[#ffd23f] to-[#ff6b35] rounded-full p-3 mr-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-[#1a1a1a]">NUESTRA VISIÓN</h3>
              </div>
              <p className="text-lg text-[#495057] leading-relaxed">
                Liderar la revolución tecnológica en la industria panadera, siendo reconocidos 
                como la empresa más innovadora y confiable en maquinaria industrial para panaderías 
                en toda Latinoamérica. Nuestra visión es expandir nuestra presencia internacional 
                manteniendo los más altos estándares de calidad y excelencia.
              </p>
            </div>

                         {/* Values */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {[
                 { icon: Shield, title: "CALIDAD", desc: "Estándares internacionales", color: "from-[#ff6b35] to-[#ffd23f]" },
                 { icon: Clock, title: "PUNTUALIDAD", desc: "Entregas a tiempo", color: "from-[#ffd23f] to-[#ff6b35]" },
                 { icon: Users, title: "ATENCIÓN", desc: "Asesoramiento personalizado", color: "from-[#ff6b35] to-[#ffd23f]" },
                 { icon:  Star, title: "INNOVACIÓN", desc: "Tecnología de vanguardia", color: "from-[#ffd23f] to-[#ff6b35]" }
               ].map((value, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-xl">
                  <div className={`bg-gradient-to-r ${value.color} rounded-full p-3 w-fit mb-4`}>
                    <value.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-black text-[#1a1a1a] mb-2">{value.title}</h3>
                  <p className="text-sm text-[#495057] font-medium">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image and Stats */}
          <div className="space-y-8">
            {/* Main Image */}
       <div className="relative">
      {/* Contenedor Principal de Imágenes */}
      <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#ff6b35]/30 relative">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <ImageWithFallback
              src={src}
              alt={`Equipo de JCP Maquinarias trabajando ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Gradiente superpuesto (siempre arriba de las imágenes) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent pointer-events-none"></div>
      </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-[#1a1a1a] to-[#495057] rounded-2xl shadow-2xl p-6 border-2 border-[#ffd23f]">
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-[#ffd23f] to-[#ff6b35] bg-clip-text text-transparent">1000+</div>
                  <div className="text-sm font-bold text-white uppercase tracking-wide">Productos</div>
                  <div className="text-xs text-[#adb5bd]">vendidos</div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-[#ff6b35] rounded-full p-3 shadow-lg">
               
              </div>
            </div>

            {/* Company Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "89+", label: "Años de Experiencia", icon: Clock },
                { value: "500+", label: "Clientes Satisfechos", icon: Users },
                { value: "24/7", label: "Soporte Técnico", icon: Shield },
                { value: "100%", label: "Garantía", icon: CheckCircle }
              ].map((stat, index) => (
                <Card key={index} className="text-center p-4 bg-gradient-to-br from-white to-[#f8f9fa] border-2 border-[#dee2e6] hover:border-[#ff6b35]/30 transition-all duration-300">
                  <div className="mx-auto mb-3 p-2 rounded-full bg-gradient-to-r from-[#ff6b35]/10 to-[#ffd23f]/10">
                    <stat.icon className="h-5 w-5 text-[#ff6b35]" />
                  </div>
                  <div className="text-2xl font-black text-[#1a1a1a] mb-1">{stat.value}</div>
                  <div className="text-xs font-bold text-[#495057] uppercase tracking-wide">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Certificaciones y Logros */}
        {/* <div className="bg-gradient-to-r from-[#1a1a1a] to-[#495057] rounded-3xl p-8 lg:p-12 mb-16 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-black mb-4">
              CERTIFICACIONES Y <span className="text-[#ffd23f]">LOGROS</span>
            </h3>
            <p className="text-lg text-[#adb5bd] max-w-3xl mx-auto">
              Nuestro compromiso con la excelencia se refleja en las certificaciones internacionales 
              y reconocimientos que avalan nuestra calidad y confiabilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "ISO 9001:2015",
                description: "Sistema de Gestión de Calidad",
                icon: Award,
                color: "from-[#ff6b35] to-[#ffd23f]"
              },
              {
                title: "Certificación CE",
                description: "Cumplimiento Normativas Europeas",
                icon: Shield,
                color: "from-[#ffd23f] to-[#ff6b35]"
              },
              {
                title: "89+ Años",
                description: "Experiencia en el Mercado",
                icon: Clock,
                color: "from-[#ff6b35] to-[#ffd23f]"
              },
              {
                title: "500+ Clientes",
                description: "Satisfechos en Argentina",
                icon: Users,
                color: "from-[#ffd23f] to-[#ff6b35]"
              }
            ].map((achievement, index) => (
              <div key={index} className="text-center">
                <div className={`bg-gradient-to-r ${achievement.color} rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center`}>
                  <achievement.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                <p className="text-sm text-[#adb5bd]">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div> */}

      </div>
    </section>
  );
}
