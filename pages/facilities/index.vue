<template>
  <v-layout>
    <v-flex xs12>
      <Title :title="'Facilities'" />
      <v-layout>
        <v-flex
          xs12>
          <v-tabs
            v-model="active"
            fixed-tabs>
            <template
              v-for="facility in facilities">
              <v-tab
                :key="facility.name">
                {{ facility.name }}
              </v-tab>
              <v-tab-item
                :key="facility.name + '0'">
                <v-card
                  :class="{ 'pa-5': $vuetify.breakpoint.mdAndUp }">
                  <v-img
                    :src="facility.img"
                    class="cursor-pointer"
                    @click="openGallery(facility)" />
                  <v-dialog
                    v-model="dialog"
                    max-width="720">
                    <v-card>
                      <v-card-title
                        primary-title
                        class="justify-center title">
                        {{ currentFacility.name }}
                      </v-card-title>
                      <v-container
                        fluid
                        grid-list-md>
                        <v-layout
                          row
                          wrap>
                          <v-flex
                            v-for="n in 9"
                            :key="n"
                            xs12
                            md4>
                            <v-img
                              :src="currentFacility.img" />
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-dialog>
                  <v-card-title
                    primary-title
                    class="justify-center title">
                    {{ facility.name }}
                  </v-card-title>
                  <v-card-text
                    class="px-5">
                    {{ facility.shortDesc }}
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </template>
          </v-tabs>
        </v-flex>
      </v-layout>
      <!--
      <Facility
        v-for="(facility, i) in facilities"
        :key="facility.name"
        :facility="facility"
        :position="i % 2 == 0 ? 'left' : 'right'" />
      -->
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
        active: "",
        currentFacility: {},
        dialog: false,
        facilities: [
          {
            name: "Lap Pool",
            shortDesc: "The lap pool features blah blah wtf wtf blah blah hahahahahaha. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            img: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
            path: "/facilities/lappool"
          },
          {
            name: "Wave Pool",
            shortDesc: "The wave pool features blah blah wtf wtf blah blah hahahahahaha. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            img: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
            path: "/facilities/wavepool"
          },
          {
            name: "Recreational Pool",
            shortDesc: "Equipped with the blah blah, pool features blah blah wtf wtf blah blah hahahahahaha. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            img: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
            path: "/facilities/recreational"
          },
        ]
      }
    },
    methods: {
      openGallery(facility) {
        this.currentFacility = facility
        this.dialog = true
      }
    },
  }
</script>

<style
  scoped>
  .cursor-pointer {
    cursor: pointer;
  }
</style>
