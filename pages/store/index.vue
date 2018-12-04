<template>
  <v-layout>
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
    computed: {
      featuredItems() {
        return this.$store.getters.featuredItems
      }
    },
    created() {
      console.log( this.$store.getters.featuredItems[0] )
    },
    methods: {
      onScroll() {
        if (window.innerHeight + (window.pageYOffset || document.documentElement.scrollTop) >= document.body.offsetHeight) {
          
        }
      }
    },
    layout: "store",
  }
</script>

<style>
</style>
