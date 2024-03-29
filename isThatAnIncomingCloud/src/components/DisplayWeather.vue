<script lang="ts">
  import { useLocationStore } from '@/stores/index'
  import { mapState } from 'pinia'
  import weatherInterpretationCodes from '../assets/interpretationCodes'

  export default {
    props: ['weather', 'location'],
    data() {
      return {
        skipQuery: false,
        dates: [],
        codes: weatherInterpretationCodes,
        expand: false,
      }
    },
    computed: {
      ...mapState(useLocationStore, ['primaryLocation', 'secondaryLocation']),
    },
    methods: {
      iconImage(weatherCode) {
        let img = weatherInterpretationCodes[`${weatherCode}`].icon
        const path = new URL(`../assets/icons/${img}`, import.meta.url).href;
        return `${path}`
      }
    },
  }
</script>

<template>
<v-card 
    v-if="weather?.current"
    class="mx-auto displayWeather"
    min-width="400"
  >
    <v-card-item :title="`${location.name}, ${ location.admin2 }${location.admin1 && location.admin2 ? ',' : '' } ${ location.admin1 }`" >
      <template v-slot:subtitle>
        {{ weather?.current?.weatherDescription }}
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col
          class="text-h6"
          cols="4"
        >
        {{ Math.floor(weather?.current?.temperature) }}&deg;F
        </v-col>

        <v-col cols="8" class="text-right">
          <img class="logo" :name="weather?.current?.weatherDescription" :src="iconImage(weather?.current?.weatherCode)" />
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex">
      <v-list-item
        class="no-border"
        density="compact"
      >
        <v-list-item-subtitle>wind speed {{ Math.floor(weather?.current?.windSpeed) }} mph</v-list-item-subtitle>
      </v-list-item>

      <v-list-item
        class="no-border"
        density="compact"
      >
        <v-list-item-subtitle>{{ Math.round(weather?.current?.precipitation * 100) / 100 }} inches of precipitation</v-list-item-subtitle>
      </v-list-item>
    </div>
    <v-list class="bg-transparent">
      <v-list-item
        v-for="item in weather?.forecast"
        :key="item?.time"
        :title="new Date(parseInt(item?.time)).toDateString()"
        :subtitle="`${Math.floor(item?.minTemp)}&deg;F / ${Math.floor(item?.maxTemp)}&deg;F`"
        :prependAvatar="iconImage(item?.weatherCode)" 
      >
        <v-row align="center" no-gutters>
          {{item.weatherDescription}} with a {{ Math.floor(item?.precipitationChance) }}% chance of {{ (Math.round(item?.precipitationSum * 100) / 100) > 0 ? `${Math.round(item?.precipitationSum * 100) / 100 } inches of precipitation` :'precipitation'   }}
        </v-row>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped>
.current {
  min-width: 400px;
}

.v-list-item {
  border-top: 1px solid gray
}

.no-border {
  border: 0px;
}

@media (min-width: 800px) {
  .displayWeather {
    overflow:scroll;
  }
}
</style>
