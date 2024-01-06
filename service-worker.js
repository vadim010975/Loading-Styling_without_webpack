self.addEventListener("install", (event) => {
  console.log("Установлен");

  event.waitUntil(
    caches.open("my-best-cache").then((cache) => {
      cache.addAll([
        "./",
        "./index.html",
        "./css/style.css",
        "./js/app.js",
        "./js/DownloadInterface.js",
        "./js/ItemEl.js",
        "./js/List.js",
      ]);
    })
  );
});

self.addEventListener("activate", () => {
  console.log("Активирован");
});

async function cachePriorityThenFetch(event) {
  const cacheResponse = await caches.match(event.request);

  if (cacheResponse) {
    return cacheResponse;
  }

  let response;

  try {
    response = await fetch(event.request);
  } catch (error) {
    return;
  }

  return response;
}

self.addEventListener("fetch", (event) => {
  console.log("Происходит запрос на сервер");
  event.respondWith(cachePriorityThenFetch(event));
});
