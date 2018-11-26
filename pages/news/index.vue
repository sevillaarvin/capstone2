<template>
  <v-layout>
    <v-flex xs12>
      <v-container fluid>
        <v-layout>
          <v-flex
            pb-3
            xs12>
            <h1
              class="display-2 text-xs-center">News</h1>
          </v-flex>
        </v-layout>
        <v-layout
          v-for="test in 5"
          :key="test"
          class="mb-2">
          <v-flex>
            <v-card
              :to="'/news/' + test"
              dark
              nuxt>
              <v-container fluid>
                <v-layout>
                  <v-flex
                    xs3
                    sm4
                    md5
                    lg6>
                    <v-img
                      contain
                      src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"/>
                  </v-flex>
                  <v-flex
                    xs9
                    sm8
                    md7
                    lg6>
                    <v-card-title>
                      This Is The Headline
                    </v-card-title>
                    <v-card-text>
                      The news is that nothing is true, everything is permitted. Here at blah blah, we have blah blah blah blah blah.
                    </v-card-text>
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
