<template>
  <UBreadcrumb class="mb-8" :links="links" />
  <div class="flex flex-col-reverse md:flex-row">
    <div class="md:w-1/2 w-full">
      <img
        v-if="entry"
        class="object-contain w-full max-h-[700px]"
        :src="entry.imageUrl"
        :alt="entry.title"
      />
    </div>

    <UContainer
      v-if="entry"
      class="md:w-1/2 w-full mb-8 text-center flex flex-col items-center"
    >
      <h1 class="text-4xl font-bold mb-2">{{ entry.title }}</h1>

      <div class="text-sm text-gray-500">
        <p class="">{{ entry.medium }}</p>
        <p class="mb-4">{{ entry.size }}</p>
      </div>

      <p v-if="entry.price" class="mb-4">
        ${{ formattedPrice }} (plus shipping)
      </p>

      <p class="text-sm max-w-xl">{{ entry.description }}</p>
    </UContainer>
  </div>
</template>

<script setup>
import axios from "axios";
const route = useRoute();

const space_id = "d5s99grcg5ef";
const access_token = "IZUu2t0zLR-AENZLJs8nBm3pAEkUX1Wn15qFAwHFJgM";
const id = route.params.id;

const formattedPrice = computed(() => {
  if (entry.value) {
    return new Intl.NumberFormat().format(entry.value.price);
  }
  return "";
});

const { data: entry } = useAsyncData(`entry:${route.params.id}`, async () => {
  const response = await axios.get(
    `https://cdn.contentful.com/spaces/${space_id}/environments/master/entries/${route.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const imageId = response.data.fields.image.sys.id;

  const imageResponse = await axios.get(
    `https://cdn.contentful.com/spaces/${space_id}/environments/master/assets/${imageId}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const imageUrl = imageResponse.data.fields.file.url;

  const entry = {
    title: response.data.fields.title,
    medium: response.data.fields.medium,
    size: response.data.fields.size,
    price: response.data.fields.price,
    description: response.data.fields.description,
    imageUrl: `https:${imageUrl}`,
  };

  return entry;
});

const links = computed(() => [
  {
    label: "Gallery",
    to: "/",
  },
  {
    label: entry?.value?.title,
  },
]);
</script>
