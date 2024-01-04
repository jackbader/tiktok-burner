<script>
import "assets/css/main.css";
export default {
  head: {
    title: "KellyBaderArt",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Creating colorful pieces to brighten your world",
      },
      { hid: "og:title", property: "og:title", content: "KellyBaderArt" },
      {
        hid: "og:description",
        property: "og:description",
        content: "Creating colorful pieces to brighten your world",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "	https://www.kellybaderart.com/imgs/portrait.png",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://kellybaderart.com",
      },
      // any other OG tags you want to add
    ],
  },
};
</script>

<template>
  <div>
    <Header />
    <UContainer>
      <slot />
    </UContainer>
  </div>
</template>
