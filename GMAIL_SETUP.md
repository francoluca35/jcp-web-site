# 📧 Configuración de Gmail para Envío de Emails

## 🚨 PROBLEMA IDENTIFICADO Y SOLUCIONADO

El problema era que el endpoint `/api/contact.js` **NO estaba enviando emails realmente**. Solo registraba los datos en la consola.

## ✅ SOLUCIÓN IMPLEMENTADA

He implementado el envío real de emails usando **Nodemailer** con Gmail. Ahora cuando alguien envíe el formulario, recibirás un email en **Francolucap1@gmail.com**.

## 🔧 CONFIGURACIÓN REQUERIDA

### 1. Crear archivo `.env.local`

Crea un archivo llamado `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# Configuración de Gmail para envío de emails
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=tu-contraseña-de-aplicacion
DESTINATION_EMAIL=Francolucap1@gmail.com
```

### 2. Configurar Gmail

#### Paso 1: Activar verificación en 2 pasos
1. Ve a [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Busca "Verificación en 2 pasos" y actívala

#### Paso 2: Generar contraseña de aplicación
1. En la misma página, busca "Contraseñas de aplicaciones"
2. Haz clic en "Contraseñas de aplicaciones"
3. Selecciona "Mail" como aplicación
4. Copia la contraseña generada (16 caracteres)
5. Usa esa contraseña en `GMAIL_APP_PASSWORD`

### 3. Reemplazar valores en `.env.local`

```env
# Reemplaza con tu email real
GMAIL_USER=tu-email-real@gmail.com

# Reemplaza con la contraseña de aplicación generada
GMAIL_APP_PASSWORD=abcd-efgh-ijkl-mnop

# Este ya está correcto
DESTINATION_EMAIL=Francolucap1@gmail.com
```

## 🚀 DESPLIEGUE EN VERCEL

### Variables de entorno en Vercel

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Ve a **Settings** → **Environment Variables**
3. Agrega estas variables:

| Variable | Valor |
|----------|-------|
| `GMAIL_USER` | tu-email@gmail.com |
| `GMAIL_APP_PASSWORD` | tu-contraseña-de-aplicacion |
| `DESTINATION_EMAIL` | Francolucap1@gmail.com |

### Redesplegar

Después de agregar las variables de entorno, redespliega tu proyecto en Vercel.

## 📧 CÓMO FUNCIONA AHORA

1. **Cliente llena el formulario** → Datos se envían a `/api/contact`
2. **Endpoint procesa los datos** → Crea un email HTML profesional
3. **Nodemailer envía el email** → Usando tu cuenta de Gmail
4. **Recibes el email** → En Francolucap1@gmail.com

## 🎨 FORMATO DEL EMAIL

El email que recibirás incluye:

- **Asunto**: `🏭 Nueva Solicitud Industrial - [Nombre del Cliente]`
- **Diseño profesional** con colores de tu marca
- **Información completa** del cliente
- **Mensaje del cliente** destacado
- **Enlaces directos** para responder por email o llamar
- **Timestamp** de cuándo se envió

## 🔍 VERIFICACIÓN

### Para probar localmente:
1. Configura `.env.local`
2. Ejecuta `npm run dev`
3. Envía un formulario de prueba
4. Revisa tu Gmail

### Para verificar en producción:
1. Configura las variables en Vercel
2. Redespliega
3. Envía un formulario desde tu sitio web
4. Revisa tu Gmail

## 🚨 IMPORTANTE

- **NO uses tu contraseña normal de Gmail**
- **SÍ usa la contraseña de aplicación** (16 caracteres)
- **Mantén las variables de entorno seguras**
- **No subas `.env.local` a Git**

## 📞 SOPORTE

Si tienes problemas:

1. **Verifica que la verificación en 2 pasos esté activada**
2. **Confirma que la contraseña de aplicación sea correcta**
3. **Revisa los logs de Vercel** para ver errores
4. **Prueba primero localmente** antes de desplegar

## ✅ RESULTADO FINAL

Después de esta configuración:
- ✅ Los formularios enviarán emails reales
- ✅ Recibirás notificaciones en Gmail
- ✅ Los emails tendrán formato profesional
- ✅ Funcionará tanto local como en producción
