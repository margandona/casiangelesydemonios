self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('radio-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/styles.css',
                '/js/script.js',
                '/assets/images/bannerFA.jpeg'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
