<template>
  <v-layout>
    <v-flex xs12>
      <v-container
        fluid
        grid-list-md>
        <Title :title="'Facilities'" />
        <Facility
          v-for="(facility, i) in facilities"
          :key="facility.name"
          :facility="facility"
          :position="i % 2 == 0 ? 'left' : 'right'" />
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import Title from "~/components/TheTitle"
  import Facility from "~/components/Facility"
  export default {
    components: {
      Title,
      Facility
    },
    data() {
      return {
        facilities: [
          {
            name: "Lap Pool",
            shortDesc: "The lap pool features blah blah wtf wtf blah blah hahahahahaha.",
            img: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
            path: "/facilities/lappool"
          },
          {
            name: "Wave Pool",
            shortDesc: "The wave pool features blah blah wtf wtf blah blah hahahahahaha.",
            img: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
            path: "/facilities/wavepool"
          },
        ]
      }
    }
  }
</script>

<style>
</style>
