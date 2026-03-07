/* ====================================
   VOLLEYHUB SERVICE WORKER
   Offline + Fast Cache System
==================================== */

/* CACHE VERSION */

const CACHE_NAME = "volleyhub-cache-v2";


/* FILES TO CACHE */

const urlsToCache = [

"/",
"/index.html",
"/quick.html",
"/live.html",

"/css/live-score.css",
"/css/live-tv.css",

"/js/match.js",
"/js/live.js",

"/assets/images/live-score.png",
"/assets/images/tv-bg.png"

];


/* ===============================
   INSTALL SERVICE WORKER
================================ */

self.addEventListener("install", event => {

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache => {

console.log("VolleyHub cache installed");

return cache.addAll(urlsToCache);

})

);

});


/* ===============================
   ACTIVATE (CLEAN OLD CACHE)
================================ */

self.addEventListener("activate", event => {

event.waitUntil(

caches.keys().then(cacheNames => {

return Promise.all(

cacheNames.map(cache => {

if(cache !== CACHE_NAME){

console.log("Deleting old cache:", cache);

return caches.delete(cache);

}

})

);

})

);

});


/* ===============================
   FETCH REQUEST HANDLER
================================ */

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)
.then(cachedResponse => {

/* RETURN CACHE IF AVAILABLE */

if(cachedResponse){
return cachedResponse;
}

/* OTHERWISE FETCH FROM NETWORK */

return fetch(event.request)
.then(networkResponse => {

/* OPTIONAL: CACHE NEW FILES */

return caches.open(CACHE_NAME)
.then(cache => {

cache.put(event.request, networkResponse.clone());

return networkResponse;

});

})
.catch(() => {

/* OFFLINE FALLBACK */

if(event.request.destination === "document"){
return caches.match("/index.html");
}

});

})

);

});