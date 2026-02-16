const CACHE_NAME = 'terapeutnik';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Instalacja - zapisywanie plików do cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Serwowanie plików z cache (Offline Mode)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
