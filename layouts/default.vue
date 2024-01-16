<script setup>
import "assets/css/main.css";
import { SpeedInsights } from "@vercel/speed-insights/vue";

useHead({
  head: {
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
      // any other OG tags you want to add
    ],
  },
});
</script>

<template>
  <SpeedInsights />
  <div>
    <Header />
    <UContainer>
      <slot />
    </UContainer>
  </div>
</template>
