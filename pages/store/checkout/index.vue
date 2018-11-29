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
                                    :src="item.src"
                                    contain
                                    height="100" />
                                </v-flex>
                                <v-flex
                                  xs12
                                  sm3
                                  md4>
                                  {{ item.name }}
                                </v-flex>
                                <v-flex
                                  xs12
                                  sm3
                                  md4>
                                  {{ item.price | currency }}
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
                </v-stepper-content>
                <v-stepper-content step="3">
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
    data() {
      return {
        step: 0,
        items: this.$store.getters.featuredItems.slice(0,3)
      }
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
      onPay() {
        console.log("Link paypal")
      }
    },
    layout: "store"
  }
</script>

<style>
</style>
