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
                @click="changeSort(choice.value)">
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
        required: true
      }
    },
    data() {
      return {
        priceSort: null,
        popularitySort: null,
        ratingSort: null,
        sorts: [
          {
            type: "Price",
            choices: [
              {
                name: "Low to High",
                value: "priceAsc",
              },
              {
                name: "High to Low",
                value: "priceDesc",
              },
            ]
          },
          {
            type: "Popularity",
            choices: [
              {
                name: "Ascending",
                value: "popularityAsc",
              },
              {
                name: "Descending",
                value: "popularityDesc",
              },
            ]
          },
          {
            type: "Rating",
            choices: [
              {
                name: "Ascending",
                value: "ratingAsc",
              },
              {
                name: "Descending",
                value: "ratingDesc",
              },
            ]
          },
        ]
      }
    },
    methods: {
      changeSort(sort) {
        switch (sort) {
          case "priceAsc":
          case "priceDesc":
            if (this.priceSort === sort) {
              this.priceSort = null
            } else {
              this.priceSort = sort
            }

            if (this.priceSort === "priceAsc") {
              this.items.sort((a, b) => {
                return a.price - b.price
              })
            } else {
              this.items.sort((a, b) => {
                return b.price - a.price
              })
            }
            break
          // TODO: Determine popular products
          case "popularityAsc":
          case "popularityDesc":
            if (this.popularitySort === sort) {
              this.popularitySort = null
            } else {
              this.popularitySort = sort
            }

            if (this.popularitySort === "popularityAsc") {
              this.items.sort((a, b) => {
                return a.price * a.rating - b.price * b.rating
              })
            } else {
              this.items.sort((a, b) => {
                return b.price * a.rating - a.price * b.rating
              })
            }
            break
          case "ratingAsc":
          case "ratingDesc":
            if (this.ratingSort === sort) {
              this.ratingSort = null
            } else {
              this.ratingSort = sort
            }

            if (this.ratingSort === "ratingAsc") {
              this.items.sort((a, b) => {
                return a.rating - b.rating
              })
            } else {
              this.items.sort((a, b) => {
                return b.rating - a.rating
              })
            }
            break
          default:
            throw new Error("Invalid sort value.")
        }

        if (!(this.priceSort || this.popularitySort || this.ratingSort)) {
          this.items.sort((a, b) => {
            return a.id - b.id
          })
        }

      }
    },
  }
</script>

<style>
</style>
