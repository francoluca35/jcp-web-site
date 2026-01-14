import React, { useEffect, useState } from 'react';
import { Button } from "./ui/button";
import { X, MessageCircle, HelpCircle } from "lucide-react";

export function FloatingBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Inyectar los estilos de animación en el head solo si no existen
    if (!document.getElementById('whatsapp-float-styles')) {
      const style = document.createElement('style');
      style.id = 'whatsapp-float-styles';
      style.textContent = `
        @keyframes whatsappFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1);
          }
        }
        .whatsapp-float-button {
          animation: whatsappFloat 3s ease-in-out infinite;
        }
        .whatsapp-float-button:hover {
          animation-play-state: paused;
          transform: translateY(-10px) scale(1.1) !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Cerrar modal con Escape
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePresupuesto = () => {
    const message = "Hola me gustaria solicitar presupuesto para...";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5491163962947?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    closeModal();
  };

  const handleConsulta = () => {
    const message = "Hola me gustaria hacer una consulta sobre...";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5491163962947?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="whatsapp-float-button"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#25D366',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 999999,
          transition: 'box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        }}
        aria-label="Contactar por WhatsApp"
        title="Contactar por WhatsApp"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </button>

      {/* Modal de opciones de WhatsApp */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000000] p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                ¿En qué te podemos ayudar?
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={closeModal} 
                aria-label="Cerrar modal"
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600 text-sm mb-6">
                Selecciona la opción que mejor se adapte a tu necesidad:
              </p>
              
              <Button 
                onClick={handlePresupuesto} 
                className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-3 shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <MessageCircle className="h-6 w-6" />
                <span className="text-lg">Solicitar Presupuesto</span>
              </Button>
              
              <Button 
                onClick={handleConsulta} 
                className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0f7a6e] text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-3 shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <HelpCircle className="h-6 w-6" />
                <span className="text-lg">Hacer una Consulta</span>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={closeModal} 
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 mt-4"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
