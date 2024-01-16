// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  modules: [
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "nuxt-gtag",
    "@nuxtjs/color-mode",
  ],
  colorMode: {
    preference: "dark",
  },
  gtag: {
    id: "GTM-KPP8GM7P",
  },
  colorMode: {
    preference: "dark",
    classSuffix: "",
  },
  googleFonts: {
    families: {
      "Open Sans": true,
    },
  },
  ui: {
    icons: ["heroicons", "fa-brands"],
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/favicon-32x32.png" }],
    },
  },
});
