<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    <NuxtLink
      :to="`/entries/${entry.id}`"
      v-for="entry in entries"
      :key="entry.title"
      class="hover:opacity-75 mb-6"
    >
      <div class="aspect-content">
        <img
          :src="entry.imageUrl"
          :alt="entry.title"
          class="w-full h-full object-contain"
        />
      </div>
      <h2 class="text-lg text-center mt-4">{{ entry.title }}</h2>
    </NuxtLink>
  </div>
</template>

<script setup>
import axios from "axios";

const { data: entries } = await useAsyncData("entries", async () => {
  const space_id = "d5s99grcg5ef";
  const access_token = "IZUu2t0zLR-AENZLJs8nBm3pAEkUX1Wn15qFAwHFJgM";
  const response = await axios.get(
    `https://cdn.contentful.com/spaces/${space_id}/environments/master/entries`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Reformat the data
  const entries = response.data.items.map((item) => {
    const imageId = item.fields.image.sys.id;
    const image = response.data.includes.Asset.find(
      (asset) => asset.sys.id === imageId
    );
    const imageUrl = image ? image.fields.file.url : "";

    return {
      title: item.fields.title,
      description: item.fields.description,
      imageUrl: `https:${imageUrl}`,
      id: item.sys.id,
    };
  });

  return entries;
});

const links = [
  {
    label: "Gallery",
    to: "/",
  },
];
</script>

<style scoped>
.aspect-content {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}
.aspect-content > * {
  position: absolute;
  width: 100%;
}
</style>
