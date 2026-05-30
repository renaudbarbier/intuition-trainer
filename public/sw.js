/* Service worker: makes the app installable and keeps it up to date.

   - Navigation (the HTML page): NETWORK-FIRST, so a new deploy is picked up
     as soon as the phone is online (falls back to cache when offline).
   - Other same-origin assets are content-hashed by Vite, so CACHE-FIRST is
     safe (a new build produces new filenames).
   - Cross-origin requests (Wikipedia image lookups) go straight to the network. */
const CACHE = 'intuition-v3'
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
  if (url.origin !== self.location.origin) return // Wikipedia / image CDN: network.

  // The HTML document: network-first so updates land immediately when online.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((resp) => {
          const copy = resp.clone()
          caches.open(CACHE).then((c) => c.put('./index.html', copy))
          return resp
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('./index.html'))),
    )
    return
  }

  // Versioned assets: cache-first, then populate the cache.
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((resp) => {
          const copy = resp.clone()
          caches.open(CACHE).then((c) => c.put(request, copy))
          return resp
        }),
    ),
  )
})
