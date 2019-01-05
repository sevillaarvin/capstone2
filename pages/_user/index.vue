<template>
  <v-layout>
    <v-flex
      xs12>
      <v-container
        grid-list-md>
        <v-card>
          <Title
            title="Dashboard" />
          <v-layout>
            <v-flex
              xs12>
              <v-layout
                row
                wrap>
                <v-flex
                  xs12>
                  <v-card>
                    <v-card-title
                      class="title justify-center">
                      Cart
                    </v-card-title>
                    <v-data-table
                      :headers="cartHeaders"
                      :items="cartItems"
                      :pagination.sync="paginationCart"
                      hide-actions
                      sort-icon="">
                      <template
                        slot="items"
                        slot-scope="{ item }">
                        <td>
                          <v-img
                            :src="item.img"
                            contain
                            height="100" />
                        </td>
                        <td>
                          {{ item.name }}
                        </td>
                        <td>
                          {{ item.category }}
                        </td>
                        <td>
                          {{ item.quantity }}
                        </td>
                        <td>
                          {{ item.price - item.discount | currency }}
                        </td>
                        <td>
                          {{ (item.price - item.discount) * item.quantity | currency }}
                        </td>
                      </template>
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
                          You have no items in cart.
                        </v-alert>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-flex>
                <v-flex
                  xs12
                  md6>
                  <v-card>
                    <v-card-title
                      class="title justify-center">
                      Orders
                    </v-card-title>
                    <v-data-table
                      :headers="orderHeaders"
                      :items="orders"
                      :pagination.sync="paginationOrders"
                      hide-actions
                      sort-icon="">
                      <template
                        slot="items"
                        slot-scope="{ item }">
                        <td>
                          {{ item.id }}
                        </td>
                        <td>
                          <div
                            v-for="orderItem in item.items"
                            :key="orderItem.id">
                            {{ orderItem.name }}
                          </div>
                        </td>
                        <td>
                          {{ item.status }}
                        </td>
                        <td>
                          {{ item.order_at | long-date }}
                        </td>
                      </template>
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
                  </v-card>
                </v-flex>
                <v-flex
                  xs12
                  md6>
                  <v-card>
                    <v-card-title
                      class="title justify-center">
                      Events
                    </v-card-title>
                    <v-data-table
                      :headers="eventHeaders"
                      :items="events"
                      :pagination.sync="paginationEvents"
                      hide-actions
                      sort-icon="">
                      <template
                        slot="items"
                        slot-scope="{ item }">
                        <td>
                          {{ item.id }}
                        </td>
                      </template>
                      <template
                        slot="no-data">
                        <v-alert
                          :value="true"
                          color="info">
                          <v-icon
                            class="v-alert__icon"
                            @click="$router.push('/events')">
                            event_note
                          </v-icon>
                          You have no registered events.
                        </v-alert>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-flex>
              </v-layout>
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
    async asyncData({ error, store: { dispatch, getters } }) {
      try {
        await dispatch("member/setOrders")

        return {
          cartHeaders: [{
            text: "Photo",
            value: "img",
          }, {
            text: "Name",
            value: "name",
          }, {
            text: "Category",
            value: "category",
          }, {
            text: "Quantity",
            value: "quantity",
          }, {
            text: "Price",
            value: "price",
          }, {
            text: "Subtotal",
            value: "price",
          }],
          paginationCart: {},
          orderHeaders: [{
            text: "Reference",
            value: "id",
            sortable: false,
          }, {
            text: "Items",
            value: "items",
            sortable: false,
          }, {
            text: "Status",
            value: "status",
            sortable: false,
          }, {
            text: "Order At",
            value: "order_at",
            sortable: false,
          }],
          paginationOrders: {
            sortBy: "order_at",
            descending: true,
          },
          eventHeaders: [],
          paginationEvents: {},
        }
      } catch (e) {
        error(e)
      }
    },
    computed: {
      cartItems() {
        if (this.$store.getters.userCart) {
          return this.$store.getters.userCart.items
        } else {
          return []
        }
      },
      orders() {
        return this.$store.getters["member/orders"]
      },
      events() {
        return []
      }
    },
    created() {
      const { user: unauthorizedUser } = this.$route.params
      const { username: authorizedUser } = this.$auth.$state.user

      if (authorizedUser != unauthorizedUser) {
        // TODO: If not own page, display basic info
        // and remove route replace
        this.$router.replace("/")
      }
    },
    layout: "user",
  }
</script>

<style>
</style>
