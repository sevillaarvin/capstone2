<template>
  <v-layout>
    <v-flex
      xs12>
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
                @click="changeSort({ sortBy: sort.sortBy, descending: choice.descending })">
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
      <v-divider
        class="py-3"/>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
      action: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        currentSort: "",
        currentDescending: null,
        sorts: [
          {
            type: "Price",
            sortBy: "price",
            choices: [
              {
                name: "High to Low",
                descending: true,
              },
              {
                name: "Low to High",
                descending: false,
              },
            ]
          },
          {
            type: "Popularity",
            sortBy: "popularity",
            choices: [
              {
                name: "Most Popular",
                descending: true,
              },
              {
                name: "Least Popular",
                descending: false,
              },
            ]
          },
          {
            type: "Rating",
            sortBy: "rating",
            choices: [
              {
                name: "Highest Rated",
                descending: true,
              },
              {
                name: "Lowest Rated",
                descending: false,
              },
            ]
          },
        ]
      }
    },
    methods: {
      changeSort({ sortBy, descending }) {
        if (this.currentSort === sortBy && this.currentDescending === descending) {
          sortBy = null
        }

        this.action({ sortBy, descending })

        this.currentSort = sortBy
        this.currentDescending = descending
      }
    },
  }
</script>

<style>
</style>
