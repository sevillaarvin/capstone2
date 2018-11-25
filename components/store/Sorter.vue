<template>
  <v-layout>
    <v-flex xs12>
      <v-toolbar
        class="transparent"
        flat>
        <v-spacer />
        <v-toolbar-items
          v-for="sort in sorts"
          :key="sort.type">
          <v-menu
            nudge-bottom="56">
            <v-btn
              slot="activator"
              flat>
              {{ sort.type }}
            </v-btn>
            <v-list>
              <v-list-tile
                v-for="choice in sort.choices"
                :key="choice.name"
                @click="choice.onchoice">
                <v-list-tile-content>
                  {{ choice.name }}
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-divider
            inset
            vertical />
        </v-toolbar-items>
        <v-spacer />
      </v-toolbar>
      <v-divider />
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        sorts: [
          {
            type: "Price",
            choices: [
              {
                name: "Low to High",
                onchoice(e) {
                  console.log(e)
                }
              },
              {
                name: "High to Low",
                onchoice(e) {
                  console.log(e)
                }
              },
            ]
          },
          {
            type: "Popularity",
            choices: [
              {
                name: "Ascending",
                onchoice(e) {
                  console.log(e)
                }
              },
              {
                name: "Descending",
                onchoice(e) {
                  console.log(e)
                }
              },
            ]
          },
          {
            type: "Rating",
            choices: [
              {
                name: "Ascending",
                onchoice(e) {
                  console.log(e)
                }
              },
              {
                name: "Descending",
                onchoice(e) {
                  console.log(e)
                }
              },
            ]
          },
        ]
      }
    }
  }
</script>

<style>
</style>
