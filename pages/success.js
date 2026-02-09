import SEOHead from '../components/SEOHead';
import { seoConfig } from '../seo-config';
import { CheckCircle, ArrowLeft, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir automáticamente después de 10 segundos
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <SEOHead
        title="Mensaje Enviado - JCP Maquinaria Industrial"
        description="Tu mensaje ha sido enviado exitosamente. Te contactaremos pronto."
        canonicalUrl={`${seoConfig.company.url}/success`}
        noindex
        nofollow
      />

      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-[#2d2d2d] rounded-2xl p-8 text-center shadow-2xl border border-[#404040]">
            {/* Icono de éxito */}
            <div className="mb-6">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
            </div>

            {/* Título */}
            <h1 className="text-2xl font-bold text-white mb-4">
              ¡Mensaje Enviado!
            </h1>

            {/* Descripción */}
            <p className="text-[#adb5bd] mb-6 leading-relaxed">
              Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos 
              en las próximas 24 horas.
            </p>

            {/* Información de contacto */}
            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-6">
              <h3 className="text-white font-semibold mb-3">¿Necesitas ayuda inmediata?</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-[#adb5bd]">
                  <Phone className="w-4 h-4" />
                  <span>011-4441-0705</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#adb5bd]">
                  <Mail className="w-4 h-4" />
                  <span>jcpmaquinasparapanaderias@outlook.com.ar</span>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3">
              <Button 
                onClick={() => router.push('/')}
                className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Button>
              
              <p className="text-xs text-[#6c757d]">
                Serás redirigido automáticamente en 10 segundos
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
