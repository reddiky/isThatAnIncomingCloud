<script lang="ts">
  import { useLocationStore, useWeatherStore } from '@/stores/index'
  import { mapState } from 'pinia'
  import gql from 'graphql-tag'
  import weatherInterpretationCodes from '../assets/interpretationCodes'

  const findDate = val =>  {
    console.log(val, 'findDate')
    let find = new Date(parseInt(val)).toDateString()
    console.log('find', find)
    return find;
  } 

  export default {
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
      },
      tempRange(min, max) {
        return [min, max]
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
<v-card 
    v-if="weather?.current"
    class="mx-auto current"
    max-width="512"
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

    <v-expand-transition>
      <div v-if="expand">
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
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn @click="expand = !expand">
        {{ !expand ? 'Show Forecast' : 'Hide Forecast' }}
      </v-btn>
    </v-card-actions>
  </v-card>
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
