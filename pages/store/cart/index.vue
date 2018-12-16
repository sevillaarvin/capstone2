<template>
  <v-layout>
    <v-flex xs12>
      <v-container
        fluid
        grid-list-xl>
        <Title :title="'Your Cart'" />
        <v-layout
          row
          wrap>
          <v-flex
            v-for="item in items"
            :key="item.id"
            xs12>
            <CartItem
              :item="item"
              @update="onUpdate"
              @remove="onRemove" />
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
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      top>
      {{ snackbarResult }}
    </v-snackbar>
  </v-layout>
</template>

<script>
  import Title from "~/components/TheTitle"
  import CartItem from "~/components/store/CartItem"

  export default {
    components: {
      CartItem,
      Title,
    },
    async asyncData(context) {
      /*
      try {
        await context.store.dispatch("setUserCart")
        console.log(context.app.$auth.$state)
      } catch (e) {
        console.log(e.message)
      }
      */
      return {
        snackbar: false,
        snackbarColor: "",
        snackbarResult: "",
      }
    },
    computed: {
      items() {
        if (this.$store.getters.userCart) {
          return this.$store.getters.userCart.items
        } else {
          return []
        }
      }
    },
    methods: {
      onUpdate(success) {
        if (success) {
          this.snackbarResult = "Item updated successfully"
          this.snackbarColor = "success"
        } else {
          this.snackbarResult = "Something went wrong"
          this.snackbarColor = "error"
        }
        this.snackbar = true
      },
      onRemove(success) {
        if (success) {
          this.snackbarResult = "Item has been removed"
          this.snackbarColor = "success"
        } else {
          this.snackbarResult = "Something went wrong"
          this.snackbarColor = "error"
        }
        this.snackbar = true
      }
    },
    layout: "store",
  }
</script>

<style>
</style>
