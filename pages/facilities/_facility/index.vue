<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-container>
          <v-layout>
            <v-flex>
              <v-card-title
                class="justify-center">
                <h1>Lap Pool</h1>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-layout
            row
            wrap>
            <v-flex
              xs12
              order-xs2
              sm4
              order-sm1
              md3>
              This is the description of the facility. It is 5 miles wide and 5 miles long. The blah blah in the blah blah blah blah blah.
            </v-flex>
            <v-flex
              xs12
              order-xs1
              sm7
              order-sm2
              md8>
              <v-container
                pt-0
                fluid
                grid-list-md>
                <v-layout
                  row
                  wrap>
                  <v-flex
                    v-for="i in 9"
                    :key="i"
                    xs12
                    sm6
                    md4>
                    <v-img
                      height="200"
                      src="https://unsplash.it/150/300?image=74" />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
  }
</script>

<style>
</style>
