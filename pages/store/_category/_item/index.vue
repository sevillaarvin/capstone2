<template>
  <v-layout
    row
    wrap>
    <v-flex
      xs12>
      <v-container>
        <v-card>
          <v-layout
            row
            wrap>
            <v-flex
              xs12
              md4>
              <!--
              <v-img
                :src="item.img"
                :max-height="$vuetify.breakpoint.smAndDown ? 250 : null"
                contain />
              -->
              <v-img
                :src="item.img"
                contain
                height="400" />
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
                  <v-subheader
                    v-if="item.size">
                    Size: {{ item.size }}
                  </v-subheader>
                  <template
                    v-if="item.discount">
                    <v-card-text
                      class="py-0">
                      Original Price: <span class="line-through">{{ item.price | currency }}</span>
                    </v-card-text>
                    <v-card-text
                      class="font-weight-bold py-0">
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
                  xs12>
                  <v-card-actions>
                    <v-layout
                      row
                      wrap>
                      <v-flex
                        xs12
                        sm6
                        md4>
                        <v-text-field
                          v-model="quantity"
                          :disabled="!item.quantity"
                          solo
                          type="number"
                          label="Quantity" />
                      </v-flex>
                      <v-spacer />
                      <v-flex
                        xs12
                        sm5
                        md7>
                        <v-layout
                          fill-height
                          align-center>
                          <span>
                            Current Stock:&nbsp;
                          </span>
                          <span
                            :class="item.quantity ? '' : 'red--text'">
                            {{ item.quantity ? item.quantity : "OUT OF STOCK" }}
                          </span>
                        </v-layout>
                      </v-flex>
                      <v-flex
                        xs12
                        class="text-xs-center text-sm-left">
                        <v-btn
                          :disabled="!item.quantity"
                          color="primary"
                          class="black--text"
                          @click="addToCart">
                          Add to Cart
                        </v-btn>
                        <!-- TODO: Implement immediate checkout -->
                        <!--
                        <v-btn>
                          Buy
                        </v-btn>
                        -->
                      </v-flex>
                    </v-layout>
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
      // let item = context.store.getters.currentItem
      // if (!item) {
      //   try {
      //     const sku = context.route.params.item
      //     item = await context.app.$axios.$get("/item/" + sku)
      //     context.store.dispatch("setCurrentItem", item)
      //   } catch (e) {
      //     context.error(e)
      //   }
      // }

      try {
        const sku = context.route.params.item
        const item = await context.app.$axios.$get("/item/" + sku)
        context.store.dispatch("setCurrentItem", item)
      } catch (e) {
        context.error(e)
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
          this.showSnackbar("Something went wrong", "error")
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
