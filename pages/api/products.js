import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  getDoc,
  deleteDoc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  where
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
        await handleGetProducts(req, res);
        break;
      case 'POST':
        await handleCreateProduct(req, res);
        break;
      case 'PUT':
        await handleUpdateProduct(req, res);
        break;
      case 'DELETE':
        await handleDeleteProduct(req, res);
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

// GET - Obtener todos los productos
async function handleGetProducts(req, res) {
  try {
    // Validar que db esté inicializado
    if (!db) {
      console.error('❌ Firestore db no está inicializado');
      return res.status(500).json({ 
        success: false, 
        error: 'Firestore no está inicializado. Verifica la configuración de Firebase.' 
      });
    }
    
    console.log('🔍 GET: Iniciando lectura de productos desde Firestore...');
    
    // Leer de Firestore - cada producto es un documento separado
    const productsRef = collection(db, 'productos');
    let snapshot;
    
    try {
      snapshot = await getDocs(productsRef);
      console.log(`📊 GET: Documentos encontrados: ${snapshot.size}`);
    } catch (queryError) {
      console.error('❌ GET: Error al consultar Firestore:', queryError);
      console.error('❌ GET: Error code:', queryError.code);
      console.error('❌ GET: Error message:', queryError.message);
      
      if (queryError.code === 'permission-denied' || queryError.message.includes('PERMISSION_DENIED')) {
        return res.status(403).json({ 
          success: false, 
          error: 'Error de permisos: Las reglas de Firestore no permiten leer. Verifica que las reglas estén desplegadas.',
          code: 'PERMISSION_DENIED',
          details: queryError.message
        });
      }
      
      throw queryError;
    }
    
    const products = [];

    // Cada documento ES un producto
    snapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      
      // Solo procesar si tiene los campos básicos de producto (no documentos antiguos con estructura nuevo/usado)
      if (data.title && data.condition && data.subcategory) {
        products.push({
          id: docSnapshot.id, // Usar el ID del documento como ID del producto
          ...data
        });
      } else {
        console.log(`⚠️ GET: Documento ${docSnapshot.id} no tiene estructura de producto válida`);
      }
    });

    console.log(`✅ GET: Obtenidos ${products.length} productos desde Firestore`);

    res.status(200).json({ 
      success: true, 
      data: products 
    });
  } catch (error) {
    console.error('❌ API Error obteniendo productos:', error);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error message:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Error obteniendo productos',
      details: error.message,
      code: error.code || 'UNKNOWN'
    });
  }
}

// POST - Crear nuevo producto
async function handleCreateProduct(req, res) {
  try {
    const { 
      title, 
      description, 
      characteristics, 
      price, 
      condition, 
      subcategory, 
      images,
      pdfUrl,
      mainImageIndex,
      rating
    } = req.body;
    
    console.log('📥 Datos recibidos en API:', {
      title,
      description: description?.substring(0, 50) + '...',
      characteristics: characteristics?.substring(0, 50) + '...',
      price,
      condition,
      subcategory,
      imagesCount: Array.isArray(images) ? images.length : 0,
      hasPdf: !!pdfUrl,
      mainImageIndex: mainImageIndex || 0,
      rating
    });
    
    // Validar que db esté inicializado
    if (!db) {
      console.error('❌ Firestore db no está inicializado');
      throw new Error('Firestore no está inicializado. Verifica la configuración de Firebase.');
    }
    
    // Validar campos requeridos
    if (!title || !description || !characteristics || !price || !condition || !subcategory) {
      console.error('❌ Campos faltantes:', {
        title: !!title,
        description: !!description,
        characteristics: !!characteristics,
        price: !!price,
        condition: !!condition,
        subcategory: !!subcategory
      });
      return res.status(400).json({ 
        success: false, 
        error: 'Todos los campos son requeridos',
        received: { title, description, characteristics, price, condition, subcategory }
      });
    }

    // Verificar conexión a Firestore
    if (!db) {
      console.error('❌ CRÍTICO: Firestore db es null');
      console.error('❌ Esto significa que Firebase no se inicializó correctamente');
      console.error('❌ Posibles causas: 1) Error 403 PERMISSION_DENIED, 2) Variables de entorno incorrectas, 3) Proyecto Firebase incorrecto');
      return res.status(500).json({
        success: false,
        error: 'Firestore no está inicializado',
        details: 'Verifica la configuración de Firebase y que las APIs estén habilitadas. Ve a SOLUCION_403.md para más ayuda.',
        solution: 'Habilita Firebase Installations API en Google Cloud Console'
      });
    }
    
    console.log('✅ Firestore db está inicializado correctamente');
    
    // Preparar datos del producto (SIN incluir id, Firestore lo generará)
    const productData = {
      title,
      description,
      characteristics,
      price: parseFloat(price) || 0,
      condition,
      subcategory,
      images: Array.isArray(images) ? images : (images ? [images] : []), // Asegurar que sea array
      pdfUrl: pdfUrl || '',
      mainImageIndex: parseInt(mainImageIndex) || 0,
      ...(Number.isFinite(parseFloat(rating)) ? { rating: parseFloat(rating) } : {}),
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log('💾 Preparando producto para guardar:', {
      title: productData.title,
      condition: productData.condition,
      subcategory: productData.subcategory,
      imagesCount: productData.images.length,
      price: productData.price,
      hasDescription: !!productData.description,
      hasCharacteristics: !!productData.characteristics,
      hasPdf: !!productData.pdfUrl,
      imageUrls: productData.images.slice(0, 3).map(img => typeof img === 'string' ? img.substring(0, 50) : 'object')
    });
    
    // Guardar en Firestore - cada producto es un documento individual
    const productsRef = collection(db, 'productos');
    
    console.log('💾 Intentando crear documento individual para el producto...');
    
    try {
      // Usar addDoc para crear un nuevo documento con ID automático
      const docRef = await addDoc(productsRef, productData);
      
      console.log('✅ Producto guardado exitosamente en Firestore');
      console.log(`✅ Documento creado con ID: ${docRef.id}`);
      
      // Agregar el ID generado por Firestore al objeto de respuesta
      const productWithId = {
        id: docRef.id,
        ...productData
      };
      
      // Verificar inmediatamente que se guardó correctamente
      try {
        console.log('🔍 Verificando que el producto se guardó...');
        const verifyDocSnap = await getDoc(docRef);
        
        if (verifyDocSnap.exists()) {
          const savedData = verifyDocSnap.data();
          console.log(`✅ Verificación exitosa: Producto "${savedData.title}" encontrado en base de datos`);
          console.log(`📋 Campos guardados:`, Object.keys(savedData));
          console.log(`📸 Imágenes guardadas: ${savedData.images?.length || 0}`);
          console.log(`📎 PDF URL: ${savedData.pdfUrl ? 'Sí' : 'No'}`);
          console.log(`🔗 URLs de imágenes:`, savedData.images?.slice(0, 3).map(img => typeof img === 'string' ? img.substring(0, 50) + '...' : 'object'));
        } else {
          console.warn(`⚠️ Producto no encontrado en verificación`);
        }
      } catch (verifyError) {
        console.warn('⚠️ No se pudo verificar el guardado:', verifyError.message);
      }
      
      console.log('✅ Producto guardado correctamente, enviando respuesta al cliente...');
      
      res.status(201).json({ 
        success: true, 
        message: 'Producto creado exitosamente',
        data: productWithId
      });
      
    } catch (saveError) {
      console.error('❌ ERROR CRÍTICO al guardar en Firestore:', saveError);
      console.error('❌ Error code:', saveError.code);
      console.error('❌ Error message:', saveError.message);
      console.error('❌ Error name:', saveError.name);
      console.error('❌ Error stack:', saveError.stack);
      
      // Errores específicos con mensajes claros y respuestas HTTP apropiadas
      if (saveError.code === 'permission-denied' || saveError.code === 7 || saveError.message.includes('PERMISSION_DENIED')) {
        const errorMsg = 'Error 403 PERMISSION_DENIED: Las reglas de Firestore o las APIs no permiten escribir.';
        console.error('❌', errorMsg);
        return res.status(403).json({
          success: false,
          error: errorMsg,
          details: 'SOLUCIÓN: 1) Habilita Firebase Installations API en Google Cloud Console (VER SOLUCION_403.md), 2) Despliega las reglas de Firestore desde firestore.rules',
          code: 'PERMISSION_DENIED',
          solution: 'https://console.cloud.google.com/apis/library/firebaseinstallations.googleapis.com'
        });
      }
      
      if (saveError.code === 'unavailable' || saveError.code === 14 || saveError.message.includes('unavailable')) {
        return res.status(503).json({
          success: false,
          error: 'Firestore no está disponible',
          details: 'Verifica tu conexión a internet y que las APIs estén habilitadas.',
          code: 'UNAVAILABLE'
        });
      }
      
      if (saveError.code === 'unauthenticated' || saveError.code === 16) {
        return res.status(401).json({
          success: false,
          error: 'No autenticado',
          details: 'Verifica las credenciales de Firebase.',
          code: 'UNAUTHENTICATED'
        });
      }
      
      // Error genérico con toda la información
      return res.status(500).json({
        success: false,
        error: 'Error guardando en Firestore',
        details: saveError.message,
        code: saveError.code || 'UNKNOWN',
        stack: process.env.NODE_ENV === 'development' ? saveError.stack : undefined
      });
    }
  } catch (error) {
    console.error('❌ API Error creando producto (catch general):', error);
    console.error('❌ Stack trace:', error.stack);
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    
    // Si la respuesta ya fue enviada, no intentar enviarla de nuevo
    if (!res.headersSent) {
      res.status(500).json({ 
        success: false, 
        error: 'Error creando producto',
        details: error.message,
        code: error.code || 'UNKNOWN',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
}

// PUT - Actualizar producto
async function handleUpdateProduct(req, res) {
  try {
    const { id } = req.query;
    const updateData = req.body;
    
    console.log('📥 Datos recibidos para actualizar:', {
      id,
      updateDataKeys: Object.keys(updateData)
    });
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        error: 'ID del producto es requerido',
        received: { id }
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

    console.log(`🔍 Buscando producto con ID: ${id}`);
    
    // Buscar el documento del producto directamente
    const productDocRef = doc(db, 'productos', id);
    
    try {
      // Intentar obtener el documento directamente
      const productDocSnap = await getDoc(productDocRef);
      
      if (!productDocSnap.exists()) {
        console.error(`❌ Producto con ID ${id} no encontrado`);
        return res.status(404).json({ 
          success: false, 
          error: 'Producto no encontrado',
          searchedId: id
        });
      }
      
      const existingData = productDocSnap.data();
      console.log(`✅ Producto encontrado: "${existingData.title}"`);
      
      // Preparar datos de actualización (solo campos permitidos)
      const updateFields = {};
      
      // Solo actualizar campos que vengan en updateData
      if (updateData.title !== undefined) updateFields.title = updateData.title;
      if (updateData.description !== undefined) updateFields.description = updateData.description;
      if (updateData.characteristics !== undefined) updateFields.characteristics = updateData.characteristics;
      if (updateData.price !== undefined) updateFields.price = parseFloat(updateData.price) || 0;
      if (updateData.condition !== undefined) updateFields.condition = updateData.condition;
      if (updateData.subcategory !== undefined) updateFields.subcategory = updateData.subcategory;
      if (updateData.images !== undefined) updateFields.images = Array.isArray(updateData.images) ? updateData.images : (updateData.images ? [updateData.images] : []);
      if (updateData.pdfUrl !== undefined) updateFields.pdfUrl = updateData.pdfUrl || '';
      if (updateData.mainImageIndex !== undefined) updateFields.mainImageIndex = parseInt(updateData.mainImageIndex) || 0;
      if (updateData.rating !== undefined) {
        const parsedRating = parseFloat(updateData.rating);
        updateFields.rating = Number.isNaN(parsedRating) ? null : parsedRating;
      }
      if (updateData.status !== undefined) updateFields.status = updateData.status;
      
      // Siempre actualizar updatedAt
      updateFields.updatedAt = new Date().toISOString();
      
      console.log(`💾 Actualizando producto en: productos/${id}`);
      console.log(`📋 Campos a actualizar:`, Object.keys(updateFields));
      
      // Actualizar el documento (solo los campos especificados)
      await updateDoc(productDocRef, updateFields);
      
      // Obtener el documento actualizado para respuesta
      const updatedDocSnap = await getDoc(productDocRef);
      const updatedProduct = {
        id: updatedDocSnap.id,
        ...updatedDocSnap.data()
      };
      
      console.log('✅ Producto actualizado exitosamente en Firestore');

      res.status(200).json({ 
        success: true, 
        message: 'Producto actualizado exitosamente',
        data: updatedProduct
      });
      
    } catch (firestoreError) {
      console.error('❌ Error al actualizar en Firestore:', firestoreError);
      
      if (firestoreError.code === 'not-found' || firestoreError.code === 5) {
        return res.status(404).json({ 
          success: false, 
          error: 'Producto no encontrado',
          searchedId: id
        });
      }
      
      if (firestoreError.code === 'permission-denied' || firestoreError.code === 7) {
        return res.status(403).json({
          success: false,
          error: 'Error de permisos: No tienes permisos para actualizar productos',
          code: 'PERMISSION_DENIED'
        });
      }
      
      throw firestoreError;
    }
  } catch (error) {
    console.error('❌ API Error actualizando producto:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({ 
      success: false, 
      error: 'Error actualizando producto',
      details: error.message,
      code: error.code || 'UNKNOWN'
    });
  }
}

// DELETE - Eliminar producto
async function handleDeleteProduct(req, res) {
  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        error: 'ID del producto es requerido',
        received: { id }
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

    console.log(`🗑️ Eliminando producto con ID: ${id}`);
    
    // Referencia directa al documento del producto
    const productDocRef = doc(db, 'productos', id);
    
    try {
      // Verificar que el documento existe antes de eliminarlo
      const productsSnapshot = await getDocs(collection(db, 'productos'));
      const productDoc = productsSnapshot.docs.find(d => d.id === id);
      
      if (!productDoc) {
        console.error(`❌ Producto con ID ${id} no encontrado`);
        return res.status(404).json({ 
          success: false, 
          error: 'Producto no encontrado',
          searchedId: id
        });
      }
      
      const productData = productDoc.data();
      console.log(`✅ Producto encontrado: "${productData.title}" - Procediendo a eliminar...`);
      
      // Eliminar el documento directamente
      await deleteDoc(productDocRef);
      
      console.log(`✅ Producto eliminado exitosamente: productos/${id}`);

      res.status(200).json({ 
        success: true, 
        message: 'Producto eliminado exitosamente',
        deletedId: id
      });
      
    } catch (deleteError) {
      console.error('❌ Error al eliminar en Firestore:', deleteError);
      
      if (deleteError.code === 'not-found' || deleteError.code === 5) {
        return res.status(404).json({ 
          success: false, 
          error: 'Producto no encontrado',
          searchedId: id
        });
      }
      
      if (deleteError.code === 'permission-denied' || deleteError.code === 7) {
        return res.status(403).json({
          success: false,
          error: 'Error de permisos: No tienes permisos para eliminar productos',
          code: 'PERMISSION_DENIED'
        });
      }
      
      throw deleteError;
    }
  } catch (error) {
    console.error('❌ API Error eliminando producto:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({ 
      success: false, 
      error: 'Error eliminando producto',
      details: error.message,
      code: error.code || 'UNKNOWN'
    });
  }
}
