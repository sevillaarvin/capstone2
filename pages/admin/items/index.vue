<template>
  <v-layout>
    <v-flex xs12>
      <v-toolbar
        flat
        color="white">
        <v-toolbar-title>
          Items
        </v-toolbar-title>
        <v-spacer />
        <v-dialog
          v-model="dialog.new"
          max-width="500px">
          <v-btn
            slot="activator"
            color="primary"
            dark
            class="mb-2">
            New Item
          </v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">New Item</span>
            </v-card-title>
            <v-form
              @submit.prevent="createItem">
              <v-card-text>
                <v-container
                  fluid>
                  <v-layout
                    wrap>
                    <v-flex
                      xs12>
                      <v-text-field
                        v-model="newItem.sku"
                        label="SKU" />
                      <v-text-field
                        v-model="newItem.name"
                        label="Name" />
                      <v-select
                        :items="categoryNames"
                        v-model="newItem.category"
                        label="Category" />
                      <v-text-field
                        v-model="newItem.description"
                        label="Description" />
                      <v-text-field
                        v-model="newItem.img"
                        label="Image" />
                      <v-text-field
                        v-model="newItem.price"
                        type="number"
                        label="Price" />
                      <v-text-field
                        v-model="newItem.discount"
                        type="number"
                        label="Discount" />
                      <v-select
                        :items="sizeNames"
                        v-model="newItem.size"
                        label="Size" />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  flat
                  @click="dismissCreate">
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  flat
                  type="submit">
                  Save
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-divider />
      <v-data-table
        :pagination.sync="pagination"
        :total-items="pagination.totalItems"
        :headers="headers"
        :items="items">

        <template
          slot="items"
          slot-scope="{ item }">
          <tr
            class="cursor-pointer"
            @click="selectItem(item)">
            <td>{{ item.id }}</td>
            <td>{{ item.sku }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.category }}</td>
            <td>
              <v-img
                :src="item.img"
                height="100"
                contain />
            </td>
            <td>{{ item.price | currency }}</td>
            <td>{{ item.discount | currency }}</td>
            <td>{{ item.size }}</td>
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
                  @submit.prevent="updateItem">
                  <v-text-field
                    v-model="currentItem.sku"
                    label="SKU"/>
                  <v-text-field
                    v-model="currentItem.name"
                    label="Name"/>
                  <v-text-field
                    v-model="currentItem.description"
                    label="Description"/>
                  <v-select
                    :items="categoryNames"
                    v-model="currentItem.category"
                    label="Category" />
                  <v-text-field
                    v-model="currentItem.img"
                    label="Image" />
                  <v-text-field
                    v-model="currentItem.price"
                    type="number"
                    label="Price" />
                  <v-text-field
                    v-model="currentItem.discount"
                    type="number"
                    label="Discount" />
                  <v-select
                    :items="sizeNames"
                    v-model="currentItem.size"
                    label="Size" />
                  <v-card-actions>
                    <v-btn
                      type="submit">
                      Submit
                    </v-btn>
                    <v-btn
                      color="error"
                      @click="deleteItem">
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
        await store.dispatch("admin/setCategories")
        await store.dispatch("admin/setSizes")
        pagination.totalItems = await store.dispatch("admin/setItems", pagination)
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
        newItem: {},
        currentItem: {},
        pagination,
        // {
        //    descending: boolean
        //    page: number
        //    rowsPerPage: number // -1 for All
        //    sortBy: string
        //    totalItems: number
        // },
        headers: [
          {
            text: "ID",
            value: "id",
          },
          {
            text: "SKU",
            value: "sku",
          },
          {
            text: "Name",
            value: "name",
          },
          {
            text: "Description",
            value: "description",
          },
          {
            text: "Category",
            value: "category",
          },
          {
            text: "Image",
            value: "img",
          },
          {
            text: "Price",
            value: "price",
          },
          {
            text: "Discount",
            value: "discount",
          },
          {
            text: "Size",
            value: "size",
          },
        ]
      }
    },
    computed: {
      items() {
        return this.$store.getters["admin/items"]
      },
      categoryNames() {
        return this.$store.getters["admin/categories"]
          .map((category) => category.name)
      },
      sizeNames() {
        return (["None"]).concat(this.$store.getters["admin/sizes"]
          .map((size) => size.name))
      },
    },
    watch: {
      pagination: {
        handler() {
          this.loadItems()
        },
        deep: true,
      }
    },
    methods: {
      async createItem() {
        try {
          await this.$store.dispatch("admin/createItem", this.newItem)
          this.showSnackbar("Item has been added", "success")

          // This triggers watch pagination handler
          this.pagination.totalItems++

          this.dismissCreate()
        } catch (e) {
          this.showSnackbar("Something went wrong", "error")
        }
      },
      dismissCreate() {
        this.dialog.new = false
        this.newItem = {}
      },
      selectItem(item) {
        const { rating, ...currentItem } = item
        this.currentItem = currentItem
        this.dialog.edit = true
      },
      loadItems() {
        this.$store.dispatch("admin/setItems", this.pagination)
          .then((total) => this.pagination.totalItems = total)
      },
      async updateItem() {
        try {
          await this.$store.dispatch("admin/updateItem", this.currentItem)
          this.showSnackbar("Item has been updated", "success")
          this.dismissUpdate()
          this.loadItems()
        } catch (e) {
          this.showSnackbar("Something went wrong", "error")
        }
      },
      dismissUpdate() {
        this.dialog.edit = false
        this.currentItem = {}
      },
      async deleteItem() {
        const { id } = this.currentItem

        try {
          await this.$store.dispatch("admin/deleteItem", id)
          this.showSnackbar("Item has been deleted", "success")
          this.dismissUpdate()
          this.pagination.totalItems--
        } catch (e) {
          this.showSnackbar("Something went wrong. Make sure all transactions related to item has been removed.", "error")
        }
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
