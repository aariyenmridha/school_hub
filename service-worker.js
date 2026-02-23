self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("school-hub-cache").then(function(cache) {
      return cache.addAll([
        "index.html",
        "style.css",
        "script.js",
        "manifest.json"
      ]);
    })
  );
});