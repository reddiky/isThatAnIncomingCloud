<script lang="ts">
import CurrentWeather from '../components/CurrentWeather.vue'

export default {
    components: {
      CurrentWeather
    },
    props: ['num'],
    data() {
      return {
        empty: false,
      }
    },
    methods: {
      goHome() {
        this.$router.push('/')
      }
    }
  }
</script>
<template>
  <div class="weather d-flex align-center justify-center ga-5">
    <CurrentWeather num="1" class="pa-2 ma-2" />
    <CurrentWeather num="2" class="pa-2 ma-2" />
    <v-btn
          class="ma-4 pa-4"
          color="primary"
          size="x-large"      
          @click="goHome"
        >
          Compare New Locations
    </v-btn>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .weather {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}</style>
