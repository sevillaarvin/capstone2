<template>
  <v-card>
    <v-container
      fluid>
      <v-layout
        row
        wrap>
        <v-flex
          xs12
          md3>
          <v-img
            :src="item.img || ''"
            contain
            height="150" />
        </v-flex>
        <v-flex
          xs12
          sm8
          offset-sm2
          md6
          offset-md0>
          <v-card-title
            class="title justify-center">
            {{ item.name }}
          </v-card-title>
          <v-card-text
            class="text-xs-center">
            {{ item.description }}
          </v-card-text>
        </v-flex>
        <v-flex
          xs12
          sm8
          offset-sm2
          md3
          offset-md0>
          <v-card-actions
            class="justify-center">
            <v-form
              @submit.prevent="updateItem(item)">
              <v-layout
                row
                wrap>
                <v-flex
                  xs12>
                  <span
                    class="font-weight-bold">
                    {{ discountedPrice | currency }}
                  </span>
                </v-flex>
                <v-flex
                  xs12>
                  <v-text-field
                    v-model="quantity"
                    color="secondary"
                    label="Quantity" />
                </v-flex>
              </v-layout>
              <v-btn
                type="submit"
                color="secondary">
                Update
              </v-btn>
              <v-dialog
                v-model="dialog"
                width="500">
                <v-btn
                  slot="activator"
                  color="error">
                  Remove
                </v-btn>
                <v-card>
                  <v-card-title>
                    Are you sure you want to remove?
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      color="secondary"
                      @click="dialog = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      color="error"
                      @click="removeItem(item)">
                      Remove
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-form>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        discountedPrice: this.item.price - this.item.discount,
        quantity: this.item.quantity,
        dialog: false,
      }
    },
    methods: {
      async updateItem(item) {
        let success
        if (item.quantity === this.quantity) {
          return
        }

        try {
          await this.$store.dispatch("addToCart", {
            itemId: item.item_id,
            quantity: this.quantity,
            update: true,
          })
          success = true
        } catch(e) {
          console.log(e)
          success = false
        }
        this.$emit("update", success)
      },
      async removeItem(item) {
        let success

        try {
          await this.$store.dispatch("removeFromCart", item.id)
          success = true
        } catch (e) {
          console.log(e)
          success = false
        }
        this.$emit("remove", success)
      },
    },
  }
</script>

<style>
</style>
