/**
 * AlexCipher Service Worker - Ultra Reliability Edition (v17)
 */

const CACHE_NAME = 'alexcipher-core-v17';
const DATA_CACHE_NAME = 'alexcipher-data-v17';

// Ressources essentielles pour le fonctionnement hors-ligne
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './index.tsx',
  './App.tsx',
  './types.ts',
  './translations.ts',
  'https://cdn.tailwindcss.com',
  'https://cdn-icons-png.flaticon.com/512/2092/2092663.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
];

// Installation : Mise en cache immédiate du "Shell" de l'application
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching critical assets');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activation : Nettoyage des anciennes versions pour libérer de l'espace
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[SW] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    }).then(() => self.clients.claim())
  );
});

// Interception des requêtes : Stratégie de cache intelligente
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Stratégie pour les ressources de l'application
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // On sert le cache, mais on met à jour en arrière-plan (Stale-While-Revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(() => { /* Hors-ligne, rien à faire */ });
        
        return cachedResponse;
      }

      // Si pas en cache, on va sur le réseau et on met en cache pour la suite
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback pour la navigation si le réseau échoue
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});