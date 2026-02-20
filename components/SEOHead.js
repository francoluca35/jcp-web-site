import Head from 'next/head';
import { seoConfig } from '../seo-config';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  ogImage, 
  ogType = 'website',
  structuredData,
  noindex = false,
  nofollow = false
}) => {
  const fullTitle = title ? `${title} | ${seoConfig.company.name}` : seoConfig.company.name;
  const fullDescription = description || seoConfig.company.description;
  const fullKeywords = keywords || seoConfig.keywords.primary.join(', ');
  const fullCanonicalUrl = canonicalUrl || seoConfig.company.url;
  const fullOgImage = ogImage || seoConfig.openGraph.images[0].url;

  const robotsContent = [];
  if (noindex) robotsContent.push('noindex');
  else robotsContent.push('index');
  
  if (nofollow) robotsContent.push('nofollow');
  else robotsContent.push('follow');
  if (!noindex) {
    robotsContent.push('max-image-preview:large', 'max-snippet:-1', 'max-video-preview:-1');
  }

  const structuredDataList = Array.isArray(structuredData)
    ? structuredData
    : structuredData
    ? [structuredData]
    : [];

  return (
    <Head>
      {/* Meta tags básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={seoConfig.company.name} />
      <meta name="robots" content={robotsContent.join(', ')} />
      <meta name="language" content="es-AR" />
      <meta name="geo.region" content="AR" />
      <meta name="geo.placename" content="Argentina" />
      <meta name="revisit-after" content="3 days" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="alternate" hrefLang="es-AR" href={fullCanonicalUrl} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content={seoConfig.openGraph.images[0].width} />
      <meta property="og:image:height" content={seoConfig.openGraph.images[0].height} />
      <meta property="og:site_name" content={seoConfig.company.name} />
      <meta property="og:locale" content="es_AR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={seoConfig.openGraph.images[0].alt} />
      <meta name="twitter:site" content={seoConfig.twitter.site} />
      <meta name="twitter:creator" content={seoConfig.twitter.creator} />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/apple-touch-icon.png" />
      <link rel="shortcut icon" href="/apple-touch-icon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preload solo del logo (usado en header). No preload de JSON para evitar "preloaded but not used". */}
      <link
        rel="preload"
        href="/Assets/logojcp.png"
        as="image"
      />
      
      {/* Datos estructurados */}
      {structuredDataList.map((data, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data)
          }}
        />
      ))}
      
      {/* Schema.org por defecto */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seoConfig.schema.organization)
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seoConfig.schema.website)
        }}
      />
    </Head>
  );
};

export default SEOHead;
