<template>
  <v-layout>
    <v-flex xs12>
      <v-toolbar
        flat
        color="white">
        <v-toolbar-title>
          Orders
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-divider />
      <v-data-table
        :pagination.sync="pagination"
        :total-items="pagination.totalItems"
        :headers="headers"
        :items="orders">

        <template
          slot="items"
          slot-scope="{ item }">
          <tr
            class="cursor-pointer"
            @click="selectOrder(item)">
            <td>{{ item.id }}</td>
            <td>{{ item.memberId }}</td>
            <td>{{ item.orderAt }}</td>
            <td>{{ item.shipTo }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.shipAt }}</td>
            <td>{{ item.deliverAt }}</td>
            <td>{{ item.shipMethod }}</td>
            <td>{{ item.payMethod }}</td>
            <td>{{ item.paypalPaymentSid }}</td>
          </tr>
        </template>
      </v-data-table>
      <v-dialog
        v-model="dialog.edit"
        width="500">
        <v-card>
          <v-container
            fluid>
            <v-layout>
              <v-flex
                xs12>
                <v-form
                  @submit.prevent="updateOrder">
                  <v-text-field
                    v-model="currentOrder.orderAt"
                    label="Order At" />
                  <v-text-field
                    v-model="currentOrder.shipTo"
                    label="Ship To" />
                  <v-select
                    :items="statusNames"
                    v-model="currentOrder.status"
                    label="Status" />
                  <v-text-field
                    v-model="currentOrder.shipAt"
                    label="Ship At" />
                  <v-text-field
                    v-model="currentOrder.deliverAt"
                    label="Deliver At" />
                  <v-select
                    :items="shipMethodNames"
                    v-model="currentOrder.shipMethod"
                    label="Ship Method" />
                  <v-select
                    :items="payMethodNames"
                    v-model="currentOrder.payMethod"
                    label="Pay Method" />
                  <v-text-field
                    v-model="currentOrder.paypalPaymentSid"
                    label="PayPal Payment SID" />
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
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      top>
      {{ snackbarMessage }}
    </v-snackbar>
  </v-layout>
</template>

<script>
  export default {
    async asyncData({ error, store }) {
      const pagination = {}

      try {
        await store.dispatch("admin/setStatuses")
        await store.dispatch("admin/setShipMethods")
        await store.dispatch("admin/setPayMethods")
        pagination.totalItems = await store.dispatch("admin/setOrders", pagination)
      } catch (e) {
        error(e)
      }

      return {
        dialog: {
          new: false,
          edit: false,
        },
        snackbar: false,
        snackbarMessage: "",
        snackbarColor: "",
        currentOrder: {},
        pagination,
        headers: [
          {
            text: "ID",
            value: "id",
          },
          {
            text: "Member ID",
            value: "memberId",
          },
          {
            text: "Order At",
            value: "orderAt",
          },
          {
            text: "Ship To",
            value: "shipTo",
          },
          {
            text: "Status",
            value: "status",
          },
          {
            text: "Ship At",
            value: "shipAt",
          },
          {
            text: "Deliver At",
            value: "deliverAt",
          },
          {
            text: "Ship Method",
            value: "shipMethod",
          },
          {
            text: "Pay Method",
            value: "payMethod",
          },
          {
            text: "PayPal Payment SID",
            value: "paypalPaymentSid",
          },
        ]
      }
    },
    computed: {
      orders() {
        return this.$store.getters["admin/orders"]
      },
      statusNames() {
        return this.$store.getters["admin/statuses"]
          .map((status) => status.name)
      },
      shipMethodNames() {
        return this.$store.getters["admin/shipMethods"]
          .map((shipMethod) => shipMethod.name)
      },
      payMethodNames() {
        return this.$store.getters["admin/payMethods"]
          .map((payMethod) => payMethod.name)
      },
    },
    watch: {
      pagination: {
        handler() {
          this.loadOrders()
        },
        deep: true,
      }
    },
    methods: {
      async createOrder() {
        // TODO: Implement create order
      },
      selectOrder(order) {
        const { ...currentOrder } = order
        this.currentOrder = currentOrder
        this.dialog.edit = true
      },
      loadOrders() {
        this.$store.dispatch("admin/setOrders", this.pagination)
          .then((total) => this.pagination.totalItems = total)
      },
      async updateOrder() {
        try {
          await this.$store.dispatch("admin/updateOrder", this.currentOrder)
          this.showSnackbar("Order has been updated", "success")
          this.dismissUpdate()
          this.loadOrders()
        } catch (e) {
          this.showSnackbar("Something went wrong", "error")
        }
      },
      dismissUpdate() {
        this.dialog.edit = false
        this.currentOrder = {}
      },
      async deleteOrder() {
        // TODO: Implement order deletion
      },
      showSnackbar(message, color) {
        this.snackbarMessage = message
        this.snackbarColor = color
        this.snackbar = true
      },
    },
    layout: "admin",
  }
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
