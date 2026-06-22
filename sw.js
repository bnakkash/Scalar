/* Scalar service worker — offline support.
   HTML is network-first (so updates land when online); versioned assets
   (?v=) are cache-first. After one online load the app works fully offline. */
const CACHE = 'scalar-cache-v1';
const CORE = ['./scalar.html'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE).catch(() => {})));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isDoc = req.mode === 'navigate' || url.pathname.endsWith('.html');

  if (isDoc) {
    // Network-first: fresh HTML online, cached HTML offline.
    e.respondWith(
      fetch(req)
        .then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return r; })
        .catch(() => caches.match(req).then(m => m || caches.match('./scalar.html')))
    );
  } else {
    // Cache-first for assets (css/js/fonts); versioned via ?v= so updates are new URLs.
    e.respondWith(
      caches.match(req).then(m => m || fetch(req).then(r => {
        const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return r;
      }).catch(() => m))
    );
  }
});
