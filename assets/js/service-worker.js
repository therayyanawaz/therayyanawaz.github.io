// Cache name with version
const CACHE_NAME = 'rayyan-portfolio-v1';

// Assets to cache on install
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/css/dark.css',
  '/assets/css/responsive.css',
  '/assets/js/jquery.min.js',
  '/assets/js/jquery.easing.min.js',
  '/assets/js/jquery.waypoints.min.js',
  '/assets/js/jquery.counterup.min.js',
  '/assets/js/popper.min.js',
  '/assets/js/bootstrap.min.js',
  '/assets/js/isotope.pkgd.min.js',
  '/assets/js/infinite-scroll.min.js',
  '/assets/js/imagesloaded.pkgd.min.js',
  '/assets/js/slick.min.js',
  '/assets/js/contact.js',
  '/assets/js/validator.js',
  '/assets/js/wow.min.js',
  '/assets/js/morphext.min.js',
  '/assets/js/parallax.min.js',
  '/assets/js/jquery.magnific-popup.min.js',
  '/assets/js/custom.js',
  '/assets/images/favicon.png',
  '/manifest.json'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
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

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          }
        );
      })
  );
});

// Handle offline functionality
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 