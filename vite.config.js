import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Stroop Rush",
        short_name: "StroopRush",

        description:
          "Fast Brain Training Game",

        theme_color: "#4f46e5",

        icons: [
          {
            src: "icon-1.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-2.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});