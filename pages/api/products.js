import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc,
  addDoc,
  query,
  orderBy,
  limit
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
    
    // Leer de Firestore
    const productsRef = collection(db, 'productos');
    const snapshot = await getDocs(productsRef);
    
    const products = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      // Buscar productos en las subcategorías
      if (data.nuevo) {
        Object.keys(data.nuevo).forEach(subcategory => {
          if (Array.isArray(data.nuevo[subcategory])) {
            data.nuevo[subcategory].forEach(product => {
              products.push({
                id: product.id || doc.id,
                ...product,
                condition: 'nuevo',
                subcategory
              });
            });
          }
        });
      }
      if (data.usado) {
        Object.keys(data.usado).forEach(subcategory => {
          if (Array.isArray(data.usado[subcategory])) {
            data.usado[subcategory].forEach(product => {
              products.push({
                id: product.id || doc.id,
                ...product,
                condition: 'usado',
                subcategory
              });
            });
          }
        });
      }
    });

    res.status(200).json({ 
      success: true, 
      data: products 
    });
  } catch (error) {
    console.error('❌ API Error obteniendo productos:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error obteniendo productos',
      details: error.message 
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
      images 
    } = req.body;
    
    // Validar campos requeridos
    if (!title || !description || !characteristics || !price || !condition || !subcategory) {
      return res.status(400).json({ 
        success: false, 
        error: 'Todos los campos son requeridos' 
      });
    }

    
    const productData = {
      id: Date.now().toString(), // ID temporal
      title,
      description,
      characteristics,
      price,
      condition,
      subcategory,
      images: images || [],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Guardar en Firestore
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
    
    // Actualizar las categorías con el nuevo producto
    const updatedData = {
      ...existingData,
      [condition]: {
        ...existingData[condition],
        [subcategory]: [
          ...(existingData[condition]?.[subcategory] || []),
          productData
        ]
      }
    };
    
    // Guardar en Firestore
    const docRef = doc(db, 'productos', docId);
    await setDoc(docRef, updatedData, { merge: true });
    
    res.status(201).json({ 
      success: true, 
      message: 'Producto creado exitosamente',
      data: productData
    });
  } catch (error) {
    console.error('❌ API Error creando producto:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error creando producto',
      details: error.message 
    });
  }
}

// PUT - Actualizar producto
async function handleUpdateProduct(req, res) {
  try {
    const { id, condition, subcategory } = req.query;
    const updateData = req.body;
    
    if (!id || !condition || !subcategory) {
      return res.status(400).json({ 
        success: false, 
        error: 'ID, condición y subcategoría del producto son requeridos' 
      });
    }

    // Obtener datos existentes
    const productsRef = collection(db, 'productos');
    const snapshot = await getDocs(productsRef);
    
    let docId = 'categories';
    let existingData = {};
    
    if (!snapshot.empty) {
      const firstDoc = snapshot.docs[0];
      docId = firstDoc.id;
      existingData = firstDoc.data();
    }
    
    // Encontrar y actualizar el producto específico
    const products = existingData[condition]?.[subcategory] || [];
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Producto no encontrado' 
      });
    }
    
    // Actualizar el producto
    const updatedProduct = {
      ...products[productIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    products[productIndex] = updatedProduct;
    
    // Actualizar en Firestore
    const updatedData = {
      ...existingData,
      [condition]: {
        ...existingData[condition],
        [subcategory]: products
      }
    };
    
    const docRef = doc(db, 'productos', docId);
    await setDoc(docRef, updatedData, { merge: true });

    res.status(200).json({ 
      success: true, 
      message: 'Producto actualizado exitosamente',
      data: updatedProduct
    });
  } catch (error) {
    console.error('❌ API Error actualizando producto:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error actualizando producto',
      details: error.message 
    });
  }
}

// DELETE - Eliminar producto
async function handleDeleteProduct(req, res) {
  try {
    const { id, condition, subcategory } = req.query;
    
    if (!id || !condition || !subcategory) {
      return res.status(400).json({ 
        success: false, 
        error: 'ID, condición y subcategoría del producto son requeridos' 
      });
    }

    // Obtener datos existentes
    const productsRef = collection(db, 'productos');
    const snapshot = await getDocs(productsRef);
    
    let docId = 'categories';
    let existingData = {};
    
    if (!snapshot.empty) {
      const firstDoc = snapshot.docs[0];
      docId = firstDoc.id;
      existingData = firstDoc.data();
    }
    
    // Encontrar y eliminar el producto específico
    const products = existingData[condition]?.[subcategory] || [];
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Producto no encontrado' 
      });
    }
    
    // Eliminar el producto del array
    products.splice(productIndex, 1);
    
    // Actualizar en Firestore
    const updatedData = {
      ...existingData,
      [condition]: {
        ...existingData[condition],
        [subcategory]: products
      }
    };
    
    const docRef = doc(db, 'productos', docId);
    await setDoc(docRef, updatedData, { merge: true });

    res.status(200).json({ 
      success: true, 
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    console.error('❌ API Error eliminando producto:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error eliminando producto',
      details: error.message 
    });
  }
}
