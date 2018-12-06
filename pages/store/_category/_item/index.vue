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
                <v-flex xs8>
                  <v-container>
                    <v-layout column>
                      <v-flex xs12>
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
                    </v-layout>
                  </v-container>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12>
                  <v-card-actions
                    class="justify-space-around my-3">
                    <v-btn>
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
          console.log(item)
          context.store.dispatch("setCurrentItem", item)
        } catch (e) {
          context.error(e)
        }
      }
    },
    computed: {
      item() {
        return this.$store.getters.currentItem
      }
    },
    layout: "store"
  }
</script>

<style>
</style>
