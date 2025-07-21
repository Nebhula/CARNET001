const CACHE_NAME = 'pwa-cache-v2';  // Cambiado a v2 para forzar actualización
const OFFLINE_URL = '/offline.html';

// Añade aquí TODOS los archivos esenciales (usa las rutas exactas de tu proyecto)
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/styles.css',
  '/app.js'
];

// --- INSTALACIÓN ---
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// --- ACTIVACIÓN ---
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => key !== CACHE_NAME ? caches.delete(key) : Promise.resolve())
      );
    }).then(() => self.clients.claim())
  );
});

// --- INTERCEPTAR PETICIONES ---
self.addEventListener('fetch', event => {
  // Ignorar peticiones que no sean GET o sean a otro dominio
  if (event.request.method !== 'GET' || !event.request.url.includes('socnasdigi')) return;

  // Manejo especial para páginas (HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))  // ← Mostrar offline.html si falla
    );
    return;
  }

  // Para otros recursos (CSS, JS, imágenes)
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
