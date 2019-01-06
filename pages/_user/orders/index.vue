<template>
  <v-layout>
    <v-flex
      xs12>
      <v-container>
        <v-card>
          <Title
            title="Orders" />
          <v-layout
            row
            wrap>
            <v-flex
              xs12
              sm6
              offset-sm6>
              <v-text-field
                v-model="search"
                single-line
                hide-details
                append-icon="search"
                label="Search"
                color="secondary" />
            </v-flex>
            <v-flex
              xs12>
              <v-data-table
                :headers="headers"
                :items="orders"
                :search="search">
                <template
                  slot="items"
                  slot-scope="{ item }">
                  <tr
                    class="cursor-pointer"
                    @click="selectOrder(item)">
                    <td> {{ item.id }}</td>
                    <td> {{ item.order_at | long-date }}</td>
                    <td> {{ item.ship_to }}</td>
                    <td> {{ item.status }}</td>
                    <td> {{ item.ship_at | long-date }}</td>
                    <td> {{ item.deliver_at | long-date }}</td>
                    <td>
                      <span
                        v-for="item in item.items"
                        :key="item.id">
                        {{ item.name + ', ' }}
                      </span>
                    </td>
                  </tr>
                </template>
                <v-alert
                  slot="no-results"
                  :value="true"
                  color="error"
                  icon="warning">
                  Your search for "{{ search }}" found no results
                </v-alert>
                <template
                  slot="no-data">
                  <v-alert
                    :value="true"
                    color="info">
                    <v-icon
                      class="v-alert__icon"
                      @click="$router.push('/store')">
                      shopping_cart
                    </v-icon>
                    You have no orders.
                  </v-alert>
                </template>
              </v-data-table>
              <v-dialog
                v-if="currentOrder"
                v-model="dialog"
                width="700">
                <v-card>
                  <v-container
                    grid-list-md
                    fluid>
                    <v-layout>
                      <v-flex
                        xs12>
                        <v-card-title
                          class="title">
                          <div>
                            <div
                              class="pb-3">
                              Order details: {{ currentOrder.id }}
                            </div>
                            <div>
                              Purchased: {{ currentOrder.order_at | long-date }}
                            </div>
                          </div>
                          <v-spacer />
                          <div>
                            <div
                              class="pb-3">
                              Status: {{ currentOrder.status }}
                            </div>
                            <div
                              v-if="currentOrder.deliver_at">
                              Delivered: {{ currentOrder.deliver_at | long-date }}
                            </div>
                            <div
                              v-else-if="currentOrder.ship_at">
                              Shipped: {{ currentOrder.ship_at | long-date }}
                            </div>
                          </div>
                        </v-card-title>
                      </v-flex>
                    </v-layout>
                    <v-layout
                      row
                      wrap>
                      <v-flex
                        v-for="item in currentOrder.items"
                        :key="item.id"
                        xs12>
                        <v-card>
                          <v-container
                            fluid>
                            <v-layout>
                              <v-flex
                                xs3>
                                <v-img
                                  :src="item.img" />
                                <v-rating
                                  v-model="item.rating"
                                  class="text-xs-center pt-1"
                                  half-increments
                                  read-only
                                  dense />
                              </v-flex>
                              <v-flex
                                xs6>
                                <v-subheader>
                                  {{ item.category }}
                                </v-subheader>
                                <v-card-text>
                                  {{ item.name }} - {{ item.description }}
                                </v-card-text>
                              </v-flex>
                              <v-flex
                                xs3>
                                <v-card-text>
                                  {{ item.quantity }} x {{ item.price - item.discount || item.price | currency }}
                                </v-card-text>
                                <v-divider />
                                <v-card-text
                                  class="font-weight-bold">
                                  {{ item.quantity * (item.price - item.discount || item.price) | currency }}
                                </v-card-text>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex
                        xs12>
                        <v-card-text
                          class="headline font-weight-bold d-flex justify-content-between">
                          <span
                            class="text-xs-left">
                            TOTAL:
                          </span>
                          <span
                            class="text-xs-right">
                            {{ total | currency }}
                          </span>
                        </v-card-text>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import Title from "~/components/TheTitle"

  export default {
    components: {
      Title
    },
    async asyncData({ error, store }) {
      try {
        await store.dispatch("member/setOrders")
        return {
          dialog: false,
          currentOrder: null,
          headers: [
            {
              text: "ID",
              value: "id",
            },
            {
              text: "Order At",
              value: "order_at",
            },
            {
              text: "Ship To",
              value: "ship_to",
            },
            {
              text: "Status",
              value: "status",
            },
            {
              text: "Ship At",
              value: "ship_at",
            },
            {
              text: "Deliver At",
              value: "deliver_at",
            },
            {
              text: "Items",
              value: "items",
            },
          ],
          search: "",
        }
      } catch (e) {
        error(e)
      }
    },
    computed: {
      orders() {
        return this.$store.getters["member/orders"]
      },
      total() {
        return this.currentOrder.items.reduce((total, current) => {
          return total + current.quantity * Number(current.price - current.discount || current.price)
        }, 0)
      }
    },
    methods: {
      selectOrder(order) {
        this.currentOrder = order
        this.dialog = true
      }
    },
    layout: "user"
  }
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
