import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default async function handler(req, res) {
  try {
    console.log('🔍 Debug: Obteniendo productos de Firestore...');
    
    // Leer de Firestore
    const productsRef = collection(db, 'productos');
    const snapshot = await getDocs(productsRef);
    
    const products = [];
    const debugInfo = {
      totalDocs: snapshot.size,
      products: []
    };

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log('📄 Documento:', doc.id, data);
      
      // Buscar productos en las subcategorías
      if (data.nuevo) {
        Object.keys(data.nuevo).forEach(subcategory => {
          if (Array.isArray(data.nuevo[subcategory])) {
            data.nuevo[subcategory].forEach(product => {
              const productInfo = {
                id: product.id || doc.id,
                title: product.title,
                pdfUrl: product.pdfUrl,
                hasPdfUrl: !!product.pdfUrl,
                pdfUrlLength: product.pdfUrl ? product.pdfUrl.length : 0,
                condition: 'nuevo',
                subcategory
              };
              products.push(productInfo);
              debugInfo.products.push(productInfo);
            });
          }
        });
      }
      if (data.usado) {
        Object.keys(data.usado).forEach(subcategory => {
          if (Array.isArray(data.usado[subcategory])) {
            data.usado[subcategory].forEach(product => {
              const productInfo = {
                id: product.id || doc.id,
                title: product.title,
                pdfUrl: product.pdfUrl,
                hasPdfUrl: !!product.pdfUrl,
                pdfUrlLength: product.pdfUrl ? product.pdfUrl.length : 0,
                condition: 'usado',
                subcategory
              };
              products.push(productInfo);
              debugInfo.products.push(productInfo);
            });
          }
        });
      }
    });

    console.log('📊 Debug Info:', debugInfo);

    res.status(200).json({ 
      success: true, 
      debug: debugInfo,
      products: products,
      message: `Encontrados ${products.length} productos`
    });
  } catch (error) {
    console.error('❌ Debug Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error obteniendo productos',
      details: error.message 
    });
  }
}
