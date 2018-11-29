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
                NEWS TITLE
              </v-card-title>
              <v-subheader class="justify-center">
                December 1, 2018
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <v-img
                contain
                class="left mx-2 mb-2"
                width="300"
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
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
