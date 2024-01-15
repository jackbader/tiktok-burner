<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4 w-full mb-10"
    @submit="onSubmit"
  >
    <UFormGroup label="TikTok URL" name="url">
      <UInput v-model="state.url" type="url" required />
    </UFormGroup>

    <UButton :loading="state.uploadingVideo" type="submit">Submit</UButton>
  </UForm>

  <!-- <UAlert
    v-if="state.tiktokSent"
    :close-button="{
      icon: 'i-heroicons-x-mark-20-solid',
      color: 'white',
      variant: 'link',
      padded: false,
    }"
    color="primary"
    title="Email Sent!"
    @close="hideAlert"
  /> -->

  <video class="max-h-64" v-if="state.videoUrl" controls>
    <source :src="state.videoUrl" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <UButton
    :loading="state.gettingTranscription"
    class="mt-4 mb-4"
    @click="transcribeVideo"
    v-if="state.videoUrl"
  >
    Transcribe</UButton
  >

  <div
    v-if="state.transcription"
    v-for="(segment, segmentIndex) in state.transcription.segments"
    :key="index"
  >
    <h3 class="font-bold mb-2">Segment {{ segmentIndex + 1 }}</h3>

    <!-- Loop over each word in the segment -->
    <div
      class="flex items-center"
      v-for="(word, wordIndex) in segment.words"
      :key="wordIndex"
    >
      <UInput v-model="word.text" class="mr-2 mb-1" />
      <div class="flex items-center">
        <p>Start time:</p>
        <UInput type="number" v-model="word.start" class="mr-2 mb-1 ml-2" />
      </div>
      <div class="flex items-center">
        <p>End time:</p>
        <UInput type="number" v-model="word.end" class="mr-2 mb-1 ml-2" />
      </div>
      <UButton @click="removeWord(wordIndex, segmentIndex)" class="ml-2">
        <UIcon dynamic name="i-heroicons-trash" />
      </UButton>
    </div>
  </div>

  <div>
    <UButton
      :loading="state.gettingBurntVideo"
      class="mt-4 mb-4"
      @click="burnVideo"
      v-if="state.transcription"
    >
      Burn Captions</UButton
    >
  </div>

  <video class="max-h-64" v-if="state.burntVideo" controls>
    <source :src="state.burntVideo" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</template>

<script setup>
// TODO: set new color scheme using mediumaquamarine color
import { reactive } from "vue";

const state = reactive({
  url: null,
  videoUrl: null,
  uploadingVideo: false,
  gettingTranscription: false,
  gettingBurntVideo: false,
  transcription: null,
});

function removeWord(wordIndex, segmentIndex) {
  // remove word from segment
  state.transcription.segments[segmentIndex].words.splice(wordIndex, 1);
}

async function onSubmit(event) {
  // Handle form submission here
  console.log("event data on submit tiktok url", event.data);
  state.uploadingVideo = true;

  // make a post request with the url
  let response;
  try {
    response = await fetch("/api/tiktok-upload", {
      method: "POST",
      body: JSON.stringify({
        url: event.data.url,
      }),
    });
    console.log("got response from tiktok upload", response);
  } catch (e) {
    console.log("e", e);
    // TOOD: show error
    state.uploadingVideo = false;
    return;
  }

  const json = await response.json();
  console.log("json", json);
  console.log("new video.url", json.url);

  // display the video url
  state.videoUrl = json.url;
  state.uploadingVideo = false;
}

async function transcribeVideo() {
  console.log("transcribe yo");
  state.gettingTranscription = true;
  // make a post request with the url
  let response;
  try {
    response = await fetch("/api/tiktok-transcribe", {
      method: "POST",
      body: JSON.stringify({
        url: state.videoUrl,
      }),
    });
  } catch (e) {
    console.log("e", e);
    // TOOD: show error
    state.gettingTranscription = false;
    return;
  }

  console.log("resposne", response);
  const json = await response.json();
  console.log("json", json);
  const transcription = JSON.parse(json.transcription);

  state.gettingTranscription = false;
  state.transcription = transcription;
  console.log("transcription dog", transcription);
}

async function burnVideo() {
  state.gettingBurntVideo = true;

  // make a post request with the url
  let response;
  console.log("sending data", state.videoUrl, state.transcription);
  try {
    response = await fetch("/api/burn-captions", {
      method: "POST",
      body: JSON.stringify({
        videoUrl: state.videoUrl,
        transcription: state.transcription,
      }),
    });
  } catch (e) {
    console.log("e", e);
    // TOOD: show error
    state.gettingBurntVideo = false;
    return;
  }

  console.log("resposne", response);
  const json = await response.json();
  console.log("json burn video", json);
  console.log("video", json.videoUrl);

  const video = json.videoUrl;

  state.gettingBurntVideo = false;
  state.burntVideo = video;
}

// function hideAlert() {
//   // close alert
//   state.tiktokSent = false;
// }

// const { data: entries } = await useAsyncData("entries", async () => {
//   try {
//     const space_id = "d5s99grcg5ef";
//     const access_token = "IZUu2t0zLR-AENZLJs8nBm3pAEkUX1Wn15qFAwHFJgM";
//     const response = await axios.get(
//       `https://cdn.contentful.com/spaces/${space_id}/environments/master/entries?content_type=painting`,
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const listResponse = await axios.get(
//       `https://cdn.contentful.com/spaces/${space_id}/environments/master/entries/3ev984nBy9TItMYYZBuz5F`,
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const priorityOrderedPaintings = listResponse.data.fields.paintings;

//     // Reformat the data

//     const entries = response.data.items.map((item) => {
//       const imageId = item.fields.image.sys.id;
//       const image = response.data.includes.Asset.find(
//         (asset) => asset.sys.id === imageId
//       );
//       const imageUrl = image ? image.fields.file.url : "";

//       return {
//         title: item.fields.title,
//         description: item.fields.description,
//         imageUrl: `https:${imageUrl}`,
//         id: item.sys.id,
//         sold: item.fields.sold,
//       };
//     });

//     // Order entries by using the ids of priorityOrderedPaintings, if no matching id is found then the order doesnt matter, but if a matching id is found, use the order
//     const orderedEntries = entries.sort((a, b) => {
//       const aIndex = priorityOrderedPaintings.findIndex(
//         (painting) => painting.sys.id === a.id
//       );
//       const bIndex = priorityOrderedPaintings.findIndex(
//         (painting) => painting.sys.id === b.id
//       );

//       if (aIndex === -1 && bIndex === -1) {
//         return 0;
//       } else if (aIndex === -1) {
//         return 1;
//       } else if (bIndex === -1) {
//         return -1;
//       } else {
//         return aIndex - bIndex;
//       }
//     });

//     return orderedEntries;
//   } catch (error) {
//     console.log("error", error);
//     return [];
//   }
// });

// const links = [
//   {
//     label: "Gallery",
//     to: "/",
//   },
// ];
</script>

<style scoped></style>
