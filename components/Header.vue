<template>
  <UContainer class="mb-4 sm:mb-10">
    <header>
      <nav class="flex justify-between items-center py-8">
        <ULink to="/" class="site-name text-2xl">Caption Burn</ULink>
        <button class="md:hidden">
          <UIcon
            name="i-heroicons-bars-3"
            class="flex w-[40px] h-[40px] hover:cursor-pointer"
            @click="toggleMenu"
          />
        </button>
        <USlideover class="flex md:hidden slideover" v-model="menuVisible">
          <div class="link-container">
            <ULink
              class="text-xl"
              @click="toggleMenu"
              to="/"
              active-class="text-primary"
              >Home</ULink
            >
            <ULink
              class="text-xl"
              @click="toggleMenu"
              to="/about"
              active-class="text-primary"
              >About</ULink
            >
            <ULink
              class="text-xl"
              @click="toggleMenu"
              to="/contact"
              active-class="text-primary"
              >Contact</ULink
            >
          </div>
        </USlideover>
        <div class="text-md link-container hidden md:flex">
          <ULink class="header-link" to="/" active-class="active">Home</ULink>
          <ULink class="header-link" to="/about" active-class="active"
            >About</ULink
          >
          <ULink class="header-link" to="/contact" active-class="active"
            >Contact</ULink
          >

          <UButton
            :icon="
              isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
            "
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
          />
        </div>
      </nav>
    </header>
  </UContainer>
</template>

<script setup>
import { ref } from "vue";

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const menuVisible = ref(false);

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};
</script>

<style>
.active {
  border-bottom: 1px solid;
}

.header-link {
  padding: 0.1em 0;
}

.icon-button-container {
  align-items: center;
  justify-content: center;
  display: flex;
}

.slideover .link-container {
  /* CSS properties for the div inside .slideover */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.link-container a {
  margin: 10px 20px;
}

.slideover div:nth-child(2) {
  /* CSS properties for the second div inside .slideover */
  width: 80%;
  flex: none;
}
</style>
