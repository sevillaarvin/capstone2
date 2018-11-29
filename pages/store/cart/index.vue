<template>
  <v-layout>
    <v-flex xs12>
      <v-container
        fluid
        grid-list-xl>
        <Title :title="'Your Cart'" />
        <v-layout>
          <v-flex
            v-for="item in items"
            :key="item.name">
            <Item :item="item" />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-btn
              block
              nuxt
              to="/store/checkout">
              Checkout
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import Item from "~/components/store/Item"
  import Title from "~/components/TheTitle"

  export default {
    components: {
      Item,
      Title,
    },
    data() {
      return {
        items: this.$store.getters.featuredItems.slice(0,3)
      }
    },
    layout: "store",
  }
</script>

<style>
</style>
