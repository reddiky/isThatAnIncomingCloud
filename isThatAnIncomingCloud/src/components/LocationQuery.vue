<script lang="ts">
  import { useLocationStore } from '@/stores/index'
  import { mapActions } from 'pinia'
  import gql from 'graphql-tag'


  export default {
    props: ['num'],
    data() {
      return {
        skipQuery: true,
        valid: false,
        locationName: '',
        location: {},
        locations: [],
        lat: null,
        long: null,
        displayLocation: false,
        locationNameRules: [
          (value: any) => {
            if (value) return true

            return 'location is required.'
          },
          (value: any) => {
            if (value?.length <= 15) return true

            return 'location must be less than 15 characters.'
          },
        ]
      }
    },
    apollo: {
      // Query with parameters
      locations: {
        // gql query
        query: gql`query location($name: String, $lat: Float, $long: Float) {
          location(name: $name, lat: $lat, long: $long) {
            name
            admin1
            admin2
            latitude
            longitude
          }
        }`,
        variables () {
          // Use vue reactive properties here
          return {
            name: this.locationName,
            lat: this.lat,
            long: this.long
          }
        },
        update (data) {
          this.skipQuery = true;
          return data.location
        },
        skip () {
          return this.skipQuery
        },
      },
    },
    methods:{
      ...mapActions(useLocationStore, ['defineLocation']),
      submitLocation() {
        this.skipQuery = false;
      },
      submitFinalLocation(location:any) {
        this.defineLocation(location, this.num)
        this.location = location;
        this.locations = [];
        this.displayLocation = true;
        // this.$router.push('/weather')
      }  
    }
  }
</script>

<template>

  <div>
    <v-card
      class="mx-auto"
      max-width="512"
      v-if="displayLocation === false"
    >
      <v-card-title>Please submit your location</v-card-title>
      <v-card-text>
        <v-form v-model="valid" class="location">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="locationName"
                  :rules="locationNameRules"
                  :counter="15"
                  label="Zip or County"
                  required
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="lat"
                  :counter="10"
                  label="Latitude"
                  hide-details
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="long"
                  label="Longitude"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue" @click="submitLocation">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mx-auto" max-width="300" v-if="locations.length > 0 && displayLocation === false" >
      <v-list>
        <v-list-subheader >Please select your specific location</v-list-subheader>

        <v-list-item
          v-for="(place, i) in locations"
          :key="i"
          :value="place"
          color="primary"
          rounded="xl"
          @click="submitFinalLocation(place)"
        >
          {{place.name}}, {{ place.admin2 }}{{place.admin1 && place.admin2 ? ',' : '' }} {{ place.admin1 }}
        </v-list-item>
        </v-list>
    </v-card>
    <v-card
      class="mx-auto"
      max-width="512"
      v-if="displayLocation"
    >
      <v-card-title>
        Location {{num}}: {{location.name}}, {{ location.admin2 }}{{location.admin1 && location.admin2 ? ',' : '' }} {{ location.admin1 }}
      </v-card-title>
      <v-card-actions>
        <v-btn
          variant="text"
          color="red"
          @click="displayLocation = false"
        >
          Change Location
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
  .location {
    min-width: 512px;
  }

</style>