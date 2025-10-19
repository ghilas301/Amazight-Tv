const CACHE_NAME = 'amazigh-tv-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/films.html',
  '/contact.html',
  '/style.css',
  '/script.js',
  '/manifest.json'
];

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourne le cache ou fait la requête réseau
        return response || fetch(event.request);
      })
  );
});