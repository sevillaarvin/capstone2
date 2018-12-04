<template>
  <v-layout
    class="min-height-scroll">
    <v-flex xs12>
      <v-container fluid>
        <Sorter />
        <v-layout>
          <v-flex>
            <v-container
              fluid
              grid-list-md>
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
  import Item from "@/components/store/Item"

  export default {
    components: {
      Sorter,
      Item
    },
    async asyncData(context) {
      let category

      try {
        category = context.route.params.category
        await context.store.dispatch("setCurrentCategoryItems", {
          name: category,
          offset: context.store.getters.currentCategoryOffset,
          limit: 24
        })
      } catch (e) {
        context.error(e)
      }

      return {
        category
      }
    },
    computed: {
      items() {
        return this.$store.getters.currentCategoryItems
      }
    },
    methods: {
      async onScroll() {
        const endOfPage = window.innerHeight +
          (window.pageYOffset || document.documentElement.scrollTop) >=
          document.body.offsetHeight

        if (endOfPage) {
          console.log("initial", this.$store.getters.currentCategoryItems.length)
          try {
            await this.$store.dispatch("setCurrentCategoryItems", {
              name: this.category,
              offset: this.$store.getters.currentCategoryOffset,
              limit: this.$store.getters.currentCategoryLimit
            })
          } catch (e) {
            console.log(e)
          }
          console.log("final", this.$store.getters.currentCategoryItems.length)
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
