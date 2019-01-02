<template>
  <v-layout>
    <v-flex xs12>
      <v-container
        grid-list-xl
        class="pt-0">
        <Title
          :title="'Events'" />
        <v-layout
          row
          wrap>
          <v-flex
            v-for="event in events"
            :key="event.id"
            xs12
            class="mb-3">
            <v-card
              :to="`/events/${event.id}`"
              nuxt>
              <v-layout
                row
                wrap>
                <v-flex
                  xs12
                  sm8
                  md7>
                  <v-card-title>
                    What: {{ event.name }}
                  </v-card-title>
                  <v-card-text class="py-0">
                    When: {{ event.date | long-date }}
                  </v-card-text>
                  <v-card-text class="py-0">
                    Where: {{ event.address }}
                  </v-card-text>
                  <v-card-text>
                    {{ event.description }}
                  </v-card-text>
                </v-flex>
                <v-flex
                  xs12
                  sm4
                  md5>
                  <v-img
                    :src="event.cover"
                    contain
                    class="align-center">
                    <v-card-actions
                      class="justify-center">
                      <v-btn
                        round
                        class="primary black--text"
                        @click.prevent="register">
                        Register
                      </v-btn>
                    </v-card-actions>
                  </v-img>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import Title from "~/components/TheTitle"
  export default {
    components: {
      Title
    },
    async asyncData({ store }) {
      return {
        events: store.getters["activities/events"]
      }
    },
    methods: {
      register() {
        console.log("Registered!")
      }
    }
  }
</script>

<style>
</style>
