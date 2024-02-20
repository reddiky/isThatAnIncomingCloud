<script lang="ts">
import { useSurveyStore } from '@/stores/index'
import { mapActions } from 'pinia'

export default {
    props: ['num'],
    data() {
      return {
        advanceToWeather: false,
        temp: 65,
        description: [],
        genericDescription: [
          'cloudy',
          'rainy',
          'snowy',
          'dry',
          'sunny',
          'warm',
          'cold',
          'storming'
        ]
      }
    },
    computed: {
      color () {
        if (this.temp < 32) return 'purple'
        if (this.temp < 50) return 'blue'
        if (this.temp < 75) return 'green'
        if (this.temp < 90) return 'orange'
        return 'red'
      },
    },
    methods: {
      ...mapActions(useSurveyStore, ['saveSurvey']),
      submit() {
        this.saveSurvey(this.temp, this.description.toString());
        this.$router.push('/location');
      }
    }
  }
</script>

<template>
    <v-card
      class="mx-auto"
      max-width="512"
    >
      <v-card-title>What's your ideal weather?</v-card-title>
      <v-card-text>
        <v-form>
          <div class="text-caption">
            What words describe your favorite weather?
          </div>
          <v-combobox
            v-model="description"
            :items="genericDescription"
            multiple
          >
          </v-combobox>
          <div class="text-caption">
            Please select your ideal temperature in Fahrenheit:
          </div>
          <v-slider
            class="temperatureSlider"
            :color="color"
            v-model="temp"
            max="120"
            min="-30"
            thumb-label="always"
          ></v-slider>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue" @click="submit">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<style scoped>
.v-slider.v-input--horizontal { 
  padding-top: 30px;
}

</style>