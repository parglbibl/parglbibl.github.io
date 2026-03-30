const CACHE_NAME = 'pargolovskaya-v6';
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
  '/literary-portrait.html',
  '/konkurs.html',
  '/map.html',
  '/nizhnee-pargolovo.html',
  '/verkhnee-pargolovo.html',
  '/torfyanaya.html',
  '/pargolovo-culture.html',
  '/shuvalovsky-park.html',
  '/khramy-verkhnee-pargolovo.html',
  '/common.css',
  '/common.js',
  '/notes.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Кэширование критических файлов');
      const cachePromises = urlsToCache.map(url => {
        return fetch(url)
          .then(response => {
            if (!response.ok) throw new Error(`Ошибка ${response.status} для ${url}`);
            return cache.put(url, response);
          })
          .catch(err => console.warn(`Не удалось закэшировать ${url}:`, err));
      });
      return Promise.allSettled(cachePromises);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('', { status: 404 });
      });
    })
  );
});

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