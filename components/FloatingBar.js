import React, { useState, useEffect } from 'react';

export function FloatingBar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  return (
    <div 
      style={{
        position: 'fixed',
        top: '50%',
        right: '0px',
        transform: 'translateY(-50%)',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
        right: isMobile ? '0px' : '0px'
      }}
    >
              {/* WhatsApp Button */}
        <button
          onClick={() => window.open('https://wa.me/5411563962947?text=Hola,%20necesito%20información%20sobre%20maquinaria%20industrial', '_blank')}
          style={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            padding: isMobile ? '12px 8px' : '16px 12px',
            border: 'none',
            borderRadius: '18px 0 0 0',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isMobile ? '4px' : '8px',
            minWidth: isMobile ? '60px' : '80px',
            minHeight: isMobile ? '60px' : '80px',
            fontSize: isMobile ? '10px' : '12px',
            transition: 'all 0.3s ease'
          }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = 'none';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = 'none';
        }}
      >
        <svg style={{ boxShadow: 'none' }} width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
        <span style={{ color: 'white', boxShadow: 'none' }}>WhatsApp</span>
      </button>

              {/* Mercado Libre Button */}
        <button
          onClick={() => window.open('https://www.mercadolibre.com.ar', '_blank')}
          style={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            padding: isMobile ? '12px 8px' : '16px 12px',
       
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isMobile ? '4px' : '8px',
            minWidth: isMobile ? '60px' : '80px',
            minHeight: isMobile ? '60px' : '80px',
            fontSize: isMobile ? '10px' : '12px',
            transition: 'all 0.3s ease'
          }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = 'none';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = 'none';
        }}
      >
        <svg style={{ boxShadow: 'none' }} width={isMobile ? "25" : "30"} height={isMobile ? "25" : "30"} viewBox="0 0 48 48" fill="currentColor">
          <ellipse cx="24" cy="24" rx="19.5" ry="12.978" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.7044,15.5305A20.8345,20.8345,0,0,0,16.09,17.3957a22.8207,22.8207,0,0,0,4.546-.7731" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M38.8824,15.6143a8.6157,8.6157,0,0,1-5.1653,1.4849c-3.3351,0-6.2255-2.1987-9.2148-2.1987-2.6681,0-7.189,4.3727-7.189,5.1633s1.3094,1.26,2.3717.7411c.6215-.3036,3.31-2.9151,5.4843-2.9151s9.2186,7.1361,9.8571,7.8066c.9882,1.0376-.9264,3.2733-2.1493,2.05s-3.4092-3.1621-3.4092-3.1621" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M43.4,22.6826a23.9981,23.9981,0,0,0-8.5467,2.6926" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32.5807,27.4555c.9881,1.0376-.9265,3.2733-2.1493,2.05S27.85,26.9933,27.85,26.9933" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M30.1349,29.2147c.9882,1.0376-.9264,3.2733-2.1493,2.05S25.96,29.3032,25.96,29.3032" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24.2015,31.3156A2.309,2.309,0,0,0,27.85,31.13" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24.2015,31.3156c.5306-.6964.49-3.1817-2.2437-2.6876.6423-1.2188.0658-3.1457-2.3881-2.0093A1.69,1.69,0,0,0,16.424,25.96a1.4545,1.4545,0,0,0-2.8-.28c-.5435,1.1035.2964,3.0963,2.0916,1.9763-.1812,1.9435.84,2.5364,2.6845,1.7788.0989,1.91,1.367,1.7457,2.2728,1.3011A1.9376,1.9376,0,0,0,24.2015,31.3156Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.6706,22.2785a18.3081,18.3081,0,0,1,9.0635,3.2144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ color: 'white', boxShadow: 'none', marginTop: '-7px' }}>Mercado Libre</span>
      </button>

                      {/* Email Button */}
        <button
          onClick={() => window.open('mailto:jcpmaquinasparapanaderias@outlook.com.ar?subject=Consulta%20sobre%20maquinaria%20industrial&body=Hola,%20me%20interesa%20obtener%20más%20información%20sobre%20sus%20productos.', '_blank')}
          style={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            padding: isMobile ? '12px 8px' : '16px 12px',
       
            border: 'none',
            borderRadius: '0 0 0px 18px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isMobile ? '4px' : '8px',
            minWidth: isMobile ? '60px' : '80px',
            minHeight: isMobile ? '60px' : '80px',
            fontSize: isMobile ? '10px' : '12px',
            transition: 'all 0.3s ease'
          }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = 'none';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = 'none';
        }}
      >
        <svg style={{ boxShadow: 'none' }} width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
        <span style={{ color: 'white', boxShadow: 'none' }}>Email</span>
      </button>
    </div>
  );
}
