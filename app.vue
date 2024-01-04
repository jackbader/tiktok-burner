<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

useHead({
  title: "My App",
  meta: [
    {
      name: "description",
      content: "Creating colorful pieces to brighten your world",
    },
    { name: "og:url", content: "https://kellybaderart.com" },
    { name: "og:title", content: "KellyBaderArt" },
    {
      name: "og:description",
      content: "Creating colorful pieces to brighten your world",
    },
    {
      name: "og:image",
      content: "https://www.kellybaderart.com/imgs/portrait.png",
    },
  ],
});
</script>

<template>
  <SpeedInsights />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
