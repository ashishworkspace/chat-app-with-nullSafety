'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "404.html": "0a27a4163254fc8fce870c8cc3a3f94f",
"assets/AssetManifest.json": "f3c511c9578b93f5eeb5b84f0b67f4d0",
"assets/assets/fonts/CurlyCandyDemoRegular.ttf": "f53ede5b725434e6c338d99317b0c633",
"assets/assets/fonts/Itim-Regular.ttf": "4a3f2cf1ced5257b6af803f4b86bf427",
"assets/assets/fonts/LoveInstinctDemoRegular.ttf": "7987cb0ca6ff0ee34e630f527b507a17",
"assets/assets/fonts/MiniHonysa.ttf": "a0be6c0aea4001b933cf3693d22d1fcc",
"assets/assets/fonts/ShinyBalloonDemoRegular.ttf": "4b60c6978b7503da46bc5d85ca85a830",
"assets/assets/fonts/WoodBeadsDemoRegular.ttf": "36c07f677362723fcdfdb2797b4f96f7",
"assets/FontManifest.json": "9db8a85656fad5c97382a59a3818fe7b",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/images/1.gif": "4e06b41d8659f3e83e05deaf4ab92049",
"assets/images/10.gif": "99f210f9fce57bb789f76e433d6c8556",
"assets/images/11.gif": "a4eda73d5659425e8053ba0a69973f04",
"assets/images/12.gif": "5b90bc2fdd3d9c68532326ab275303fe",
"assets/images/13.gif": "db8a6ac5757c4cc4123b006cc715b5b7",
"assets/images/14.gif": "f7e59e36f2cd7469113bac687027d642",
"assets/images/15.gif": "f0bc4aa57854ec41e9c9c761f0b70167",
"assets/images/16.gif": "84837390a6147707cace535ba79df2b9",
"assets/images/17.gif": "d297dfe4dd655fe168357336d99dcd74",
"assets/images/18.gif": "aa38078a437e609414b594678baf6447",
"assets/images/19.gif": "52dabd5cdf4f39df298a9fbc1f4c883a",
"assets/images/2.gif": "4d1a5d3787bf6505954b66e6dc922b6f",
"assets/images/20.gif": "a2f08ed06692f39e63d3c37691fff2e8",
"assets/images/21.gif": "61d9bbd9d345c7532670d138ec319f61",
"assets/images/23.gif": "ad2472bab185b0bf6906b68f7028d327",
"assets/images/25.gif": "319bf21ed4593827f541b1159c8791b2",
"assets/images/26.gif": "d4bec8d10517a298c806b753f027fe5f",
"assets/images/27.gif": "e8629a5479129eee94f17cfca753a883",
"assets/images/28.gif": "7f9c7eb2219ea1e819ee0e309d79ee54",
"assets/images/29.gif": "0a9a640107a639c183f9c56bb4ddb941",
"assets/images/3.gif": "5c33b9888c93541a30c93652c05f7bff",
"assets/images/30.gif": "f676a8a8103b4f17f9d56e2da3ce91b8",
"assets/images/31.gif": "9a415a17eb306cf0bc03e0d4f0e20788",
"assets/images/32.gif": "f424d67b5420b7b7b0a4a64ef50281d2",
"assets/images/4.gif": "a5b39e7bb50198aa46764154a8605eb8",
"assets/images/5.gif": "3b9c8f4d22f7956ef90536c0dd5aa104",
"assets/images/6.gif": "1df2437845fe557bedb26bdfe94184bb",
"assets/images/7.gif": "1d62eb37481d9d2dd3d2c897e2a4e872",
"assets/images/8.gif": "e11ecac86509e09d1de74f7d4b173392",
"assets/images/9.gif": "231f8bd0bba9e8da2bd456fcf94d06df",
"assets/images/logo.png": "b47d265a6545020a12c7db2132f3fd63",
"assets/NOTICES": "4c182b580a88690a89e7f85bd6d7ed2d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "75e310fbe63ea70ac71129935ddce660",
"/": "75e310fbe63ea70ac71129935ddce660",
"main.dart.js": "212f0cc405ddd60cca861a2b4d70fd48",
"manifest.json": "8f115c512d88969b2673bd5c7a6e4814",
"style.css": "0c4b98e65e706790c4056f79d2873535",
"version.json": "1590d910838af7c23dee06dba113c0cf"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
