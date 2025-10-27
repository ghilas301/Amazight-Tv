// sw.js - Service Worker pour filtrer les requêtes
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Intercepter les requêtes vers DoodStream/Streamtape
  if (url.includes('doodstream') || url.includes('dsvplay') || url.includes('streamtape')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok && response.headers.get('content-type')?.includes('text/html')) {
            return response.text().then(html => {
              // Filtrer le HTML pour enlever les pubs
              const cleanHtml = removeAdsFromHTML(html);
              return new Response(cleanHtml, {
                headers: response.headers
              });
            });
          }
          return response;
        })
        .catch(err => {
          console.log('SW Fetch failed:', err);
          return fetch(event.request);
        })
    );
  }
});

function removeAdsFromHTML(html) {
  // Supprimer les scripts de pubs
  
  
  // Supprimer les iframes de pubs
  html = html.replace(/<iframe[^>]*\b(ad|ads|banner)[^>]*>.*?<\/iframe>/gis, '');
  
  // Supprimer les divs de pubs
  html = html.replace(/<div[^>]*\b(ad-container|ad-wrapper|ad_banner)[^>]*>.*?<\/div>/gis, '');
  
  return html;
}