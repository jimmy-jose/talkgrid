const CACHE_NAME = 'talkgrid-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/index.css',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/pages/HomePage.jsx',
  '/src/pages/PinPage.jsx',
  '/src/pages/SettingsPage.jsx',
  '/src/components/GridItem.jsx',
  '/src/components/ConfirmModal.jsx',
  // Add any other assets you want to cache
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['talkgrid-cache'];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});