<template>
  <v-layout
    row
    wrap>
    <v-flex
      xs12>
      <v-container>
        <v-card>
          <v-layout
            row
            wrap>
            <v-flex
              xs12
              md4>
              <!--
              <v-img
                :src="item.img"
                :max-height="$vuetify.breakpoint.smAndDown ? 250 : null"
                contain />
              -->
              <v-img
                :src="item.img"
                contain
                height="400" />
            </v-flex>
            <v-flex
              xs12
              md4>
              <v-layout
                row
                wrap>
                <v-flex
                  xs12>
                  <v-card-title
                    primary-title
                    class="display-2">
                    {{ item.name }}
                  </v-card-title>
                  <v-subheader
                    v-if="item.size">
                    Size: {{ item.size }}
                  </v-subheader>
                  <template
                    v-if="item.discount">
                    <v-card-text
                      class="py-0">
                      Original Price: <span class="line-through">{{ item.price | currency }}</span>
                    </v-card-text>
                    <v-card-text
                      class="font-weight-bold py-0">
                      Discounted Price: {{ item.price - item.discount | currency }}
                    </v-card-text>
                  </template>
                  <template
                    v-else>
                    <v-card-text>
                      Price: {{ item.price | currency }}
                    </v-card-text>
                  </template>
                </v-flex>
                <v-flex
                  xs12>
                  <v-card-actions>
                    <v-layout
                      row
                      wrap>
                      <v-flex
                        xs12
                        sm6
                        md4>
                        <v-text-field
                          v-model="quantity"
                          :disabled="!item.quantity"
                          solo
                          type="number"
                          label="Quantity" />
                      </v-flex>
                      <v-spacer />
                      <v-flex
                        xs12
                        sm5
                        md7>
                        <v-layout
                          fill-height
                          align-center>
                          <span>
                            Current Stock:&nbsp;
                          </span>
                          <span
                            :class="item.quantity ? '' : 'red--text'">
                            {{ item.quantity ? item.quantity : "OUT OF STOCK" }}
                          </span>
                        </v-layout>
                      </v-flex>
                      <v-flex
                        xs12
                        class="text-xs-center text-sm-left">
                        <v-btn
                          :disabled="!item.quantity"
                          color="primary"
                          class="black--text"
                          @click="addToCart">
                          Add to Cart
                        </v-btn>
                        <!-- TODO: Implement immediate checkout -->
                        <!--
                        <v-btn>
                          Buy
                        </v-btn>
                        -->
                      </v-flex>
                    </v-layout>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex
              xs12
              md4>
              <v-card-text>
                {{ item.description }}
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
        <v-card
          class="my-3">
          <v-layout
            row
            wrap>
            <v-flex
              xs12>
              <v-card-title
                class="title">
                Reviews&nbsp;
                <span
                  class="secondary--text">
                  ({{ averageRating }} stars)
                </span>
              </v-card-title>
            </v-flex>
            <v-flex
              v-if="!isDoneCommenting"
              xs12>
              <v-card-text>
                <v-form
                  @submit.prevent="sendComment">
                  <v-layout
                    row
                    wrap>
                    <v-flex
                      xs12
                      sm6>
                      <v-avatar
                        v-if="userInfo.avatar"
                        size="50">
                        <v-img
                          :src="userInfo.avatar" />
                      </v-avatar>
                      <v-avatar
                        v-else
                        size="50">
                        <v-icon
                          size="50">
                          account_circle
                        </v-icon>
                      </v-avatar>
                      {{ userInfo.firstName }} {{ userInfo.lastName }}
                    </v-flex>
                    <v-flex
                      xs12
                      sm6>
                      <v-rating
                        v-model="stars"/>
                    </v-flex>
                    <v-flex
                      xs12>
                      <v-textarea
                        v-model="comment"
                        label="Comment"
                        color="secondary"/>
                      <div>
                        <v-btn
                          type="submit"
                          color="secondary">
                          Send
                        </v-btn>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
            </v-flex>
            <v-flex
              xs12>
              <v-container
                fluid
                grid-list-md>
                <v-layout
                  row
                  wrap>
                  <v-flex
                    v-for="rating in ratings"
                    :key="rating.id"
                    xs12>
                    <Rating
                      :rating="rating" />
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-text
                v-if="!ratings.length">
                No reviews for item. Be the first!
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      top>
      {{ addToCartResult }}
    </v-snackbar>
  </v-layout>
</template>

<script>
  import Item from "@/components/store/Item"
  import Rating from "~/components/store/Rating"

  export default {
    components: {
      Item,
      Rating,
    },
    async asyncData({ error, route, store }) {
      // let item = context.store.getters.currentItem
      // if (!item) {
      //   try {
      //     const sku = context.route.params.item
      //     item = await context.app.$axios.$get("/item/" + sku)
      //     context.store.dispatch("setCurrentItem", item)
      //   } catch (e) {
      //     context.error(e)
      //   }
      // }

      try {
        let averageRating = await store.dispatch("setCurrentItem", route.params.item)
        averageRating = Math.round(averageRating * 10) / 10

        return {
          quantity: 1,
          snackbar: false,
          snackbarColor: "",
          addToCartResult: "",
          averageRating,
          stars: 5,
          comment: "",
        }
      } catch (e) {
        error(e)
      }
    },
    computed: {
      item() {
        return this.$store.getters.currentItem.item
      },
      ratings() {
        return this.$store.getters.currentItem.ratings
      },
      isDoneCommenting() {
        return this.ratings.some((rating) => {
          if (this.$auth.loggedIn) {
            return rating.memberId === this.$auth.$state.user.userId
          } else {
            return true
          }
        })
      },
      userInfo() {
        return this.$store.getters.userInfo || {
          firstName: "Anonymous",
        }
      }
    },
    methods: {
      async addToCart() {
        try {
          await this.$store.dispatch("addToCart", {
            itemId: this.item.id,
            quantity: this.quantity,
          })
          this.showSnackbar("Item added to cart", "success")
        } catch (e) {
          this.showSnackbar("Something went wrong", "error")
        }
      },
      async sendComment() {
        try {
          await this.$store.dispatch("store/sendComment", {
            memberId: this.$auth.$state.user.userId,
            itemId: this.item.id,
            stars: this.stars,
            comment: this.comment,
            sku: this.$route.params.item,
          })
        } catch (e) {
          console.log("sendComment", e)
          const { data, status } = e.response
          
          if (status === 400) {
            this.showSnackbar(data, "error")
          } else {
            this.showSnackbar("Something went wrong", "error")
          }
        }
      },
      showSnackbar(message, color) {
        this.addToCartResult = message
        this.snackbarColor = color
        this.snackbar = true
      },
    },
    layout: "store"
  }
</script>

<style
  scoped
  lang="scss">
  .line-through {
    text-decoration: line-through;
  }
</style>
