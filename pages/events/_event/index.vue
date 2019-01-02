<template>
  <v-layout>
    <v-flex
      xs12
      sm8
      offset-sm2
      md6
      offset-md3>
      <v-card>
        <v-container>
          <v-layout
            row
            wrap>
            <v-flex
              xs12>
              <v-card-title
                primary-title
                class="headline justify-center text-xs-center">
                {{ event.name }}
              </v-card-title>
              <v-subheader class="justify-center">
                {{ event.date | long-date }}
              </v-subheader>
            </v-flex>
            <v-flex
              xs12>
              <v-img
                :src="event.cover"
                contain />
            </v-flex>
            <v-flex
              xs12
              class="pt-3">
              <v-card-text class="py-1">
                {{ event.description }}
              </v-card-text>
            </v-flex>
            <v-flex
              xs12>
              <v-divider class="my-3" />
            </v-flex>
            <v-flex
              xs12>
              <v-card-actions
                class="justify-center">
                <v-btn
                  round
                  large
                  class="primary black--text">
                  Register
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import Title from "~/components/TheTitle"
  
  export default {
    components: {
      Title
    },
    async asyncData({ store, route }) {
      return {
        event: store.getters["activities/events"]
          .find((event) => {
          return event.id == route.params.event
        })
      }
    },
  }
</script>

<style>
</style>
