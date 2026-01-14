# ⚠️ SOLUCIÓN URGENTE: Error 403 PERMISSION_DENIED

## El Problema
```
FirebaseError: Installations: Generate Auth Token request failed with error 
"403 PERMISSION_DENIED: The caller does not have permission"
```

## 🔥 SOLUCIÓN INMEDIATA (Tarda 5 minutos)

### Paso 1: Habilitar APIs en Google Cloud Console

1. **Abre este enlace** (cambia `jcpapp-18205` si tu proyecto tiene otro ID):
   https://console.cloud.google.com/apis/library?project=jcpapp-18205

2. **Busca y habilita estas APIs** (en orden):

   a. **Firebase Installations API** (LA MÁS IMPORTANTE):
      - Busca: "Firebase Installations API"
      - Haz clic en "Enable" o "Habilitar"
      - Espera unos segundos hasta que diga "API enabled"

   b. **Cloud Firestore API**:
      - Busca: "Cloud Firestore API"  
      - Haz clic en "Enable"
      
   c. **Identity Toolkit API** (para autenticación):
      - Busca: "Identity Toolkit API"
      - Haz clic en "Enable"

   d. **Cloud Storage API**:
      - Busca: "Cloud Storage API"
      - Haz clic en "Enable"

### Paso 2: Verificar que estén habilitadas

1. Ve a: https://console.cloud.google.com/apis/dashboard?project=jcpapp-18205
2. Deberías ver todas las APIs listadas como "Enabled"

### Paso 3: Desplegar Reglas de Firestore

1. Ve a: https://console.firebase.google.com/project/jcpapp-18205/firestore/rules
2. Copia y pega esto en las reglas:
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
3. Haz clic en "Publish" o "Publicar"

### Paso 4: Reiniciar el Servidor

```bash
# Detén el servidor (Ctrl+C)
# Luego reinicia:
npm run dev
```

## ✅ Verificación

Después de estos pasos:
1. Abre la consola del navegador (F12)
2. Recarga la página
3. Intenta crear un producto desde el admin
4. El error 403 debería desaparecer

## 🔍 Si el error persiste

1. Verifica que el proyecto ID sea correcto: `jcpapp-18205`
2. Verifica que tengas permisos de "Owner" o "Editor" en el proyecto
3. Espera 2-3 minutos después de habilitar las APIs (pueden tardar en propagarse)
4. Limpia la caché del navegador (Ctrl+Shift+Delete)

## 📞 Enlaces Rápidos

- **Google Cloud Console**: https://console.cloud.google.com/?project=jcpapp-18205
- **Firebase Console**: https://console.firebase.google.com/project/jcpapp-18205
- **Firestore Rules**: https://console.firebase.google.com/project/jcpapp-18205/firestore/rules
- **APIs Library**: https://console.cloud.google.com/apis/library?project=jcpapp-18205
