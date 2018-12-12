<template>
  <v-layout>
    <v-flex xs12>
      <v-container
        fluid>
        <Title :title="'Orders'" />
        <v-layout>
          <v-flex xs12>
            <v-data-table
              :headers="headers"
              :items="orders">

              <template
                slot="items"
                slot-scope="{ item }">
                <tr
                  class="cursor-pointer"
                  @click="selectOrder(item)">
                  <td>{{ item.id }}</td>
                  <td>{{ item.member_id }}</td>
                  <td>{{ item.order_at }}</td>
                  <td>{{ item.ship_to }}</td>
                  <td>{{ item.status_id }}</td>
                  <td>{{ item.ship_at }}</td>
                  <td>{{ item.deliver_at }}</td>
                </tr>
              </template>
            </v-data-table>
            <v-dialog
              v-model="dialog"
              width="500">
              <v-card>
                <v-container
                  fluid>
                  <v-layout>
                    <v-flex
                      xs12>
                      <v-form
                        @submit.prevent="">
                        <v-text-field
                          v-model="currentOrder.id"
                          label="ID" />
                        <v-card-actions>
                          <v-btn
                            type="submit">
                            Submit
                          </v-btn>
                          <v-btn
                            color="error">
                            Delete
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-dialog>
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
    async asyncData(context) {
      await context.store.dispatch("setAdminOrders", context)
      return {
        dialog: false,
        currentOrder: {},
        headers: [
          {
            text: "ID",
            value: "id",
          },
          {
            text: "Member_id",
            value: "member_id",
          },
          {
            text: "Order_at",
            value: "order_at",
          },
          {
            text: "Ship_to",
            value: "ship_to",
          },
          {
            text: "Status_id",
            value: "status_id",
          },
          {
            text: "Ship_at",
            value: "ship_at",
          },
          {
            text: "Deliver_at",
            value: "deliver_at",
          },
        ]
      }
    },
    computed: {
      orders() {
        return this.$store.getters.adminOrders
      }
    },
    methods: {
      selectOrder(order) {
        this.currentOrder = order
        this.dialog = true
      }
    },
    layout: "user",
  }
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
