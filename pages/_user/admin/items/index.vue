<template>
  <v-layout>
    <v-flex xs12>
      <v-container
        fluid>
        <Title :title="'Items'" />
        <v-layout>
          <v-flex xs12>
            <v-data-table
              :headers="headers"
              :items="items">

              <template
                slot="items"
                slot-scope="{ item }">
                <tr
                  class="cursor-pointer"
                  @click="selectItem(item)">
                  <td>{{ item.sku }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.category }}</td>
                  <td>
                    <v-img
                      :src="item.img"
                      contain />
                  </td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.discount }}</td>
                  <td>{{ item.size }}</td>
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
                          v-model="currentItem.sku"
                          label="SKU"/>
                        <v-text-field
                          v-model="currentItem.name"
                          label="Name"/>
                        <v-text-field
                          v-model="currentItem.description"
                          label="Description"/>
                        <v-text-field
                          v-model="currentItem.category"
                          label="Category"/>
                        <v-text-field
                          v-model="currentItem.img"
                          label="Image"/>
                        <v-text-field
                          v-model="currentItem.price"
                          label="Price"/>
                        <v-text-field
                          v-model="currentItem.discount"
                          label="Discount"/>
                        <v-text-field
                          v-model="currentItem.size"
                          label="Size"/>
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
      await context.store.dispatch("setAdminItems", context)
      return {
        dialog: false,
        currentItem: {},
        headers: [
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
        return this.$store.getters.adminItems
      }
    },
    methods: {
      selectItem(item) {
        this.currentItem = item
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
