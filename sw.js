// SW minimal pour test
const CACHE_NAME = 'amazigh-tv-test-v1';

self.addEventListener('install', event => {
  console.log('🟡 SW: Installation démarrée');
  self.skipWaiting(); // Force l'activation
});

self.addEventListener('activate', event => {
  console.log('🟢 SW: Activé');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Log pour voir les requêtes
  console.log('SW: Fetch:', event.request.url);
});