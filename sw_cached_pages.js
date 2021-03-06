// SW Installed -> Caching files -> SW Activated ->
// Register SW | Failed (inside index.js)

// SW Fetching -> Navigated to website -> SW Fetching ->
// -> SW registered -> SW installed -> SW caching files

const cacheName = 'v1';
const cacheAssets = [
  '/',
  'contacts',
  'main.js'
];

// Call install event
self.addEventListener('install', e => {
  console.log('::: service worker: installed');
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('::: service worker: caching files…');
        cache.addAll(cacheAssets);
      })
      .catch(err => console.log('::: service worker: fail'))
      .then( () => {
        self.skipWaiting();
      })
  );
});

// Call activate event
self.addEventListener('activate', e => {
  console.log('::: service worker: activated');
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('::: service worker: cleaning old cache');
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

// Call fetch event
self.addEventListener('fetch', e => {
  console.log('::: service worker: fetching');
  e.respondWith(
    fetch(e.request)
      .catch(() => caches.match(e.request))
  )
})
