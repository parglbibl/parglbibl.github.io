// service-worker.js
const CACHE_NAME = 'pargolovskaya-v1';
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
  // При необходимости добавьте другие изображения и страницы
];

// Устанавливаем кэш
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэш открыт');
        return cache.addAll(urlsToCache);
      })
  );
});

// При запросе сначала ищем в кэше, потом в сети
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Обновление кэша (удаляем старый)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});