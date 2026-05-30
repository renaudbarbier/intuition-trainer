/* Minimal service worker: makes the app installable and works offline.
   App-shell requests are served cache-first then cached; cross-origin
   requests (Wikipedia image lookups) always go to the network. */
const CACHE = 'intuition-v1'
const SHELL = ['./', './index.html', './manifest.webmanifest']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  // Same-origin (the app shell): cache-first, then populate the cache.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request)
            .then((resp) => {
              const copy = resp.clone()
              caches.open(CACHE).then((c) => c.put(request, copy))
              return resp
            })
            .catch(() => caches.match('./index.html')),
      ),
    )
  }
  // Cross-origin (Wikipedia / image CDN): leave to the network by default.
})
