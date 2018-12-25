<template>
  <v-layout>
    <v-flex xs12>
      <v-container fluid>
        <Sorter
          :items="featuredItems" />
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
                  v-for="feature in featuredItems"
                  :key="feature.id"
                  xs12
                  sm6
                  md4
                  xl3>
                  <Item :item="feature" />
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
      await context.store.dispatch("setFeaturedItems", {
        offset: 0,
        limit: 24,
        featured: true,
      })

      return {
        loading: false,
      }
    },
    computed: {
      featuredItems() {
        return this.$store.getters.featuredItems
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
            await this.$store.dispatch("setFeaturedItems", {
              offset: this.$store.getters.featuredOffset,
              limit: this.$store.getters.featuredLimit,
              featured: true,
            })
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
