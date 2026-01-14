import { db } from '../../lib/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

export default async function handler(req, res) {
  try {
    console.log('🧪 Test Firestore: Iniciando prueba...');
    
    // Verificar que db esté inicializado
    if (!db) {
      console.error('❌ Test Firestore: db es null');
      return res.status(500).json({
        success: false,
        error: 'Firestore db es null',
        details: 'Firebase no está inicializado correctamente'
      });
    }
    
    console.log('✅ Test Firestore: db está inicializado');
    
    // Intentar leer la colección productos
    try {
      console.log('🔍 Test Firestore: Intentando leer colección "productos"...');
      const productosRef = collection(db, 'productos');
      const snapshot = await getDocs(productosRef);
      
      console.log(`📊 Test Firestore: Documentos encontrados: ${snapshot.size}`);
      
      const documentos = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        documentos.push({
          id: doc.id,
          keys: Object.keys(data),
          hasNuevo: !!data.nuevo,
          hasUsado: !!data.usado,
          nuevoKeys: data.nuevo ? Object.keys(data.nuevo) : [],
          usadoKeys: data.usado ? Object.keys(data.usado) : []
        });
      });
      
      console.log('✅ Test Firestore: Lectura exitosa');
      
      return res.status(200).json({
        success: true,
        message: 'Firestore está funcionando correctamente',
        canRead: true,
        documentCount: snapshot.size,
        documentos: documentos
      });
    } catch (readError) {
      console.error('❌ Test Firestore: Error al leer:', readError);
      return res.status(500).json({
        success: false,
        error: 'Error al leer Firestore',
        details: readError.message,
        code: readError.code,
        canRead: false
      });
    }
    
  } catch (error) {
    console.error('❌ Test Firestore: Error general:', error);
    return res.status(500).json({
      success: false,
      error: 'Error en test de Firestore',
      details: error.message,
      code: error.code
    });
  }
}
