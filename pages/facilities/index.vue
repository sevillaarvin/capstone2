<template>
  <v-layout>
    <v-flex
      xs12>
      <v-container>
        <v-layout>
          <v-flex
            xs12>
            <v-card>
              <Title :title="'Facilities'" />
              <v-layout>
                <v-flex
                  xs12>
                  <v-tabs
                    v-model="active"
                    centered>
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
                          <v-layout
                            row
                            wrap>
                            <v-flex
                              xs12
                              md6
                              lg5>
                              <v-img
                                :src="facility.images[0]"
                                class="cursor-pointer"
                                max-height="400"
                                aspect-ratio="1.7"
                                @click="openGallery(facility)" />
                              <v-dialog
                                v-model="dialog"
                                max-width="720"
                                @keydown.esc="dialog = false">
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
                                        v-for="img in currentFacility.images"
                                        :key="img"
                                        xs12
                                        md4>
                                        <v-img
                                          :src="img"
                                          height="250" />
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card>
                              </v-dialog>
                            </v-flex>
                            <v-flex
                              xs12
                              md6
                              lg7>
                              <v-card-title
                                primary-title
                                class="justify-center title">
                                {{ facility.name }}
                              </v-card-title>
                              <v-card-text
                                class="px-5">
                                {{ facility.description }}
                              </v-card-text>
                            </v-flex>
                          </v-layout>
                        </v-card>
                      </v-tab-item>
                    </template>
                  </v-tabs>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
    async asyncData({ store }) {
      return {
        active: "",
        currentFacility: {},
        dialog: false,
        facilities: store.getters.facilities
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
