<template>
  <v-layout>
    <v-flex xs12>
      <v-container fluid>
        <v-layout>
          <v-flex
            pb-3
            xs12>
            <h1
              class="display-2 text-xs-center">Events</h1>
          </v-flex>
        </v-layout>
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
                    md7
                    lg6>
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
                    md5
                    lg6>
                    <v-img
                      contain
                      src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"/>
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
</script>

<style>
</style>
