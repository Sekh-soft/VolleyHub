const CACHE_NAME = "volleyhub-cache-v1";

const urlsToCache = [
"/",
"/index.html",
"/quick.html",
"/live.html",
"/css/live-score.css",
"/css/live-tv.css",
"/js/match.js",
"/js/live.js"
];

self.addEventListener("install", event => {

event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => cache.addAll(urlsToCache))
);

});

self.addEventListener("fetch", event => {

event.respondWith(
caches.match(event.request)
.then(response => response || fetch(event.request))
);

});