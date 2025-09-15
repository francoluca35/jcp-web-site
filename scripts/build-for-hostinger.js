#!/usr/bin/env node

/**
 * Script para preparar el proyecto JCP Maquinarias para despliegue en Hostinger
 * Ejecutar con: node scripts/build-for-hostinger.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando proceso de build para Hostinger...\n');

// Verificar que estamos en el directorio correcto
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: Este script debe ejecutarse desde la raíz del proyecto');
  process.exit(1);
}

try {
  // Paso 1: Limpiar build anterior
  console.log('📁 Limpiando builds anteriores...');
  if (fs.existsSync('out')) {
    fs.rmSync('out', { recursive: true, force: true });
    console.log('✅ Carpeta "out" limpiada');
  }

  // Paso 2: Instalar dependencias
  console.log('\n📦 Verificando dependencias...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencias verificadas');

  // Paso 3: Ejecutar build
  console.log('\n🔨 Ejecutando build de producción...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completado');

  // Paso 4: Verificar que se generó la carpeta out
  if (!fs.existsSync('out')) {
    console.error('❌ Error: No se generó la carpeta "out"');
    process.exit(1);
  }

  // Paso 5: Crear archivo .htaccess para Hostinger
  console.log('\n⚙️ Creando archivo .htaccess para Hostinger...');
  const htaccessContent = `# Configuración para Next.js Static Export en Hostinger

# Habilitar mod_rewrite
RewriteEngine On

# Redireccionar www a no-www (opcional)
RewriteCond %{HTTP_HOST} ^www\\.(.*)$ [NC]
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
AddType image/avif .avif`;

  fs.writeFileSync(path.join('out', '.htaccess'), htaccessContent);
  console.log('✅ Archivo .htaccess creado');

  // Paso 6: Crear archivo de instrucciones
  console.log('\n📋 Creando archivo de instrucciones...');
  const instructionsContent = `# INSTRUCCIONES PARA SUBIR A HOSTINGER

## Archivos listos para subir
Todos los archivos de esta carpeta deben subirse a public_html/ en tu hosting de Hostinger.

## Pasos:
1. Accede al File Manager de Hostinger
2. Ve a public_html/
3. Elimina todos los archivos existentes (excepto .htaccess si ya existe)
4. Sube TODOS los archivos de esta carpeta a public_html/
5. Verifica que el .htaccess esté en la raíz de public_html/

## URLs a verificar después del despliegue:
- https://tudominio.com/
- https://tudominio.com/amasadoras-industriales/
- https://tudominio.com/hornos-industriales/
- https://tudominio.com/blog/
- https://tudominio.com/combos-soluciones/
- https://tudominio.com/catalog/
- https://tudominio.com/sitemap.xml

## Si tienes problemas:
1. Verifica que todos los archivos se subieron correctamente
2. Asegúrate de que el .htaccess esté en la raíz
3. Contacta al soporte de Hostinger si es necesario

¡Listo para subir! 🚀`;

  fs.writeFileSync(path.join('out', 'INSTRUCCIONES-HOSTINGER.md'), instructionsContent);
  console.log('✅ Archivo de instrucciones creado');

  // Paso 7: Mostrar resumen
  console.log('\n🎉 ¡Build completado exitosamente!');
  console.log('\n📁 Archivos listos en la carpeta "out/"');
  console.log('📋 Lee "out/INSTRUCCIONES-HOSTINGER.md" para los próximos pasos');
  
  // Mostrar tamaño de archivos
  const outDir = fs.readdirSync('out');
  console.log(`\n📊 Total de archivos generados: ${outDir.length}`);
  
  // Mostrar archivos principales
  console.log('\n📄 Archivos principales generados:');
  const mainFiles = ['index.html', '.htaccess', 'sitemap.xml', 'robots.txt'];
  mainFiles.forEach(file => {
    if (fs.existsSync(path.join('out', file))) {
      const stats = fs.statSync(path.join('out', file));
      console.log(`   ✅ ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
    }
  });

  console.log('\n🚀 ¡Listo para subir a Hostinger!');
  console.log('💡 Sigue las instrucciones en out/INSTRUCCIONES-HOSTINGER.md');

} catch (error) {
  console.error('\n❌ Error durante el proceso:', error.message);
  process.exit(1);
}
