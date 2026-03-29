const CACHE_NAME = 'pargolovskaya-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/kraevedenie.html',
  '/newbooks.html',
  '/services.html',
  '/events.html',
  '/faq.html',
  '/district-libraries.html',
  '/partners.html',
  '/contacts.html',
  '/speedcubing.html',
  '/gallery.html',
  '/digital-resources.html',
  '/literary-calendar.html',
  '/bookmatcher.html',
  '/timeline.html',
  '/book-recommendations.html',
  '/book-kitchen.html',
  '/common.css',
  '/common.js',
  '/logo.PNG',
  '/s_ylici.jpg',
  '/chitalnii_zal.jpg',
  '/vzroslay_literatura.jpg',
  '/detskie_knigi.jpg',
  '/knigi_vystavka.jpg',
  '/vystavka_kartin.jpg',
  '/knigoobmen.webp',
  '/n3.jpg',
  '/n5.JPG',
  '/n6.jpg',
  '/n7.jpg',
  '/n8.JPG',
  '/n9.jpg',
  '/n10.jpg',
  '/n11.jpg',
  '/n12.JPG',
  '/n13.jpg',
  '/n14.jpg',
  '/n15.jpg',
  '/n16.jpg',
  '/n17.JPG',
  '/n20.jpg',
  '/n21.JPG',
  '/n23.jpg',
  '/n24.jpg',
  '/n26.JPG',
  '/n27.jpg'
];

// Установка: кэшируем все файлы по одному, чтобы избежать ошибки 404
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Кэширование начато');
      const cachePromises = urlsToCache.map(url => {
        return fetch(url)
          .then(response => {
            if (!response.ok) throw new Error(`Ошибка ${response.status} при загрузке ${url}`);
            return cache.put(url, response);
          })
          .catch(err => console.warn(`Не удалось закэшировать ${url}:`, err));
      });
      return Promise.allSettled(cachePromises);
    })
  );
  self.skipWaiting();
});

// Запросы: сначала кэш, потом сеть
self.addEventListener('fetch', event => {
  // Если запрос на внешний ресурс (не наш домен) — не кэшируем, пусть идёт в сеть
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Если нет сети и нет в кэше — возвращаем простую страницу
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('', { status: 404, statusText: 'Not Found' });
      });
    })
  );
});

// Активация: удаляем старые кэши
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('Удаляем старый кэш:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});