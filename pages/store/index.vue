<template>
  <v-layout>
    <v-flex xs12>
      <v-container fluid>
        <Sorter
          :items="items" />
        <SearchBar />
        <v-layout>
          <v-flex
            xs12>
            <v-container
              fluid
              grid-list-xl
              class="pt-0">
              <v-layout
                v-scroll="onScroll"
                row
                wrap>
                <v-flex
                  v-if="items.length === 0"
                  xs12>
                  <div
                    class="text-xs-center red--text title">
                    No items for {{ search }} found
                  </div>
                </v-flex>
                <v-flex
                  v-for="item in items"
                  v-else
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
      return {
        loading: false,
      }
    },
    computed: {
      search() {
        return this.$store.getters["store/searchTerm"]
      },
      items() {
        const featuredItems = this.$store.getters.featuredItems
        const searchItems = this.$store.getters["store/searchItems"]
        return this.search ? searchItems : featuredItems
      },
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
              await this.$store.dispatch("store/setSearchItems", { scroll: true })
            } else {
              await this.$store.dispatch("setFeaturedItems")
            }
          } catch (e) {
            console.log(e)
          }
          this.loading = false
        }
      }
    },
    layout: "store",
  }
</script>

<style>
</style>
