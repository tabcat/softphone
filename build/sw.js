
'use strict'
if (typeof window.importScripts === 'function') {
  window.importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  )

  /* global workbox */
  if (window.workbox) {
    console.log('Workbox is loaded')

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([
  {
    "url": "logo192.png",
    "revision": "5837eb931a05ca22d489afca25304258"
  },
  {
    "url": "logo512.png",
    "revision": "c73268fa904641c7554b263a4852042f"
  }
])

    /* custom cache rules */
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^/]+\.[^/]+$/]
    })

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    )
  } else {
    console.log('Workbox could not be loaded. No Offline support')
  }
}
