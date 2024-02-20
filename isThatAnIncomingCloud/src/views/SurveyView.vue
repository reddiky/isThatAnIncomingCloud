<script lang="ts">
import WeatherSurvey from '@/components/WeatherSurvey.vue';

export default {
  components: { WeatherSurvey }
}
</script>

<template>
  <div class="home d-flex align-center justify-center">
    <WeatherSurvey  class="pa-2 ma-2"/>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>