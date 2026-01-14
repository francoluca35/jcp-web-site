import { 
  collection, 
  doc, 
  setDoc, 
  getDocs,
  getDoc,
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
    // Validar que db esté inicializado
    if (!db) {
      console.error('❌ Firestore db no está inicializado');
      return res.status(500).json({ 
        success: false, 
        error: 'Firestore no está inicializado. Verifica la configuración de Firebase.' 
      });
    }
    
    console.log('🔍 Obteniendo categorías desde Firestore...');
    
    // Leer categorías desde un documento separado
    const categoriesDocRef = doc(db, 'categories', 'subcategorias');
    
    try {
      let categories = {
        nuevo: [],
        usado: []
      };
      
      // Intentar obtener el documento directamente
      const categoriesDocSnap = await getDoc(categoriesDocRef);
      
      if (categoriesDocSnap.exists()) {
        const data = categoriesDocSnap.data();
        categories = {
          nuevo: data.nuevo || [],
          usado: data.usado || []
        };
        console.log('✅ Categorías encontradas en documento:', categories);
      } else {
        // Si no existe, obtener categorías únicas de los productos existentes
        console.log('⚠️ Documento de categorías no existe, extrayendo de productos...');
        const productsRef = collection(db, 'productos');
        const productsSnap = await getDocs(productsRef);
        
        const subcategoriesNuevo = new Set();
        const subcategoriesUsado = new Set();
        
        productsSnap.forEach((productDoc) => {
          const productData = productDoc.data();
          if (productData.subcategory) {
            if (productData.condition === 'nuevo') {
              subcategoriesNuevo.add(productData.subcategory);
            } else if (productData.condition === 'usado') {
              subcategoriesUsado.add(productData.subcategory);
            }
          }
        });
        
        categories = {
          nuevo: Array.from(subcategoriesNuevo),
          usado: Array.from(subcategoriesUsado)
        };
        
        console.log('✅ Categorías extraídas de productos:', categories);
      }

      res.status(200).json({ 
        success: true, 
        data: categories 
      });
    } catch (queryError) {
      console.error('❌ Error al consultar Firestore:', queryError);
      throw queryError;
    }
  } catch (error) {
    console.error('❌ API Error obteniendo categorías:', error);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error message:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Error obteniendo categorías',
      details: error.message,
      code: error.code || 'UNKNOWN'
    });
  }
}

// POST - Crear nueva subcategoría
async function handleCreateCategory(req, res) {
  try {
    const { type, subcategory } = req.body;
    
    console.log('📥 Datos recibidos para crear subcategoría:', { type, subcategory });
    
    if (!type || !subcategory) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tipo y subcategoría son requeridos',
        received: { type, subcategory }
      });
    }

    // Validar que db esté inicializado
    if (!db) {
      console.error('❌ Firestore db no está inicializado');
      return res.status(500).json({ 
        success: false, 
        error: 'Firestore no está inicializado. Verifica la configuración de Firebase.' 
      });
    }

    // Obtener o crear el documento de categorías
    const categoriesDocRef = doc(db, 'categories', 'subcategorias');
    
    try {
      // Intentar obtener el documento existente directamente
      const categoriesDocSnap = await getDoc(categoriesDocRef);
      
      let existingCategories = {
        nuevo: [],
        usado: []
      };
      
      if (categoriesDocSnap.exists()) {
        existingCategories = categoriesDocSnap.data();
        console.log('✅ Documento de categorías encontrado:', existingCategories);
      } else {
        console.log('📝 Documento de categorías no existe, se creará uno nuevo');
      }
      
      // Verificar que la subcategoría no exista ya
      const existingSubcategories = existingCategories[type] || [];
      if (existingSubcategories.includes(subcategory)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Esta subcategoría ya existe',
          data: { type, subcategory }
        });
      }
      
      // Agregar la nueva subcategoría
      const updatedCategories = {
        ...existingCategories,
        [type]: [...existingSubcategories, subcategory]
      };
      
      console.log('💾 Guardando categorías actualizadas:', updatedCategories);
      
      // Guardar en Firestore
      await setDoc(categoriesDocRef, updatedCategories, { merge: true });
      
      console.log('✅ Subcategoría creada exitosamente');
      
      res.status(201).json({ 
        success: true, 
        message: 'Subcategoría creada exitosamente',
        data: { type, subcategory, subcategorias: updatedCategories[type] }
      });
    } catch (saveError) {
      console.error('❌ Error al guardar en Firestore:', saveError);
      console.error('❌ Error code:', saveError.code);
      console.error('❌ Error message:', saveError.message);
      
      if (saveError.code === 'permission-denied' || saveError.code === 7) {
        return res.status(403).json({
          success: false,
          error: 'Error de permisos: No tienes permisos para crear categorías',
          code: 'PERMISSION_DENIED',
          details: 'Habilita Firebase Installations API en Google Cloud Console'
        });
      }
      
      throw saveError;
    }
  } catch (error) {
    console.error('❌ API Error creando subcategoría:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({ 
      success: false, 
      error: 'Error creando subcategoría',
      details: error.message,
      code: error.code || 'UNKNOWN'
    });
  }
}

// PUT - Actualizar subcategorías
async function handleUpdateCategory(req, res) {
  try {
    const { type, subcategorias } = req.body;
    
    console.log('📥 Datos recibidos para actualizar subcategorías:', { type, subcategorias });
    
    if (!type || !Array.isArray(subcategorias)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tipo y subcategorías son requeridos',
        received: { type, subcategorias }
      });
    }

    // Validar que db esté inicializado
    if (!db) {
      console.error('❌ Firestore db no está inicializado');
      return res.status(500).json({ 
        success: false, 
        error: 'Firestore no está inicializado. Verifica la configuración de Firebase.' 
      });
    }

    // Obtener o crear el documento de categorías
    const categoriesDocRef = doc(db, 'categories', 'subcategorias');
    
    try {
      // Obtener categorías existentes directamente
      const categoriesDocSnap = await getDoc(categoriesDocRef);
      
      let existingCategories = {
        nuevo: [],
        usado: []
      };
      
      if (categoriesDocSnap.exists()) {
        existingCategories = categoriesDocSnap.data();
      }
      
      // Actualizar solo el tipo especificado
      const updatedCategories = {
        ...existingCategories,
        [type]: subcategorias
      };
      
      console.log('💾 Guardando categorías actualizadas:', updatedCategories);
      
      // Guardar en Firestore
      await setDoc(categoriesDocRef, updatedCategories, { merge: true });

      console.log('✅ Subcategorías actualizadas exitosamente');

      res.status(200).json({ 
        success: true, 
        message: 'Subcategorías actualizadas exitosamente',
        data: { type, subcategorias }
      });
    } catch (updateError) {
      console.error('❌ Error al actualizar en Firestore:', updateError);
      console.error('❌ Error code:', updateError.code);
      console.error('❌ Error message:', updateError.message);
      
      if (updateError.code === 'permission-denied' || updateError.code === 7) {
        return res.status(403).json({
          success: false,
          error: 'Error de permisos: No tienes permisos para actualizar categorías',
          code: 'PERMISSION_DENIED'
        });
      }
      
      throw updateError;
    }
  } catch (error) {
    console.error('❌ API Error actualizando subcategorías:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({ 
      success: false, 
      error: 'Error actualizando subcategorías',
      details: error.message,
      code: error.code || 'UNKNOWN'
    });
  }
}

// DELETE - Eliminar subcategoría
async function handleDeleteCategory(req, res) {
  try {
    const { type, index } = req.query;
    
    console.log('📥 Datos recibidos para eliminar subcategoría:', { type, index });
    
    if (!type || index === undefined) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tipo e índice son requeridos',
        received: { type, index }
      });
    }

    // Validar que db esté inicializado
    if (!db) {
      console.error('❌ Firestore db no está inicializado');
      return res.status(500).json({ 
        success: false, 
        error: 'Firestore no está inicializado. Verifica la configuración de Firebase.' 
      });
    }

    // Obtener categorías existentes
    const categoriesDocRef = doc(db, 'categories', 'subcategorias');
    
    try {
      const categoriesDocSnap = await getDoc(categoriesDocRef);
      
      if (!categoriesDocSnap.exists()) {
        return res.status(404).json({ 
          success: false, 
          error: 'No se encontraron categorías' 
        });
      }
      
      const existingCategories = categoriesDocSnap.data();
      const existingSubcategories = existingCategories[type] || [];
      
      if (parseInt(index) >= existingSubcategories.length || parseInt(index) < 0) {
        return res.status(400).json({ 
          success: false, 
          error: 'Índice de subcategoría inválido' 
        });
      }

      // Eliminar subcategoría por índice
      const updatedSubcategories = existingSubcategories.filter((_, i) => i !== parseInt(index));
      
      const updatedCategories = {
        ...existingCategories,
        [type]: updatedSubcategories
      };
      
      console.log('💾 Guardando categorías actualizadas:', updatedCategories);
      
      // Guardar en Firestore
      await setDoc(categoriesDocRef, updatedCategories, { merge: true });

      console.log('✅ Subcategoría eliminada exitosamente');

      res.status(200).json({ 
        success: true, 
        message: 'Subcategoría eliminada exitosamente',
        data: { type, subcategorias: updatedSubcategories }
      });
    } catch (deleteError) {
      console.error('❌ Error al eliminar en Firestore:', deleteError);
      console.error('❌ Error code:', deleteError.code);
      console.error('❌ Error message:', deleteError.message);
      
      if (deleteError.code === 'permission-denied' || deleteError.code === 7) {
        return res.status(403).json({
          success: false,
          error: 'Error de permisos: No tienes permisos para eliminar categorías',
          code: 'PERMISSION_DENIED'
        });
      }
      
      throw deleteError;
    }
  } catch (error) {
    console.error('❌ API Error eliminando subcategoría:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({ 
      success: false, 
      error: 'Error eliminando subcategoría',
      details: error.message,
      code: error.code || 'UNKNOWN'
    });
  }
}
