<template>
  <UContainer>
    <header>
      <nav class="flex justify-between items-center py-8">
        <ULink to="/" class="site-name text-2xl">KellyBaderArt</ULink>
        <button>
          <UIcon
            name="i-heroicons-bars-3"
            class="flex sm:hidden w-[40px] h-[40px] hover:cursor-pointer"
            @click="toggleMenu"
          />
        </button>
        <USlideover class="flex sm:hidden slideover" v-model="menuVisible">
          <div class="link-container">
            <ULink
              class="text-xl pb-4"
              @click="toggleMenu"
              to="/"
              active-class="text-primary"
              >Gallery</ULink
            >
            <ULink
              class="text-xl pb-4"
              @click="toggleMenu"
              to="/about"
              active-class="text-primary"
              >About</ULink
            >
            <ULink
              class="text-xl pb-4"
              @click="toggleMenu"
              to="/contact"
              active-class="text-primary"
              >Contact</ULink
            >
          </div>
        </USlideover>
        <div class="link-container hidden sm:flex">
          <ULink to="/" active-class="text-primary">Gallery</ULink>
          <ULink to="/about" active-class="text-primary">About</ULink>
          <ULink to="/contact" active-class="text-primary">Contact</ULink>
          <div class="flex pl-4">
            <a
              target="_blank"
              href="https://www.instagram.com/kellybaderart"
              class="icon-button-container"
            >
              <UIcon name="i-fa-brands-instagram" />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/p/Kelly-Bader-Art-100039086319756"
              class="icon-button-container"
            >
              <UIcon name="i-fa-brands-facebook-f" />
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
.text-primary {
  text-decoration: underline;
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
  margin: 0px 10px;
}

.slideover div:nth-child(2) {
  /* CSS properties for the second div inside .slideover */
  width: 80%;
  flex: none;
}

.i-heroicons-bars-3 {
  margin: 0px 10px;
}
</style>
