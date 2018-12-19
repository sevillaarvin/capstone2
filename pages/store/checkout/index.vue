<template>
  <v-layout>
    <v-flex xs12>
      <v-container
        fluid>
        <Title :title="'Checkout'" />
        <v-layout>
          <v-flex xs12>
            <v-stepper v-model="step">
              <v-stepper-header>
                <v-stepper-step
                  :complete="step > 1"
                  step="1">
                  Review items
                </v-stepper-step>
                <v-divider />
                <v-stepper-step
                  :complete="step > 2"
                  step="2">
                  Select shipping
                </v-stepper-step>
                <v-divider />
                <v-stepper-step step="3">
                  Select payment method 
                </v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card
                    flat>
                    <v-container
                      fluid
                      grid-list-md>
                      <v-layout>
                        <v-flex xs12>
                          <v-card-title
                            class="justify-center pt-0">
                            <h3 class="header">Review items</h3>
                          </v-card-title>
                        </v-flex>
                      </v-layout>
                      <v-layout
                        row
                        wrap>
                        <v-flex
                          v-for="item in items"
                          :key="item.name"
                          xs12>
                          <v-card>
                            <v-container
                              fluid>
                              <v-layout>
                                <v-flex
                                  xs12
                                  sm6
                                  md4>
                                  <v-img
                                    :src="item.img"
                                    contain
                                    height="100" />
                                </v-flex>
                                <v-flex
                                  xs12
                                  sm3
                                  md4>
                                  <div>
                                    {{ item.name }}
                                  </div>
                                  <div>
                                    <span>
                                      {{ item.price - item.discount | currency }}
                                    </span>
                                    <span>
                                      x {{ item.quantity }}
                                    </span>
                                  </div>
                                </v-flex>
                                <v-flex
                                  xs12
                                  sm3
                                  md4
                                  class="text-xs-right">
                                  <span>
                                    {{ (item.price - item.discount) * item.quantity | currency }}
                                  </span>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-card>
                        </v-flex>
                        <v-flex
                          xs12>
                          <v-card
                            flat>
                            <v-container
                              fluid>
                              <v-layout>
                                <v-flex
                                  xs6>
                                  <v-card-title
                                    class="title">
                                    Total:
                                  </v-card-title>
                                </v-flex>
                                <v-flex
                                  xs6>
                                  <v-card-text
                                    class="text-xs-right font-weight-bold">
                                    {{ total | currency }}
                                  </v-card-text>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex
                          xs12>
                          <v-card-actions>
                            <v-btn
                              v-if="step > 1"
                              @click="previousStep">
                              Back
                            </v-btn>
                            <v-spacer />
                            <v-btn
                              @click="nextStep">
                              Continue
                            </v-btn>
                          </v-card-actions>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-stepper-content>
                <v-stepper-content step="2">
                  <v-card
                    flat>
                    <v-container
                      fluid>
                      <v-layout>
                        <v-flex xs12>
                          <v-card-title
                            class="justify-center pt-0">
                            <h3 class="header">Select Shipping</h3>
                          </v-card-title>
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex
                          xs12>
                          <v-card
                            flat>
                            <v-card-actions>
                              <v-radio-group
                                v-model="selectedShipMethod">
                                <v-radio
                                  v-for="method in shipMethods"
                                  :key="method.name"
                                  :label="method.name"
                                  :value="method.name" />
                              </v-radio-group>
                            </v-card-actions>
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex
                          xs12>
                          <v-card-actions>
                            <v-btn
                              @click="previousStep">
                              Back
                            </v-btn>
                            <v-spacer />
                            <v-btn
                              @click="nextStep">
                              Continue
                            </v-btn>
                          </v-card-actions>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-stepper-content>
                <v-stepper-content step="3">
                  <v-card
                    flat>
                    <v-container
                      fluid>
                      <v-layout>
                        <v-flex xs12>
                          <v-card-title
                            class="justify-center pt-0">
                            <h3 class="header">Select Payment</h3>
                          </v-card-title>
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex
                          xs12>
                          <v-card
                            flat>
                            <v-card-actions>
                              <v-radio-group
                                v-model="selectedPayMethod">
                                <v-radio
                                  v-for="method in payMethods"
                                  :key="method.name"
                                  :label="method.name"
                                  :value="method.name" />
                              </v-radio-group>
                            </v-card-actions>
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex
                          xs12>
                          <v-card-actions>
                            <v-btn
                              @click="previousStep">
                              Back
                            </v-btn>
                            <v-spacer />
                            <v-btn
                              @click="onPay">
                              Payment
                            </v-btn>
                          </v-card-actions>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
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
    async asyncData({ app, error }) {
      let shipMethods,
        payMethods

      try {
        shipMethods = await app.$axios.$get("/ship_method")
        payMethods = await app.$axios.$get("/pay_method")
      } catch (e) {
        error(e)
      }

      return {
        step: 0,
        shipMethods,
        selectedShipMethod: "Economy",
        payMethods,
        selectedPayMethod: "COD",
      }
    },
    computed: {
      items() {
        if (this.$store.getters.userCart) {
          return this.$store.getters.userCart.items
        } else {
          return []
        }
      },
      total() {
        try {
          return this.items
            .map(item => (item.price - item.discount) * item.quantity)
            .reduce((a,b) => a + b)
        } catch (e) {
          return 0
        }
      },
    },
    methods: {
      nextStep() {
        if (this.step < 3) {
          this.step++
        }
      },
      previousStep() {
        if (this.step > 1) {
          this.step--
        }
      },
      async onPay() {
        try {
          await this.$store.dispatch("cart/approveCheckout", {
            cartId: this.$store.getters.userCart.cartId,
            address: this.$store.getters.userDetails.address,
            shipMethod: this.selectedShipMethod,
            payMethod: this.selectedPayMethod,
          })
          this.$router.push("/store/checkout/thanks")
        } catch (e) {
          console.log(e)
        }
      }
    },
    layout: "store"
  }
</script>

<style>
</style>
