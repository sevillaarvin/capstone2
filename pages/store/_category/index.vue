<template>
  <v-layout
    class="min-height-scroll">
    <v-flex xs12>
      <v-container fluid>
        <Sorter
          :action="(sortObj) => { $store.dispatch('sortCurrentCategoryItems', sortObj) }"
          :items="items" />
        <SearchBar />
        <v-layout>
          <v-flex>
            <v-container
              fluid
              grid-list-xl>
              <v-layout
                v-scroll="onScroll"
                row
                wrap>
                <v-flex
                  v-for="item in items"
                  :key="item.id"
                  xs12
                  sm6
                  md4
                  xl3>
                  <Item :item="item" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import Sorter from "@/components/store/Sorter"
  import SearchBar from "@/components/store/SearchBar"
  import Item from "@/components/store/Item"

  export default {
    components: {
      Sorter,
      SearchBar,
      Item,
    },
    async asyncData(context) {
      let category

      try {
        category = context.route.params.category
        await context.store.dispatch("setCurrentCategoryItems", {
          name: category,
        })
      } catch (e) {
        context.error(e)
      }

      return {
        category,
        loading: false,
      }
    },
    computed: {
      search() {
        return this.$store.getters["store/searchTerm"]
      },
      items() {
        const categoryItems = this.$store.getters.currentCategoryItems
        const searchItems = this.$store.getters["store/searchItems"]
        return this.search ? searchItems : categoryItems
      }
    },
    methods: {
      async onScroll() {
        const nearEndOfPage = window.innerHeight
          + (window.pageYOffset || document.documentElement.scrollTop)
          >= document.body.offsetHeight * 0.90

        if (nearEndOfPage) {
          if (this.loading) {
            return
          }

          this.loading = true
          try {
            if (this.$store.getters["store/searchTerm"]) {
              await this.$store.dispatch("store/setSearchItems", {
                scroll: true,
                category: this.category,
              })
            } else {
              await this.$store.dispatch("setCurrentCategoryItems", {
                name: this.category,
                scroll: true,
              })
            }
          } catch (e) {
            console.log(e)
          }
          this.loading = false
        }
      }
    },
    layout: "store"
  }
</script>

<style scoped>
.min-height-scroll {
  min-height: 101vh;
}
</style>
