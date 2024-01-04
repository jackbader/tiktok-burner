<template>
  <UContainer class="mb-4 sm:mb-10">
    <header>
      <nav class="flex justify-between items-center py-8">
        <ULink to="/" class="site-name text-2xl">Kelly Bader Art</ULink>
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
              >Gallery</ULink
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
          <ULink class="header-link" to="/" active-class="active"
            >Gallery</ULink
          >
          <ULink class="header-link" to="/about" active-class="active"
            >About</ULink
          >
          <ULink class="header-link" to="/contact" active-class="active"
            >Contact</ULink
          >
          <div class="flex pl-4">
            <a
              target="_blank"
              href="https://www.instagram.com/kellybaderart"
              class="icon-button-container"
            >
              <UIcon dynamic name="i-fa-brands-instagram" />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/p/Kelly-Bader-Art-100039086319756"
              class="icon-button-container"
            >
              <UIcon dynamic name="i-fa-brands-facebook-f" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  </UContainer>
</template>

<script>
export default {
  data() {
    return {
      menuVisible: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
  },
};
</script>

<style>
.active {
  border-bottom: 1px solid black;
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
