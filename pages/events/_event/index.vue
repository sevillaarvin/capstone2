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
          <v-layout>
            <v-flex>
              <v-card-title
                class="justify-center pb-0">
                EVENT TITLE
              </v-card-title>
              <v-subheader class="justify-center">
                December 1, 2018
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-img
                contain
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex class="pt-3">
              <v-card-text class="py-1">
                People are invited to the blah blah to be hold on December 1, 2018 at Blah Blah Plaza Hotel
              </v-card-text>
              <v-divider />
              <v-card-text class="py-1">
                Long ass description about the event blah blah
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-divider class="my-3" />
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex>
              <v-card-actions>
                <v-btn>
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
    }
  }
</script>

<style>
</style>

