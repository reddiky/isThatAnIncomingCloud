import { createPinia } from 'pinia'
import { defineStore } from 'pinia'

const pinia = createPinia()

export default pinia;

export const useLocationStore = defineStore('locations', {
  state: () => {
    return { 
      primaryLocation: null,
      secondaryLocation: null,
    }
  },
  actions: {
    defineLocation(location: any, num: number) {
      if (num == 1) {
        this.primaryLocation = location;
      } else {
        this.secondaryLocation = location;
      }
    },
  },
})

export const useWeatherStore = defineStore('weatherStore', {
  state: () => {
    return { 
      primaryWeather: null,
      secondaryWeather: null
    }
  },
  actions: {
    defineWeather(weather: any, num: number) {
      if (num == 1) {
        this.primaryWeather = weather;
      } else {
        this.secondaryWeather = weather;
      }
    },
  },
})