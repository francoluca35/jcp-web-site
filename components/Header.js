import { Button } from "./ui/button";
import { Settings, Phone, Mail, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="bg-[#1a1a1a] text-white shadow-2xl border-b border-[#ff6b35]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-[#ff6b35] to-[#ffd23f] p-3 rounded-lg mr-4">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">PanIndustrial</h1>
              <p className="text-sm text-[#adb5bd] font-medium tracking-wide">MAQUINARIA & REPUESTOS</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-white hover:text-[#ff6b35] transition-colors font-medium uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#ff6b35] pb-1">
              Inicio
            </a>
            <a href="#maquinas" className="text-white hover:text-[#ff6b35] transition-colors font-medium uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#ff6b35] pb-1">
              Máquinas
            </a>
            <a href="#repuestos" className="text-white hover:text-[#ff6b35] transition-colors font-medium uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#ff6b35] pb-1">
              Repuestos
            </a>
            <a href="#servicios" className="text-white hover:text-[#ff6b35] transition-colors font-medium uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#ff6b35] pb-1">
              Servicios
            </a>
            <a href="#contacto" className="text-white hover:text-[#ff6b35] transition-colors font-medium uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#ff6b35] pb-1">
              Contacto
            </a>
          </nav>

          {/* Contact Info */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-sm text-[#adb5bd]">
              <Phone className="h-4 w-4 text-[#ffd23f]" />
              <span className="font-medium">+34 900 123 456</span>
            </div>
            <Button className="hidden sm:inline-flex bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0">
              Solicitar Cotización
            </Button>
            <Button variant="ghost" className="md:hidden text-white hover:bg-[#ff6b35]/20">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}