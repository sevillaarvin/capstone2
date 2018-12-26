<template>
  <v-layout>
    <v-flex xs12>
      <v-container
        grid-list-xl>
        <Title
          :title="'Events'" />
        <v-layout
          row
          wrap>
          <v-flex
            v-for="n in 5"
            :key="n"
            xs12
            class="mb-3">
            <v-card
              :to="'/events/' + test"
              nuxt>
              <v-layout
                row
                wrap>
                <v-flex
                  xs12
                  sm8
                  md7>
                  <v-card-title>
                    What: This is name of event
                  </v-card-title>
                  <v-card-text class="py-0">
                    When: 01 December 2018
                  </v-card-text>
                  <v-card-text class="py-0">
                    Where: Over there
                  </v-card-text>
                  <v-card-text class="py-0">
                    Why: Just Cause
                  </v-card-text>
                  <v-card-text>
                    This is a very long description about an event which will happen sometime to celebrate something happening somewhere.
                  </v-card-text>
                </v-flex>
                <v-flex
                  xs12
                  sm4
                  md5>
                  <v-img
                    contain
                    class="align-center"
                    src="https://cdn.vuetifyjs.com/images/cards/desert.jpg">
                    <v-card-actions
                      class="justify-center">
                      <v-btn
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
    methods: {
      register() {
        console.log("Registered!")
      }
    }
  }
</script>

<style>
</style>
