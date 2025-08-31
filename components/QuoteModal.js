import { Button } from "./ui/button";
import { X, MessageCircle, Mail } from "lucide-react";

export function QuoteModal({ isOpen, onClose, product }) {
  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const message = `Hola queria saber sobre el producto "${product.name}", que valor tiene y medios de pago.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5491163962947?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleEmail = () => {
    const subject = "Presupuesto maquinaria";
    const message = `Hola JCP, queria saber el presupuesto de la maquina "${product.name}" que precios metodos de pago y demora tienen con la entrega del mismo.

Cordiales saludos`;
    
    const mailtoUrl = `mailto:info@jcp.com.ar?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(mailtoUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Cotizar {product.name}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Elige cómo quieres contactarnos para solicitar el presupuesto de este producto.
          </p>
          
          <Button 
            onClick={handleWhatsApp} 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Contactar por WhatsApp</span>
          </Button>
          
          <Button 
            onClick={handleEmail} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <Mail className="h-5 w-5" />
            <span>Enviar por Email</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
