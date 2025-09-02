import { Button } from "./ui/button";
import { X, MessageCircle, ShoppingCart } from "lucide-react";

export function ContactModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  // Verificar que product tenga las propiedades necesarias
  const productName = product?.name || 'Producto';
  const productCategory = product?.category || 'producto';
  const productId = product?.id || 'N/A';

  const handleWhatsApp = () => {
    try {
      const message = `Hola, quería saber sobre un presupuesto o el precio de esta ${productCategory.toLowerCase()}: ${productName} (Código: ${productId})`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5491163962947?text=${encodedMessage}`;
      
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank');
      }
      onClose();
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      onClose();
    }
  };

  const handleMercadoLibre = () => {
    try {
      if (product?.mercadoLibreUrl && typeof window !== 'undefined') {
        window.open(product.mercadoLibreUrl, '_blank');
        onClose();
      }
    } catch (error) {
      console.error('Error opening MercadoLibre:', error);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Contactar sobre {productName}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Elige cómo quieres contactarnos para obtener más información sobre este producto.
          </p>

          {/* WhatsApp Option */}
          <Button
            onClick={handleWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Contactar por WhatsApp</span>
          </Button>

          {/* MercadoLibre Option */}
          {product?.mercadoLibreUrl && (
            <Button
              onClick={handleMercadoLibre}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Ver en MercadoLibre</span>
            </Button>
          )}

          {/* Cancel Button */}
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
