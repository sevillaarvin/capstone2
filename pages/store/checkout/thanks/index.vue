<template>
  <v-layout>
    <v-flex
      xs12>
      <v-card>
        <v-container
          fluid>
          <v-layout>
            <v-flex
              xs12>
              <v-card-title
                class="headline justify-center">
                Thank you for your purchase!
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex
              xs12>
              <v-card-text
                class="d-flex justify-space-between">
                <span>
                  {{ order.firstName }} {{ order.lastName }}
                </span>
                <span
                  class="text-xs-right">
                  Transaction number: {{ order.orderId }}
                </span>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex
              xs12>
              <v-card-text
                class="d-flex justify-space-between">
                <span>
                  {{ order.shipTo }}
                </span>
                <span
                  class="text-xs-right">
                  Purchase Date: {{ order.orderAt | long-date }}
                </span>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex
              xs12>
              <v-card-text>
                {{ order.shipMethod }} Shipping - {{ order.payMethod }}
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container
          fluid
          grid-list-md>
          <v-layout
            row
            wrap>
            <v-flex
              v-for="item in order.items"
              :key="item.sku"
              xs12>
              <v-card>
                <v-container
                  fluid>
                  <v-layout>
                    <v-flex
                      xs3>
                      <v-img
                        :src="item.img"
                        contain
                        height="150" />
                    </v-flex>
                    <v-flex
                      xs3>
                      <v-card-text>
                        {{ item.name }} - {{ item.sku }}
                      </v-card-text>
                      <v-card-text>
                        {{ item.category }}
                      </v-card-text>
                      <v-card-text>
                        {{ item.description }}
                      </v-card-text>
                    </v-flex>
                    <v-flex
                      xs3>
                      <v-card-text>
                        {{ item.size }}
                      </v-card-text>
                    </v-flex>
                    <v-flex
                      xs3>
                      <v-card-text
                        class="text-xs-right">
                        {{ item.quantity }} x {{ item.price - item.discount | currency }}
                      </v-card-text>
                      <v-card-text
                        class="font-weight-bold text-xs-right">
                        {{ item.quantity * (item.price - item.discount) | currency }}
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container
          fluid>
          <v-layout>
            <v-flex
              xs12>
              <v-card
                flat>
                <v-card-title
                  class="headline justify-space-between">
                  <span>
                    TOTAL:
                  </span>
                  <span>
                    {{ total | currency }}
                  </span>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      order() {
        return this.$store.getters["cart/latestOrder"]
      },
      total() {
        try {
          return this.order.items
            .map((item) => item.quantity * (item.price - item.discount))
            .reduce((a, b) => a + b)
        } catch (e) {
          return 0
        }
      }
    },
    layout: "store",
  }
</script>

<style>
</style>
