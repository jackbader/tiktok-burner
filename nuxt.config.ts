// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  modules: ["@nuxt/ui", "@nuxtjs/google-fonts"],
  colorMode: {
    preference: "light",
  },
  googleFonts: {
    families: {
      Poppins: true,
    },
  },
  ui: {
    icons: ["heroicons", "fa-brands"],
  },
});
