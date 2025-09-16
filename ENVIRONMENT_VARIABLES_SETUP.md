# 🔧 Guía de Configuración de Variables de Entorno

## 📋 Variables de Entorno Requeridas

Basándome en la imagen de tu configuración de Vercel, necesitas configurar las siguientes variables de entorno:

### 🔥 Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

### 📧 Email Configuration (Gmail)
```
GMAIL_USER
GMAIL_APP_PASSWORD
DESTINATION_EMAIL
```

### 🗄️ Database & Admin
```
NEXT_PUBLIC_DATABASE_URL
NEXT_PUBLIC_ADMIN_EMAIL
```

### 📁 File Storage
```
BLOB_READ_WRITE_TOKEN
```

### 🧪 Testing
```
PRUEBA
```

## 🚀 Cómo Configurar Cada Variable

### 1. 🔥 Firebase Configuration

**Paso a paso:**
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `jcpapp-18205`
3. Ve a **Configuración del proyecto** (ícono de engranaje)
4. En la pestaña **General**, busca **Tus aplicaciones**
5. Selecciona tu app web o crea una nueva
6. Copia los valores de configuración

**Valores que necesitas:**
- `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
- `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `storageBucket` → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `messagingSenderId` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `appId` → `NEXT_PUBLIC_FIREBASE_APP_ID`
- `measurementId` → `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### 2. 📧 Gmail Configuration

**Para `GMAIL_USER`:**
- Usa tu email de Gmail: `tu-email@gmail.com`

**Para `GMAIL_APP_PASSWORD`:**
1. Ve a tu [Cuenta de Google](https://myaccount.google.com/)
2. **Seguridad** → **Verificación en 2 pasos** (debe estar activada)
3. **Contraseñas de aplicaciones**
4. Selecciona **Aplicación**: "Correo"
5. Selecciona **Dispositivo**: "Otro (nombre personalizado)"
6. Escribe: "JCP Web Site"
7. Copia la contraseña generada (16 caracteres sin espacios)

**Para `DESTINATION_EMAIL`:**
- Email donde quieres recibir los formularios: `Francolucap1@gmail.com`

### 3. 🗄️ Database & Admin

**Para `NEXT_PUBLIC_DATABASE_URL`:**
- Si usas Firebase Firestore, no necesitas esta variable
- Si usas otra base de datos, proporciona la URL de conexión

**Para `NEXT_PUBLIC_ADMIN_EMAIL`:**
- Email del administrador para acceso al panel admin
- Ejemplo: `admin@tudominio.com`

### 4. 📁 Vercel Blob Storage

**Para `BLOB_READ_WRITE_TOKEN`:**
1. Ve a tu [Dashboard de Vercel](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Storage**
4. Crea una nueva base de datos Blob
5. Copia el token de acceso

### 5. 🧪 Variable de Prueba

**Para `PRUEBA`:**
- Cualquier valor de prueba: `valor-de-prueba`

## 🔧 Configuración en Vercel

### Método 1: Desde el Dashboard de Vercel
1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Agrega cada variable una por una
4. Marca **Sensitive** para las variables que contengan información confidencial

### Método 2: Desde la CLI de Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Agregar variables
vercel env add GMAIL_USER
vercel env add GMAIL_APP_PASSWORD
vercel env add DESTINATION_EMAIL
# ... y así sucesivamente
```

## 📝 Archivo .env.local (Desarrollo Local)

Crea un archivo `.env.local` en la raíz de tu proyecto:

```bash
# Copia el archivo env.example
cp env.example .env.local
```

Luego edita `.env.local` con tus valores reales.

## ⚠️ Variables Sensibles

Marca como **Sensitive** en Vercel:
- `GMAIL_APP_PASSWORD`
- `BLOB_READ_WRITE_TOKEN`
- `NEXT_PUBLIC_DATABASE_URL` (si contiene credenciales)

## 🔄 Después de Configurar

1. **Redeploy** tu aplicación en Vercel
2. Las variables de entorno se aplicarán en el próximo deployment
3. Verifica que todo funcione correctamente

## 🐛 Troubleshooting

### Error: "Variables de Gmail no configuradas"
- Verifica que `GMAIL_USER` y `GMAIL_APP_PASSWORD` estén configuradas
- Asegúrate de que la App Password sea correcta (16 caracteres)

### Error: "Firebase not initialized"
- Verifica que todas las variables `NEXT_PUBLIC_FIREBASE_*` estén configuradas
- Asegúrate de que los valores sean correctos

### Error: "Blob storage not accessible"
- Verifica que `BLOB_READ_WRITE_TOKEN` esté configurado
- Asegúrate de que el token tenga permisos de lectura y escritura

## 📞 Soporte

Si tienes problemas con la configuración, revisa:
1. Los logs de Vercel en **Functions** → **View Function Logs**
2. La consola del navegador para errores del frontend
3. Los logs de la API en `/api/contact` para problemas de email
