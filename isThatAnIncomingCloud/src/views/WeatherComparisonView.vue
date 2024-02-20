<script lang="ts">
  import { useLocationStore, useSurveyStore } from '@/stores/index'
  import { mapState } from 'pinia'
  import gql from 'graphql-tag'
  import DisplayWeather from '@/components/DisplayWeather.vue'

  export default {
    components: {
      DisplayWeather
    },
    data() {
      return {
        comparison: null,
      }
    },
    computed: {
      ...mapState(useLocationStore, ['primaryLocation', 'secondaryLocation']),
      ...mapState(useSurveyStore, ['temp', 'description']),
    },
    apollo: {
      // Query with parameters
      comparison: {
        // gql query
        query: gql`query comparison($loc1: GeoInput, $loc2: GeoInput, $survey: SurveyInput) {
          comparison(loc1: $loc1, loc2: $loc2, survey: $survey) {
            weather1 {
              current {
                time
                temperature
                precipitation
                rain
                showers
                snowfall
                weatherCode
                weatherDescription
                cloudCover
                windSpeed
                windGusts
              }
              forecast {
                time
                weatherCode
                weatherDescription
                maxTemp
                minTemp
                precipitationSum
                precipitationLength
                precipitationChance
                windSpeed
                windGusts
              }
            }
            weather2 {
              current {
                time
                temperature
                precipitation
                rain
                showers
                snowfall
                weatherCode
                weatherDescription
                cloudCover
                windSpeed
                windGusts
              }
              forecast {
                time
                weatherCode
                weatherDescription
                maxTemp
                minTemp
                precipitationSum
                precipitationLength
                precipitationChance
                windSpeed
                windGusts
              }
            }
            prediction
          }
        }`,
        variables () {
          return {
            "loc1": { 
              "name": this.primaryLocation.name,
              "lat": parseFloat(this.primaryLocation.latitude),
              "long": parseFloat(this.primaryLocation.longitude)
            },
            "loc2": {
              "name": this.secondaryLocation.name,
              "lat": parseFloat(this.secondaryLocation.latitude),
              "long": parseFloat(this.secondaryLocation.longitude)
            },
            "survey": {
              "temp": Math.round(this.temp * 100) / 100,
              "description": this.description
            }
          }
        },
      },
    },
  }
</script>

<template>
  <div class="d-flex justify-space-between mb-6">
    <v-skeleton-loader class='ma-2 pa-2' type="card" v-if="comparison === null"></v-skeleton-loader>
    <DisplayWeather  class='ma-2 pa-2' v-if="comparison !== null" :weather="comparison?.weather1" :location="primaryLocation" />
    <v-card class="bg-surface-variant">
      <v-card-title>
        Cloudy, your virtual travel assistant recommends: 
      </v-card-title>
      <v-card-text>
        {{ comparison === null ? 'Outside looking at the weather, one moment please' : comparison.prediction}}
      </v-card-text>
    </v-card>
    <v-skeleton-loader type="card" class='ma-2 pa-2' v-if="comparison === null"></v-skeleton-loader>
    <DisplayWeather  v-if="comparison !== null" :weather="comparison?.weather2" :location="secondaryLocation" />
  </div>

</template>

<style scoped>
.current {
  min-width: 512px;
}

.v-list-item {
  border-top: 1px solid gray
}

.no-border {
  border: 0px;
}
</style>
