// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  nitro: {
    vercel: {
      functions: {
        maxDuration: 300,
        memory: 1024,
      },
    },
  },
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
    id: "G-HCC0PVBDTW",
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
      script: [
        {
          hid: 'tawkto',
          innerHTML: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/65d555f79131ed19d96f2d38/1hn4lfjoe';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
          type: 'text/javascript',
        }
      ],
      link: [{ rel: "icon", type: "image/png", href: "/favicon-32x32.png" }],
    },
  },
});
