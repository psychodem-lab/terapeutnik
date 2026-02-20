const CACHE_NAME = 'therapy-manager-v2';
// Lista zasobów do zapisania offline
const urlsToCache = [
  './',
  './index.html', // upewnij się, że nazwa pliku HTML się zgadza
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js'
];

// Instalacja - pobieranie plików do cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Pobieranie zasobów do cache...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Aktywacja i czyszczenie starych wersji
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Przechwytywanie zapytań - tryb offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jeśli mamy plik w cache, zwróć go. Jeśli nie, pobierz z sieci.
        return response || fetch(event.request);
      })
  );
});
