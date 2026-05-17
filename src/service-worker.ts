/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />
declare let self: ServiceWorkerGlobalScope;

import { files, version, prerendered, build } from "$service-worker";

const CACHE = `qr-${version}`;
const ASSETS = [...files, ...build, ...prerendered];

self.addEventListener("install", (event) => {
  async function addFilesToCache() {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);

    // Activate immediately
    await self.skipWaiting();
  }

  event.waitUntil(addFilesToCache());
});

self.addEventListener("activate", (event) => {
  async function activate() {
    // Remove previous cached data
    for (const key of await caches.keys()) {
      if (key !== CACHE) {
        await caches.delete(key);
      }
    }

    // Take control of all pages immediately
    await self.clients.claim();
  }

  event.waitUntil(activate());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // ignore non-GET requests
  if (req.method !== "GET" || !req.url.startsWith("http")) return;

  async function respond() {
    const url = new URL(req.url);
    const cache = await caches.open(CACHE);

    // Static assets
    if (ASSETS.includes(url.pathname)) {
      const response = await cache.match(url.pathname);

      if (response) {
        return response;
      }
    }

    try {
      const response = await fetch(req);

      if (!(response instanceof Response)) {
        throw new Error("invalid response from fetch");
      }

      if (response.status === 200 && !response.headers.get("cache-control")?.includes("no-store")) {
        cache.put(req, response.clone());
      }

      return response;
    } catch (err) {
      const response = await cache.match(req);

      if (response) {
        return response;
      }

      throw err;
    }
  }

  event.respondWith(respond());
});
