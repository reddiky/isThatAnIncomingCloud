<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>


<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Is That An Incoming Cloud?">
      <RouterLink to='/'>
      <img alt="Is That An Incoming Cloud logo" class="logo" src="@/assets/nerd_cloud_emoji.png" width="125" height="125" />
      </RouterLink>
      <RouterLink to="/survey">About You</RouterLink>
      <RouterLink to="/weather">Your Weather</RouterLink>
      <RouterLink to="/comparison">Compare Locations</RouterLink>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <RouterView/>
    </v-main>
  </v-layout>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
