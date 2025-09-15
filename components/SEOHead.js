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
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content={seoConfig.company.name} />
      <meta property="og:locale" content="es_AR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content={seoConfig.twitter.site} />
      <meta name="twitter:creator" content={seoConfig.twitter.creator} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preload de recursos críticos */}
      {seoConfig.performance.criticalResources.map((resource, index) => (
        <link 
          key={index}
          rel="preload" 
          href={resource} 
          as={resource.endsWith('.json') ? 'fetch' : 'image'}
          crossOrigin="anonymous"
        />
      ))}
      
      {/* Datos estructurados */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
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
