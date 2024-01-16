<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

useHead({
  title: "Caption Burner",
  meta: [
    {
      name: "description",
      content: "Caption Burner",
    },
    { name: "og:url", content: "https://captionburn.com" },
    { name: "og:title", content: "Caption Burn" },
    {
      name: "og:description",
      content: "Caption Burn",
    },
    {
      name: "og:image",
      content: "https://www.captionburn.com/imgs/banner.png",
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
