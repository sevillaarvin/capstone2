<template>
  <v-layout>
    <v-flex xs12>
      <Sorter />
      <v-container
        fluid
        grid-list-md>
        <v-layout>
          <v-flex
            v-for="item in items"
            :key="item.name"
            xs12
            sm6
            md4
            lg3
            xl2>
            <Item :item="item" />
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
    data() {
      return {
        items: this.$store.getters.featuredItems.slice(0,3)
      }
    },
    layout: "store"
  }
</script>

<style>
</style>
