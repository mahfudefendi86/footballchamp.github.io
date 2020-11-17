importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if(workbox){
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
      { url: "/" },
      { url: "/index.html",  revision: '2' },
      { url: "/manifest.json" , revision: '2' },
      { url: "/pages/beranda.html" , revision: '2' },
      { url: "/pages/jadwal-tanding.html" , revision: '2' },
      { url: "/pages/jadwal-tersimpan.html" , revision: '2' },
      { url: "/pages/klasemen.html" , revision: '2' },
      { url: "/pages/main-menu.html" , revision: '2' },
      { url: "/pages/tim.html" , revision: '2' },

      { url: "/js/apiHandler.js" , revision: '2' },
      { url: "/js/db_jadwal.js" , revision: '2' },
      { url: "/js/idb.js" , revision: '2' },
      { url: "/js/jadwal_tanding.js" , revision: '2' },
      { url: "/js/jadwal_tersimpan.js" , revision: '2' },
      { url: "/js/klasemen.js" , revision: '2' },
      { url: "/js/main.js" , revision: '2' },
      { url: "/js/materialize.min.js" , revision: '2' },
      { url: "/js/nav-menu.js" , revision: '2' },
      { url: "/js/sw-register.js" , revision: '2' },
      { url: "/js/tim.js" , revision: '2' },

      { url: "/images/G12-Football-icon.png" , revision: '2' },
      { url: "/images/icon-header.jpg" , revision: '2' },
      { url: "/images/favicon/android-icon-36x36.png" , revision: '2' },
      { url: "/images/favicon/android-icon-48x48.png" , revision: '2' },
      { url: "/images/favicon/android-icon-72x72.png" , revision: '2' },
      { url: "/images/favicon/android-icon-96x96.png" , revision: '2' },
      { url: "/images/favicon/android-icon-192x192.png" , revision: '2' },
      { url: "/images/favicon/android-icon-144x144.png" , revision: '2' },
      { url: "/images/favicon/apple-icon-57x57.png" , revision: '2' },
      { url: "/images/favicon/apple-icon-60x60.png" , revision: '2' },
      { url: "/images/favicon/apple-icon-72x72.png" , revision: '2' },
      { url: "/images/favicon/apple-icon-76x76.png" , revision: '2' },
      { url: "/images/favicon/apple-icon-114x114.png" , revision: '2' },
      { url: "/images/favicon/apple-icon-120x120.png" , revision: '2' },
      { url: "/images/favicon/apple-icon-144x144.png" , revision: '2' },
      { url: "/images/favicon/apple-icon-152x152.png" , revision: '2' },
      { url: "/images/favicon/apple-icon-180x180.png" , revision: '2' },
      { url: "/images/favicon/apple-icon-precomposed.png" , revision: '2' },
      { url: "/images/favicon/apple-icon.png" , revision: '2' },
      { url: "/images/favicon/favicon-16x16.png" , revision: '2' },
      { url: "/images/favicon/favicon-32x32.png" , revision: '2' },
      { url: "/images/favicon/favicon-96x96.png" , revision: '2' },
      { url: "/images/favicon/favicon.ico" , revision: '2' },
      { url: "/images/favicon/ms-icon-70x70.png" , revision: '2' },
      { url: "/images/favicon/ms-icon-144x144.png" , revision: '2' },
      { url: "/images/favicon/ms-icon-150x150.png" , revision: '2' },
      { url: "/images/favicon/ms-icon-310x310.png" , revision: '2' },

      { url: "/css/style.css" , revision: '2' },
      { url: "/css/materialize.min.css" , revision: '2' },
      { url: "/css/font/material-icons.woff2" , revision: '2' }
    ]);

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
            ]
        })
      );

    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        workbox.strategies.staleWhileRevalidate({
          cacheName: 'static-resources',
        })
    );

    workbox.routing.registerRoute(
    new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'pages'
      })
    );

}else{
  console.log(`Workbox gagal dimuat`);
}


self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'images/favicon/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
