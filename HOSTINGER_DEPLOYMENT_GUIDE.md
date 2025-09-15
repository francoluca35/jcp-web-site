# 🚀 Guía de Despliegue en Hostinger - JCP Maquinarias

## 📋 Requisitos Previos

- Cuenta de Hostinger activa
- Acceso al panel de control de Hostinger
- Node.js instalado localmente (versión 18 o superior)
- Git configurado (opcional, para actualizaciones futuras)

## 🔧 Paso 1: Preparar el Proyecto para Hostinger

### 1.1 Verificar Configuración Actual
El proyecto ya está configurado correctamente con:
- `output: 'export'` en `next.config.js` ✅
- `trailingSlash: true` para compatibilidad ✅
- `images: { unoptimized: true }` para hosting estático ✅

### 1.2 Crear Script de Build para Hostinger
```bash
# Ejecutar en la terminal del proyecto
npm run build
```

Esto generará la carpeta `out/` con todos los archivos estáticos listos para subir.

## 🌐 Paso 2: Configuración en Hostinger

### 2.1 Acceder al Panel de Control
1. Inicia sesión en tu cuenta de Hostinger
2. Ve a "Hosting" en el panel principal
3. Selecciona tu dominio
4. Accede al "File Manager"

### 2.2 Limpiar Directorio Público
1. En File Manager, navega a `public_html/`
2. Elimina todos los archivos existentes (excepto .htaccess si existe)
3. Mantén una copia de seguridad de archivos importantes

### 2.3 Subir Archivos del Build
1. Desde la carpeta `out/` de tu proyecto local
2. Sube TODOS los archivos y carpetas a `public_html/`
3. Estructura final debería ser:
```
public_html/
├── index.html
├── amasadoras-industriales/
├── hornos-industriales/
├── blog/
├── combos-soluciones/
├── catalog/
├── _next/
├── Assets/
├── data/
├── Document/
└── static/
```

## ⚙️ Paso 3: Configuración de .htaccess

### 3.1 Crear Archivo .htaccess
Crea un archivo `.htaccess` en `public_html/` con el siguiente contenido:

```apache
# Configuración para Next.js Static Export en Hostinger

# Habilitar mod_rewrite
RewriteEngine On

# Redireccionar www a no-www (opcional)
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Forzar HTTPS (recomendado)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Manejo de rutas para Next.js
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Headers de seguridad
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Compresión GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache para archivos estáticos
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/avif "access plus 1 year"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Configuración de MIME types
AddType application/javascript .js
AddType text/css .css
AddType image/webp .webp
AddType image/avif .avif
```

## 🔍 Paso 4: Verificación y Testing

### 4.1 Verificar URLs Principales
Después de subir, verifica que funcionen:
- `https://tudominio.com/`
- `https://tudominio.com/amasadoras-industriales/`
- `https://tudominio.com/hornos-industriales/`
- `https://tudominio.com/blog/`
- `https://tudominio.com/combos-soluciones/`
- `https://tudominio.com/catalog/`

### 4.2 Verificar SEO
- Usa Google PageSpeed Insights
- Verifica que los meta tags se muestren correctamente
- Comprueba que el sitemap sea accesible: `https://tudominio.com/sitemap.xml`

## 📝 Paso 5: Configuración de DNS (si es necesario)

### 5.1 Si usas dominio personalizado
1. En el panel de Hostinger, ve a "DNS Zone"
2. Asegúrate de que el registro A apunte a la IP del servidor
3. Configura el registro CNAME para www si lo deseas

## 🚀 Paso 6: Optimizaciones Adicionales

### 6.1 SSL/HTTPS
- Hostinger incluye SSL gratis
- Asegúrate de que esté activado en el panel

### 6.2 CDN (Opcional)
- Hostinger ofrece CDN integrado
- Actívalo desde el panel para mejor rendimiento global

### 6.3 Base de Datos (si es necesaria en el futuro)
- Hostinger incluye MySQL
- Para futuras funcionalidades dinámicas

## 🔄 Proceso de Actualización

### Para futuras actualizaciones:
1. Modifica el código localmente
2. Ejecuta `npm run build`
3. Sube solo los archivos modificados desde `out/` a `public_html/`

## ⚠️ Consideraciones Importantes

### Limitaciones de Hosting Estático:
- No hay funcionalidad del lado del servidor
- No hay API routes de Next.js
- No hay server-side rendering

### Ventajas:
- Hosting muy económico
- Excelente rendimiento
- Fácil de mantener
- Perfecto para sitios estáticos optimizados para SEO

## 🆘 Solución de Problemas Comunes

### Error 404 en rutas
- Verifica que el .htaccess esté correctamente configurado
- Asegúrate de que las rutas tengan trailing slash

### Imágenes no cargan
- Verifica que la carpeta `Assets/` esté en `public_html/`
- Comprueba las rutas en el código

### CSS no se aplica
- Verifica que la carpeta `_next/static/` esté completa
- Comprueba que los archivos CSS estén en el servidor

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de error en el panel de Hostinger
2. Verifica la configuración del .htaccess
3. Contacta al soporte de Hostinger si es necesario

---

## ✅ Checklist Final

- [ ] Proyecto buildado correctamente (`npm run build`)
- [ ] Archivos subidos a `public_html/`
- [ ] `.htaccess` configurado
- [ ] SSL activado
- [ ] URLs principales funcionando
- [ ] Meta tags visibles
- [ ] Sitemap accesible
- [ ] Imágenes cargando correctamente
- [ ] CSS aplicándose
- [ ] Redirecciones funcionando

¡Tu sitio JCP Maquinarias estará listo para recibir visitantes en Hostinger! 🎉
