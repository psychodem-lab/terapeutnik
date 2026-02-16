const CACHE_NAME = 'terapeutnik-v4';
// Lista plików do zapamiętania (dodaj tu nazwę swojego pliku HTML)
const ASSETS = [
  './',
  './index.html', // Upewnij się, że nazwa pliku się zgadza
  './manifest.json'
];

// Instalacja: Zapisywanie plików w pamięci podręcznej
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Buforowanie plików');
      return cache.addAll(ASSETS);
    })
  );
});

// Aktywacja: Usuwanie starych wersji cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Usuwanie starego cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Obsługa żądań: Najpierw sprawdź cache, potem internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Zwróć plik z cache, a jeśli go nie ma, pobierz z sieci
      return response || fetch(event.request);
    })
  );
});
