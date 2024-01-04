<script setup lang="ts">
import { reactive } from "vue";
import type { FormError, FormSubmitEvent } from "#ui/types";

const state = reactive({
  name: undefined,
  email: undefined,
  message: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Required" });
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.message) errors.push({ path: "message", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  // Handle form submission here
  console.log(event.data);
}
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" required />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="email" required />
    </UFormGroup>

    <UFormGroup label="Message" name="message">
      <UTextarea v-model="state.message" required />
    </UFormGroup>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>
