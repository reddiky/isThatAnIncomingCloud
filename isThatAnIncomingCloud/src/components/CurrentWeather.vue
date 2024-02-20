<script lang="ts">
  import { useLocationStore } from '@/stores/index'
  import { mapState } from 'pinia'
  import gql from 'graphql-tag'
  import weatherInterpretationCodes from '../assets/interpretationCodes'
  import DisplayWeather from './DisplayWeather.vue'

  const findDate = val =>  {
    let find = new Date(parseInt(val)).toDateString()
    return find;
  } 

  export default {
    components: {
      DisplayWeather
    },
    props: ['num'],
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
      location() { return this.num == 1 ? this.primaryLocation : this.secondaryLocation},
    },
    methods: {
      iconImage(weatherCode) {
        let img = weatherInterpretationCodes[`${weatherCode}`].icon
        const path = new URL('@/assets/icons/', import.meta.url);
        return `${path}/${img}`
      }
    },
    apollo: {
      // Query with parameters
      weather: {
        // gql query
        query: gql`query Weather($lat:Float, $long: Float) {
          weather(lat: $lat, long: $long) {
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
        }`,
        variables () {
          return {
            lat: parseFloat(this.location.latitude),
            long: parseFloat(this.location.longitude)
          }
        },
        update (data) {
          this.skipQuery = true;
          this.dates = data.weather.forecast.map(t => {
            let newDate = findDate(t.time)
            return {...t, time: newDate}
          })
          return data.weather
        },
        skip () {
          return this.skipQuery
        },
      },
    },
  }
</script>

<template>
  <DisplayWeather :weather="weather" :location="location" />
</template>

