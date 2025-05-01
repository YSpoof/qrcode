import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
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
        background_color: "#eef2fe",
        theme_color: "#0f182a",
        icons: [
          {
            src: "/pwa/maskable.png",
            sizes: "any",
            type: "image/png",
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
        enabled: true,
        type: "module",
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    outDir: "docs",
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
