
if (typeof importScripts === 'function') {
  importScripts('./workbox/workbox-v4.3.1/workbox-sw.js')

  workbox.setConfig({ modulePathPrefix: './workbox/workbox-v4.3.1/' })

  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded')

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([])

    /* custom cache rules */
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^/]+\.[^/]+$/]
    })

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      new workbox.strategies.CacheFirst({
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
