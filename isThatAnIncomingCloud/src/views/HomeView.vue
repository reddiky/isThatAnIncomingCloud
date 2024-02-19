<script lang="ts">
import LocationQuery from '../components/LocationQuery.vue'
import { useLocationStore } from '@/stores/index'
import { mapState } from 'pinia'

export default {
    components: {
      LocationQuery
    },
    props: ['num'],
    data() {
      return {
        advanceToWeather: false,
      }
    },
    computed: {
      ...mapState(useLocationStore, ['primaryLocation', 'secondaryLocation']),
    },
    methods: {
      compareWeather() {
        this.$router.push('/weather')
      }
    }
  }
</script>

<template>
  <div class="home d-flex align-center justify-center">
        <LocationQuery num="1" class="pa-2 ma-2"/>
        <LocationQuery num="2" class="pa-2 ma-2"/>
        <v-btn
          class="ma-4 pa-4"
          color="primary"
          size="x-large"      
          @click="compareWeather"
          :active="primaryLocation != null && secondaryLocation != null"
        >
          Compare Locations
        </v-btn>
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