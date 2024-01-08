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
      <h2 class="text-lg text-center mt-4 flex items-center justify-center">
        <span
          :class="{
            'line-through': entry.sold,
            'red-line-through': entry.sold,
          }"
        >
          {{ entry.title }}
        </span>
        <span v-if="entry.sold" class="text-red-500 ml-2">SOLD</span>
        <span class="ml-2"> ></span>
      </h2>
    </NuxtLink>
  </div>
</template>

<script setup>
import axios from "axios";

const { data: entries } = await useAsyncData("entries", async () => {
  try {
    const space_id = "d5s99grcg5ef";
    const access_token = "IZUu2t0zLR-AENZLJs8nBm3pAEkUX1Wn15qFAwHFJgM";
    const response = await axios.get(
      `https://cdn.contentful.com/spaces/${space_id}/environments/master/entries?content_type=painting`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const listResponse = await axios.get(
      `https://cdn.contentful.com/spaces/${space_id}/environments/master/entries/3ev984nBy9TItMYYZBuz5F`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const priorityOrderedPaintings = listResponse.data.fields.paintings;

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
        sold: item.fields.sold,
      };
    });

    // Order entries by using the ids of priorityOrderedPaintings, if no matching id is found then the order doesnt matter, but if a matching id is found, use the order
    const orderedEntries = entries.sort((a, b) => {
      const aIndex = priorityOrderedPaintings.findIndex(
        (painting) => painting.sys.id === a.id
      );
      const bIndex = priorityOrderedPaintings.findIndex(
        (painting) => painting.sys.id === b.id
      );

      if (aIndex === -1 && bIndex === -1) {
        return 0;
      } else if (aIndex === -1) {
        return 1;
      } else if (bIndex === -1) {
        return -1;
      } else {
        return aIndex - bIndex;
      }
    });

    return orderedEntries;
  } catch (error) {
    console.log("error", error);
    return [];
  }
});

const links = [
  {
    label: "Gallery",
    to: "/",
  },
];
</script>

<style scoped>
.red-line-through {
  text-decoration-color: red;
}
.aspect-content {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background-color: antiquewhite;
}
.aspect-content > * {
  position: absolute;
  width: 100%;
}
</style>
