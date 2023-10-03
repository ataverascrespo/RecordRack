import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from 'vitest/config';
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Record Rack",
    short_name: "Record Rack",
    description: "Record Rack is an app that allows users to create and share a collection of their favourite Spotify 'records'.",
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/maskable_icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      }
    ],
    background_color: '#fdfaf5',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait'
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  test: {
    globals: true,
    environment: 'happy-dom'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})