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

export const useSurveyStore = defineStore('surveyStore', {
  state: () => {
    return { 
      temp: null,
      description: null
    }
  },
  actions: {
    saveSurvey(temp: any, description: any) {
      this.temp = temp;
      this.description = description;
    },
  },
})