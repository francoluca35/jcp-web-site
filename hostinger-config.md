# 🔧 Configuración Específica para Hostinger

## 📋 Información del Proyecto
- **Nombre**: JCP Maquinarias - Maquinaria Industrial para Panaderías
- **Tecnología**: Next.js 14 (Static Export)
- **Hosting**: Hostinger (Shared Hosting)
- **Optimización**: SEO + Performance

## 🚀 Comandos para Despliegue

### Preparar para Hostinger:
```bash
npm run build:hostinger
```

### O usar el comando completo:
```bash
npm run deploy:hostinger
```

## 📁 Estructura de Archivos para Hostinger

Después del build, la carpeta `out/` contendrá:
```
out/
├── index.html                    # Página principal
├── .htaccess                     # Configuración Apache
├── sitemap.xml                   # Mapa del sitio
├── robots.txt                    # Robots para SEO
├── INSTRUCCIONES-HOSTINGER.md    # Guía de despliegue
├── amasadoras-industriales/      # Página de amasadoras
│   └── index.html
├── hornos-industriales/          # Página de hornos
│   └── index.html
├── blog/                         # Blog técnico
│   └── index.html
├── combos-soluciones/            # Combos y soluciones
│   └── index.html
├── catalog/                      # Catálogo completo
│   └── index.html
├── _next/                        # Assets de Next.js
│   └── static/
├── Assets/                       # Imágenes y recursos
│   ├── logo.png
│   ├── logo.webp
│   └── logo.avif
├── data/                         # Datos JSON
│   └── modernProducts.json
└── Document/                     # Documentos PDF
    └── catalogo_maquinaria.pdf
```

## ⚙️ Configuración de Hostinger

### 1. Panel de Control
- Acceder a hPanel de Hostinger
- Ir a "Website" → "File Manager"
- Navegar a `public_html/`

### 2. Subir Archivos
1. Limpiar `public_html/` (eliminar archivos existentes)
2. Subir TODOS los archivos de `out/` a `public_html/`
3. Verificar que `.htaccess` esté en la raíz

### 3. Configuración DNS
- Verificar que el dominio apunte correctamente
- Activar SSL/HTTPS (gratis en Hostinger)
- Configurar redirección www (opcional)

## 🔍 Verificación Post-Despliegue

### URLs Críticas a Verificar:
- ✅ `https://tudominio.com/` - Página principal
- ✅ `https://tudominio.com/amasadoras-industriales/` - Página de amasadoras
- ✅ `https://tudominio.com/hornos-industriales/` - Página de hornos
- ✅ `https://tudominio.com/blog/` - Blog técnico
- ✅ `https://tudominio.com/combos-soluciones/` - Combos
- ✅ `https://tudominio.com/catalog/` - Catálogo
- ✅ `https://tudominio.com/sitemap.xml` - Mapa del sitio
- ✅ `https://tudominio.com/robots.txt` - Robots.txt

### Herramientas de Verificación:
- **Google PageSpeed Insights**: Para verificar rendimiento
- **Google Search Console**: Para monitorear SEO
- **GTmetrix**: Para análisis de velocidad
- **SSL Labs**: Para verificar certificado SSL

## 📊 Optimizaciones Implementadas

### SEO:
- ✅ Meta tags optimizados
- ✅ Structured data (JSON-LD)
- ✅ Sitemap.xml generado
- ✅ URLs amigables
- ✅ Contenido optimizado para palabras clave

### Performance:
- ✅ Imágenes optimizadas (WebP, AVIF)
- ✅ CSS y JS minificados
- ✅ Compresión GZIP habilitada
- ✅ Cache headers configurados
- ✅ Lazy loading implementado

### Seguridad:
- ✅ Headers de seguridad
- ✅ HTTPS forzado
- ✅ XSS protection
- ✅ Content type validation

## 🔄 Proceso de Actualización

### Para actualizar el sitio:
1. Modificar código localmente
2. Ejecutar `npm run build:hostinger`
3. Subir archivos modificados desde `out/` a `public_html/`
4. Verificar que todo funcione correctamente

### Archivos que suelen cambiar:
- `index.html` (página principal)
- Páginas específicas (`amasadoras-industriales/index.html`, etc.)
- Assets en `_next/static/`
- CSS y JS minificados

## 🆘 Solución de Problemas

### Error 404 en páginas:
- Verificar que `.htaccess` esté en `public_html/`
- Comprobar que las rutas tengan trailing slash
- Revisar configuración de mod_rewrite en Hostinger

### Imágenes no cargan:
- Verificar que carpeta `Assets/` esté completa
- Comprobar rutas en el código
- Verificar permisos de archivos

### CSS no se aplica:
- Verificar que `_next/static/` esté completo
- Comprobar que archivos CSS estén en el servidor
- Verificar configuración de MIME types

## 📞 Soporte

### Hostinger:
- Panel de soporte en hPanel
- Chat en vivo 24/7
- Base de conocimientos

### Proyecto:
- Revisar logs de error en el panel
- Verificar configuración de archivos
- Consultar documentación de Next.js

---

## ✅ Checklist de Despliegue

- [ ] Build ejecutado correctamente
- [ ] Archivos subidos a `public_html/`
- [ ] `.htaccess` configurado
- [ ] SSL activado
- [ ] DNS configurado
- [ ] URLs principales verificadas
- [ ] Meta tags funcionando
- [ ] Sitemap accesible
- [ ] Imágenes cargando
- [ ] CSS aplicándose
- [ ] Redirecciones funcionando
- [ ] Performance optimizada
- [ ] SEO verificado

¡Tu sitio JCP Maquinarias estará optimizado y listo para Hostinger! 🎉
