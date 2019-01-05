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
                      Members
                    </v-card-title>
                    <v-data-table
                      :headers="memberHeaders"
                      :items="members"
                      :pagination.sync="paginationMembers"
                      hide-actions
                      sort-icon="">
                      <template
                        slot="items"
                        slot-scope="{ item }">
                        <td>
                          {{ item.id }}
                        </td>
                        <td>
                          {{ item.firstName }}
                        </td>
                        <td>
                          {{ item.lastName }}
                        </td>
                        <td>
                          {{ item.username }}
                        </td>
                        <td>
                          {{ item.email }}
                        </td>
                        <td>
                          {{ item.role }}
                        </td>
                        <td>
                          {{ item.created_at | long-date }}
                        </td>
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
                          {{ item.memberId }}
                        </td>
                        <td>
                          {{ item.orderAt | long-date }}
                        </td>
                        <td>
                          {{ item.shipTo }}
                        </td>
                        <td>
                          {{ item.status }}
                        </td>
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
      Title,
    },
    async asyncData({ error, store }) {
      try {
        const paginationOrders = {
          sortBy: "order_at",
          descending: true,
        }

        const paginationMembers = {
          sortBy: "created_at",
          descending: true,
        }

        await store.dispatch("admin/setMembers", paginationMembers)
        await store.dispatch("admin/setOrders", paginationOrders)
        // await store.dispatch("admin/setEvents")

        return {
          memberHeaders: [{
            text: "ID",
            value: "id",
            sortable: false,
          }, {
            text: "First Name",
            value: "firstName",
            sortable: false,
          }, {
            text: "Last Name",
            value: "lastName",
            sortable: false,
          }, {
            text: "Username",
            value: "username",
            sortable: false,
          }, {
            text: "Email",
            value: "email",
            sortable: false,
          }, {
            text: "Role",
            value: "role",
            sortable: false,
          }, {
            text: "Created At",
            value: "created_at",
            sortable: false,
          }],
          orderHeaders: [
            {
              text: "ID",
              value: "id",
              sortable: false,
            },
            {
              text: "Member ID",
              value: "memberId",
              sortable: false,
            },
            {
              text: "Order At",
              value: "orderAt",
              sortable: false,
            },
            {
              text: "Ship To",
              value: "shipTo",
              sortable: false,
            },
            {
              text: "Status",
              value: "status",
              sortable: false,
            },
          ],
          eventHeaders: [],
          paginationMembers,
          paginationOrders,
          paginationEvents: {},
        }
      } catch (e) {
        error(e)
      }
    },
    computed: {
      members() {
        return this.$store.getters["admin/members"]
      },
      orders() {
        return this.$store.getters["admin/orders"]
      },
      events() {
        return this.$store.getters["admin/events"]
      },
    },
    layout: "admin"
  }
</script>

<style>
</style>
