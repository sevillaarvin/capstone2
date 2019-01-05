<template>
  <v-layout
    fill-height>
    <v-flex xs12>
      <v-container>
        <v-card>
          <v-layout>
            <v-flex
              xs12>
              <Title :title="'Your Cart'" />
              <v-container
                fluid
                grid-list-md>
                <v-layout
                  v-if="items.length"
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
                  <v-flex
                    xs12>
                    <v-layout>
                      <v-flex
                        xs6>
                        <v-btn
                          :disabled="items.length <= 0"
                          nuxt
                          to="/store/checkout"
                          color="primary dark--text">
                          Checkout
                        </v-btn>
                      </v-flex>
                      <v-flex
                        xs6
                        class="text-xs-right">
                        <v-btn
                          v-if="items.length > 0"
                          color="error"
                          @click="clearCart">
                          Clear cart
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout
                  v-else
                  row
                  wrap>
                  <v-flex
                    xs12
                    class="d-flex justify-center">
                    <v-icon
                      x-large
                      disabled>
                      add_shopping_cart
                    </v-icon>
                  </v-flex>
                  <v-flex
                    xs12
                    class="text-xs-center">
                    Cart is empty
                    <v-btn
                      round
                      nuxt
                      large
                      to="/store"
                      color="primary"
                      class="black--text">
                      Go to Store
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-card>
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
      },
      async clearCart() {
        try {
          await this.$store.dispatch("clearCart")
          this.snackbarResult = "Cart has been cleared"
          this.snackbarColor = "success"
        } catch (e) {
          this.snackbarResult = "Something went wrong"
          this.snackbarColor = "error"
        }
        this.snackbar = true
      },
    },
    layout: "store",
  }
</script>

<style>
</style>
