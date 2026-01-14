// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAZkP4EynfssAMT4-mdOoTWXifgWz7zxC4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "jcpapp-18205.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "jcpapp-18205",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "jcpapp-18205.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "230450676718",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:230450676718:web:ecb1e7ae68e3dad41cc4ff",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-5CZ91ZSRNW"
};

// Initialize Firebase
let app;
try {
  // Verificar si ya existe una instancia de Firebase
  const existingApps = getApps();
  
  if (existingApps.length > 0) {
    app = existingApps[0];
  } else {
    app = initializeApp(firebaseConfig);
  }
} catch (error) {
  if (error.code === 'app/duplicate-app') {
    // Si ya existe, obtener la instancia existente
    const existingApps = getApps();
    app = existingApps.length > 0 ? existingApps[0] : initializeApp(firebaseConfig, 'jcpapp-18205-secondary');
  } else {
    console.error('Error inicializando Firebase:', error);
    // En desarrollo, mostrar error detallado; en producción, usar valores por defecto
    if (process.env.NODE_ENV === 'development') {
      throw error;
    }
    // Intentar inicializar con valores por defecto
    app = initializeApp(firebaseConfig);
  }
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
let db;
try {
  db = getFirestore(app);
} catch (error) {
  console.error('❌ Error inicializando Firestore:', error);
  console.error('❌ Si ves un error 403, necesitas habilitar las APIs en Google Cloud Console');
  console.error('❌ Ver archivo FIREBASE_FIX.md para instrucciones');
  // En caso de error, crear una instancia null para evitar crashes
  db = null;
}

export { db };

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Analytics - DESHABILITADO TEMPORALMENTE hasta que Firebase Installations API esté habilitada
// El error 403 PERMISSION_DENIED ocurre porque Firebase Installations API no está habilitada
// Una vez habilitada la API, descomenta el código de abajo y comenta la línea de export null

// DESHABILITADO: Analytics no se inicializará hasta que las APIs estén habilitadas
export const analytics = null;

/* 
// Código para habilitar Analytics después de habilitar Firebase Installations API:
let analytics = null;
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  try {
    analytics = getAnalytics(app);
    console.log('✅ Firebase Analytics inicializado correctamente');
  } catch (error) {
    console.warn('⚠️ No se pudo inicializar Firebase Analytics:', error.message);
    console.warn('⚠️ Si ves un error 403, habilita Firebase Installations API en Google Cloud Console');
    console.warn('⚠️ Ver archivo HABILITAR_API_INSTALACIONES.md para instrucciones');
    analytics = null;
  }
}
export { analytics };
*/

export default app;