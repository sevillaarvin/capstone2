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
                  <v-card-title>
                    {{ item.name }}
                  </v-card-title>
                  <v-card-text>
                    {{ item.description }}
                  </v-card-text>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12>
                  <v-card-actions
                    class="justify-space-around">
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
    asyncData(context) {
      return new Promise((resolve, reject) => {
        const dataObj = {
          item: context.store.getters.featuredItems[1]
        }

        resolve(dataObj)
      })
    },
    layout: "store"
  }
</script>

<style>
</style>
