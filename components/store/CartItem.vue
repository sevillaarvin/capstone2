<template>
  <v-card>
    <v-container
      fluid>
      <v-layout>
        <v-flex
          xs3>
          <v-img
            :src="item.img || ''" />
        </v-flex>
        <v-flex
          xs6>
          <v-card-text>
            <div>
              {{ item.name }}
            </div>
            <div>
              {{ item.description }}
            </div>
          </v-card-text>
        </v-flex>
        <v-flex
          xs3>
          <v-card-actions>
            <v-form
              @submit.prevent="updateItem(item)">
              <v-text-field
                v-model="quantity"
                label="Quantity" />
              <v-btn
                type="submit">
                Update
              </v-btn>
              <v-dialog
                width="500">
                <v-btn
                  slot="activator">
                  Remove
                </v-btn>
                <v-card>
                  <v-card-title>
                    Are you sure you want to remove?
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
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
        quantity: this.item.quantity
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
