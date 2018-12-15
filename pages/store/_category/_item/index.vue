<template>
  <v-layout>
    <v-flex xs12>
      <v-container
        fluid>
        <v-layout>
          <v-flex xs-12>
            <v-card flat>
              <v-layout>
                <v-flex xs4>
                  <v-img
                    :src="item.img"
                    contain />
                </v-flex>
                <v-flex
                  xs8>
                  <v-container>
                    <v-layout
                      column>
                      <v-flex
                        xs12>
                        <v-card-title
                          class="title">
                          {{ item.name }}
                        </v-card-title>
                        <v-card-text>
                          {{ item.description }}
                        </v-card-text>
                      </v-flex>
                      <v-flex xs12>
                        <v-spacer vertical />
                        <v-card-text>
                          {{ item.price | currency }}
                        </v-card-text>
                      </v-flex>
                      <v-flex
                        xs12>
                        <v-text-field
                          v-model="quantity"
                          type="number"
                          label="Quantity" />
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12>
                  <v-card-actions
                    class="justify-space-around my-3">
                    <v-btn
                      @click="addToCart">
                      Add to Cart
                    </v-btn>
                    <v-btn>
                      Buy
                    </v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      top>
      {{ addToCartResult }}
    </v-snackbar>
  </v-layout>
</template>

<script>
  import Item from "@/components/store/Item"
  export default {
    components: {
      Item
    },
    async asyncData(context) {
      let item = context.store.getters.currentItem
      if (!item) {
        try {
          const sku = context.route.params.item
          item = await context.app.$axios.$get("/item/" + sku)
          context.store.dispatch("setCurrentItem", item)
        } catch (e) {
          context.error(e)
        }
      }

      return {
        quantity: 1,
        snackbar: false,
        snackbarColor: "",
        addToCartResult: "",
      }
    },
    computed: {
      item() {
        return this.$store.getters.currentItem
      }
    },
    methods: {
      async addToCart() {
        try {
          await this.$store.dispatch("addToCart", {
            itemId: this.item.id,
            quantity: this.quantity,
          })
          this.snackbarColor="success"
          this.addToCartResult = "Item added to cart"
        } catch (e) {
          console.log(e)
          this.snackbarColor="error"
          this.addToCartResult = "Something went wrong"
        }
        this.snackbar = true
      }
    },
    layout: "store"
  }
</script>

<style>
</style>
