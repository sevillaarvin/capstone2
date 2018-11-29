<template>
  <v-layout>
    <v-flex xs12>
      <v-card :to="facility.path">
        <v-container fluid>
          <v-layout>
            <v-flex
              :order-xs2="position == 'right'"
              xs12
              sm10
              md8>
              <v-card-title>
                {{ facility.name }}
              </v-card-title>
              <v-card-text>
                {{ facility.shortDesc }}
              </v-card-text>
              <!--
              <v-spacer />
              <v-card-actions>
                <v-btn>
                  View
                </v-btn>
              </v-card-actions>
              -->
            </v-flex>
            <v-flex
              xs12
              sm2
              md4>
              <v-img
                :src="facility.img"
                contain />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      facility: {
        type: Object,
        required: true
      },
      position: {
        type: String,
        default: "left"
      }
    }
  }
</script>

<style>
</style>
