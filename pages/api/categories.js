import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc 
} from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { method } = req;

    switch (method) {
      case 'GET':
        await handleGetCategories(req, res);
        break;
      case 'POST':
        await handleCreateCategory(req, res);
        break;
      case 'PUT':
        await handleUpdateCategory(req, res);
        break;
      case 'DELETE':
        await handleDeleteCategory(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
}

// GET - Obtener todas las categorías
async function handleGetCategories(req, res) {
  try {
    
    // Leer de Firestore
    const categoriesRef = collection(db, 'productos');
    const snapshot = await getDocs(categoriesRef);
    
    let categories = {
      nuevo: [],
      usado: []
    };

    if (!snapshot.empty) {
      // Si hay documentos, leer las categorías
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.nuevo) {
          categories.nuevo = Object.keys(data.nuevo);
        }
        if (data.usado) {
          categories.usado = Object.keys(data.usado);
        }
      });
    }

    res.status(200).json({ 
      success: true, 
      data: categories 
    });
  } catch (error) {
    console.error('❌ API Error obteniendo categorías:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error obteniendo categorías',
      details: error.message 
    });
  }
}

// POST - Crear nueva subcategoría
async function handleCreateCategory(req, res) {
  try {
    const { type, subcategory } = req.body;
    
    if (!type || !subcategory) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tipo y subcategoría son requeridos' 
      });
    }

    
    // Crear o actualizar en Firestore
    const categoriesRef = collection(db, 'productos');
    const snapshot = await getDocs(categoriesRef);
    
    let docId = 'categories';
    let existingData = {};
    
    if (!snapshot.empty) {
      // Usar el primer documento existente
      const firstDoc = snapshot.docs[0];
      docId = firstDoc.id;
      existingData = firstDoc.data();
    }
    
    // Actualizar las categorías
    const updatedData = {
      ...existingData,
      [type]: {
        ...existingData[type],
        [subcategory]: 0 // Inicializar con 0 productos
      }
    };
    
    // Guardar en Firestore
    const docRef = doc(db, 'productos', docId);
    await setDoc(docRef, updatedData, { merge: true });
    
    res.status(201).json({ 
      success: true, 
      message: 'Subcategoría creada exitosamente',
      data: { type, subcategory }
    });
  } catch (error) {
    console.error('❌ API Error creando subcategoría:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error creando subcategoría',
      details: error.message 
    });
  }
}

// PUT - Actualizar subcategorías
async function handleUpdateCategory(req, res) {
  try {
    const { type, subcategorias } = req.body;
    
    if (!type || !Array.isArray(subcategorias)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tipo y subcategorías son requeridos' 
      });
    }

    
    const docRef = doc(db, 'productos', type);
    await setDoc(docRef, {
      tipo: type,
      subcategorias: subcategorias,
      updatedAt: new Date().toISOString()
    });

    res.status(200).json({ 
      success: true, 
      message: 'Subcategorías actualizadas exitosamente',
      data: { type, subcategorias }
    });
  } catch (error) {
    console.error('❌ API Error actualizando subcategorías:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error actualizando subcategorías',
      details: error.message 
    });
  }
}

// DELETE - Eliminar subcategoría
async function handleDeleteCategory(req, res) {
  try {
    const { type, index } = req.query;
    
    if (!type || index === undefined) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tipo e índice son requeridos' 
      });
    }

    
    // Obtener categorías existentes
    const categoriesRef = collection(db, 'productos');
    const querySnapshot = await getDocs(categoriesRef);
    
    let existingSubcategories = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.tipo === type) {
        existingSubcategories = data.subcategorias || [];
      }
    });

    // Eliminar subcategoría por índice
    const updatedSubcategories = existingSubcategories.filter((_, i) => i !== parseInt(index));
    
    // Guardar en Firestore
    const docRef = doc(db, 'productos', type);
    await setDoc(docRef, {
      tipo: type,
      subcategorias: updatedSubcategories,
      updatedAt: new Date().toISOString()
    });

    res.status(200).json({ 
      success: true, 
      message: 'Subcategoría eliminada exitosamente',
      data: { type, subcategorias: updatedSubcategories }
    });
  } catch (error) {
    console.error('❌ API Error eliminando subcategoría:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error eliminando subcategoría',
      details: error.message 
    });
  }
}
