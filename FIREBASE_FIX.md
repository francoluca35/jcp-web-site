# 🔥 Solución para Error 403 PERMISSION_DENIED de Firebase

## Problema
Error: `403 PERMISSION_DENIED: The caller does not have permission` en Firebase Installations.

**Este error ocurre cuando:**
1. Las APIs necesarias no están habilitadas en Google Cloud Console
2. Las reglas de Firestore no están desplegadas
3. El proyecto Firebase no tiene los permisos correctos configurados

## ⚠️ SOLUCIÓN URGENTE - Habilitar APIs en Google Cloud Console

Este es el paso MÁS IMPORTANTE. Sin esto, nada funcionará.

## Solución Paso a Paso

### 1. Desplegar Reglas de Firestore

Las reglas de Firestore deben estar desplegadas en Firebase para que funcionen correctamente.

#### Opción A: Usando Firebase CLI (Recomendado)

1. **Instalar Firebase CLI** (si no lo tienes):
   ```bash
   npm install -g firebase-tools
   ```

2. **Iniciar sesión en Firebase**:
   ```bash
   firebase login
   ```

3. **Inicializar Firebase** (si no está inicializado):
   ```bash
   firebase init firestore
   ```
   - Selecciona tu proyecto: `jcpapp-18205`
   - Confirma que quieres usar el archivo `firestore.rules` existente

4. **Desplegar las reglas**:
   ```bash
   firebase deploy --only firestore:rules
   ```

#### Opción B: Desde Firebase Console (Alternativa)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `jcpapp-18205`
3. Ve a **Firestore Database** → **Reglas**
4. Copia el contenido de `firestore.rules`:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
5. Haz clic en **Publicar**

### 2. ⚠️ HABILITAR APIs EN GOOGLE CLOUD CONSOLE (MUY IMPORTANTE)

Este es el paso CRÍTICO que está causando el error 403.

1. **Ve a Google Cloud Console**: https://console.cloud.google.com/
2. **Selecciona el proyecto**: `jcpapp-18205` (en el selector de proyectos en la parte superior)
3. **Ve a APIs & Services → Library**: 
   - En el menú lateral, busca "APIs & Services"
   - Luego haz clic en "Library" o "Biblioteca"
4. **Habilita estas APIs** (son OBLIGATORIAS):
   
   **APIs que DEBEN estar habilitadas:**
   - ✅ **Cloud Firestore API** - Busca "Cloud Firestore API" y haz clic en "Enable"
   - ✅ **Firebase Installations API** - Busca "Firebase Installations API" y haz clic en "Enable"
   - ✅ **Firebase Authentication API** - Busca "Identity Toolkit API" o "Firebase Authentication API" y haz clic en "Enable"
   - ✅ **Cloud Storage API** - Busca "Cloud Storage API" y haz clic en "Enable"

5. **Enlaces directos para habilitar** (cambia `PROJECT_ID` por `jcpapp-18205`):
   - Cloud Firestore API: https://console.cloud.google.com/apis/library/firestore.googleapis.com?project=jcpapp-18205
   - Firebase Installations API: https://console.cloud.google.com/apis/library/firebaseinstallations.googleapis.com?project=jcpapp-18205
   - Identity Toolkit API: https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=jcpapp-18205
   - Cloud Storage API: https://console.cloud.google.com/apis/library/storage-component.googleapis.com?project=jcpapp-18205

6. **Verifica que estén habilitadas**: Ve a "APIs & Services" → "Enabled APIs" y confirma que todas aparezcan en la lista

**⚠️ IMPORTANTE**: Este paso puede tardar unos minutos. Después de habilitar las APIs, espera 2-3 minutos y luego reinicia tu servidor de desarrollo.

### 3. Verificar Configuración del Proyecto

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `jcpapp-18205`
3. Ve a **Configuración del proyecto** (ícono de engranaje)
4. En la pestaña **General**, verifica:
   - **Project ID**: `jcpapp-18205`
   - **Project Number**: Verifica que sea correcto

### 4. Verificar Variables de Entorno

Asegúrate de que las variables de entorno estén configuradas correctamente:

En `.env.local` (desarrollo):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAZkP4EynfssAMT4-mdOoTWXifgWz7zxC4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jcpapp-18205.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jcpapp-18205
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jcpapp-18205.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=230450676718
NEXT_PUBLIC_FIREBASE_APP_ID=1:230450676718:web:ecb1e7ae68e3dad41cc4ff
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-5CZ91ZSRNW
```

### 5. Reiniciar el Servidor de Desarrollo

Después de desplegar las reglas, reinicia tu servidor:

```bash
# Detener el servidor (Ctrl+C)
# Luego reiniciar:
npm run dev
```

### 6. Verificar en la Consola del Navegador

1. Abre la consola del navegador (F12)
2. Intenta crear un producto desde el admin
3. Verifica que no aparezcan errores de permisos

## Verificación Final

Después de seguir estos pasos, verifica:

1. ✅ Las reglas de Firestore están desplegadas
2. ✅ Las APIs necesarias están habilitadas
3. ✅ Las variables de entorno están configuradas
4. ✅ El servidor se reinició

Si el problema persiste, verifica los logs en la consola del navegador y en la terminal del servidor.
