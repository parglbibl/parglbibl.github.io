const CACHE_NAME = 'pargolovskaya-v2';
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

// Установка: кэшируем файлы по одному, чтобы ошибка одного не ломала весь кэш
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Кэш открыт, начинаем сохранение файлов...');
      const cachePromises = urlsToCache.map(url => {
        return fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Ошибка ${response.status} при загрузке ${url}`);
            }
            return cache.put(url, response);
          })
          .catch(error => {
            console.error(`Не удалось закэшировать ${url}:`, error);
          });
      });
      return Promise.allSettled(cachePromises).then(() => {
        console.log('Кэширование завершено (с возможными пропусками)');
      });
    })
  );
});

// При запросе: сначала сеть, если не удалось — кэш
self.addEventListener('fetch', event => {
  // Не кэшируем запросы к внешним API (например, Google Calendar)
  if (event.request.url.includes('calendar.google.com') ||
      event.request.url.includes('vk.com') ||
      event.request.url.includes('yandex.ru')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Если получили ответ, кэшируем его для будущих офлайн-запросов
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // Если нет сети, пытаемся отдать из кэша
        return caches.match(event.request);
      })
  );
});

// Активация: удаляем старые кэши
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Удаляем старый кэш:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});