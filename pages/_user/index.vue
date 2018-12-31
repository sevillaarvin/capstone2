<template>
  <v-layout>
    <v-flex
      xs12>
      <v-container>
        <Title
          title="Dashboard" />
        <v-layout>
          <v-flex
            xs12>
            <v-container
              fluid
              grid-list-md
              class="pa-0">
              <v-layout
                row
                wrap>
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
                      :pagination.sync="pagination"
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
            </v-container>
          </v-flex>
        </v-layout>
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
        await dispatch("user/setOrders")

        return {
          orderHeaders: [{
            text: "ID",
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
          pagination: {
            sortBy: "order_at",
            descending: true,
          },
        }
      } catch (e) {
        error(e)
      }
    },
    computed: {
      orders() {
        return this.$store.getters["user/orders"]
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
