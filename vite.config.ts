import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    solidPlugin(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,woff2,woff}"],
        runtimeCaching: [
          {
            // cache all images
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
            },
          },
        ],
      },
      manifest: {
        name: "QREncode",
        short_name: "QREncode",
        description: "Simples, rápido, gratuito e 100% local!",
        lang: "pt-BR",
        background_color: "#0f182a",
        theme_color: "#eef2fe",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
        screenshots: [
          {
            src: "pwa/narrow.png",
            type: "image/png",
            sizes: "720x1280",
            form_factor: "narrow",
          },
          {
            src: "pwa/wide.png",
            type: "image/png",
            sizes: "1280x720",
            form_factor: "wide",
          },
        ],
      },
      devOptions: {
        enabled: false,
        type: "module",
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
