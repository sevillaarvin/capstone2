<template>
  <v-layout
    row
    wrap>
    <v-flex
      xs12>
      <v-container>
        <v-layout>
          <v-flex
            xs-12>
            <v-card flat>
              <v-layout
                row
                wrap>
                <v-flex
                  xs12
                  md4>
                  <v-img
                    :src="item.img"
                    :max-height="$vuetify.breakpoint.xsOnly ? 250 : null"
                    contain />
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-layout
                    row
                    wrap>
                    <v-flex
                      xs12>
                      <v-card-title
                        primary-title
                        class="title">
                        {{ item.name }}
                      </v-card-title>
                      <template
                        v-if="item.discount">
                        <v-card-text>
                          Original Price: <span class="line-through">{{ item.price | currency }}</span>
                        </v-card-text>
                        <v-card-text
                          class="font-weight-bold">
                          Discounted Price: {{ item.price - item.discount | currency }}
                        </v-card-text>
                      </template>
                      <template
                        v-else>
                        <v-card-text>
                          Price: {{ item.price | currency }}
                        </v-card-text>
                      </template>
                    </v-flex>
                    <v-flex
                      xs8
                      sm6
                      md4>
                      <v-card-actions>
                        <v-text-field
                          v-model="quantity"
                          solo
                          type="number"
                          label="Quantity" />
                      </v-card-actions>
                    </v-flex>
                    <v-flex
                      xs12>
                      <v-card-actions>
                        <v-btn
                          @click="addToCart">
                          Add to Cart
                        </v-btn>
                        <!--
                        <v-btn>
                          Buy
                        </v-btn>
                        -->
                      </v-card-actions>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-card-text>
                    {{ item.description }}
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-flex
      xs12>
      <!-- TODO: Recommended items -->
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
          this.showSnackbar("Item added to cart", "success")
        } catch (e) {
          console.log(e)
          this.showSnackbar("Something went wront", "error")
        }
      },
      showSnackbar(message, color) {
        this.addToCartResult = message
        this.snackbarColor = color
        this.snackbar = true
      },
    },
    layout: "store"
  }
</script>

<style
  scoped
  lang="scss">
  .line-through {
    text-decoration: line-through;
  }
</style>
