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
      <UButton
        color="red"
        @click="removeWord(wordIndex, segmentIndex)"
        class="ml-2"
      >
        <UIcon dynamic name="i-heroicons-trash" />
      </UButton>
      <UButton
        color="emerald"
        @click="addWord(wordIndex, segmentIndex)"
        class="ml-2"
      >
        <UIcon dynamic name="i-heroicons-plus" />
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

function addWord(wordIndex, segmentIndex) {
  const currentWord =
    state.transcription.segments[segmentIndex].words[wordIndex];

  // add new word after word index in segment, set start time as end time of this word
  state.transcription.segments[segmentIndex].words.splice(wordIndex + 1, 0, {
    text: "",
    start: currentWord.end,
    end: currentWord.end + 0.2,
    confidence: 1,
  });
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
</script>

<style scoped></style>
