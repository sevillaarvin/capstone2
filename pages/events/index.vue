<template>
  <v-layout>
    <v-flex xs12>
      <v-container fluid>
        <Title :title="'Events'" />
        <v-layout
          v-for="test in 5"
          :key="test"
          class="mb-2">
          <v-flex>
            <v-card
              :to="'/events/' + test"
              dark
              nuxt>
              <v-container fluid>
                <v-layout>
                  <v-flex
                    xs9
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
                  </v-flex>
                  <v-flex
                    xs3
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
              </v-container>
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
