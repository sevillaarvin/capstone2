<template>
  <v-layout>
    <v-flex xs12>
      <v-container>
        <v-card>
          <v-layout>
            <v-flex
              xs12>
              <Title :title="'Membership'" />
              <v-container
                grid-list-xl
                class="pt-0">
                <v-layout
                  justify-center
                  row
                  wrap>
                  <v-flex
                    v-for="membership in memberships"
                    :key="membership.name"
                    xs12
                    sm10
                    offset-sm1
                    md4
                    offset-md0>
                    <v-card
                      light>
                      <v-card-title
                        class="justify-center headline secondary white--text">
                        {{ membership.name }}
                      </v-card-title>
                      <v-card-text
                        class="text-xs-center subheading pb-0">
                        Price:
                        <span
                          class="font-weight-bold">
                          {{ membership.price }}
                        </span>
                      </v-card-text>
                      <v-card-text
                        class="text-xs-center subheading pt-0">
                        Net worth: 
                        <span
                          class="font-weight-bold">
                          {{ membership.networth }}
                        </span>
                      </v-card-text>
                      <v-divider />
                      <v-list>
                        <v-list-tile
                          v-for="(benefit, i) in membership.benefits"
                          :key="membership.name + benefit + i">
                          <v-list-tile-content>
                            <p
                              class="text-xs-center align-self-center">
                              {{ benefit }}
                            </p>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                      <v-card-actions
                        class="justify-center">
                        <v-btn
                          :to="membership.path"
                          round
                          large
                          nuxt
                          color="primary"
                          class="black--text">
                          {{ membership.cta }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
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
      Title
    },
    data() {
      return {
        memberships: [
          {
            name: "Iron",
            price: "Free",
            networth: "None",
            benefits: [
              "1 hour access per day",
              "Lap Pool",
            ],
            path: "/signup",
            cta: "Register",
          },
          {
            name: "Bronze",
            price: "10 million",
            networth: "100 million",
            benefits: [
              "4 hour access per day",
              "Lap Pool",
              "Wave Pool",
              "Recreational Pool",
            ],
            path: "/about",
            cta: "Inquire",
          },
          {
            name: "Silver",
            price: "50 million",
            networth: "500 million",
            benefits: [
              "8 hour access per day",
              "Cafeteria access",
              "Lap Pool",
              "Wave Pool",
              "Recreational Pool",
              "Diving Pool",
            ],
            path: "/about",
            cta: "Inquire",
          },
          {
            name: "Gold",
            price: "550 million",
            networth: "1.1 billion",
            benefits: [
              "24 hour access per day",
              "Cafeteria access",
              "Lap Pool",
              "Wave Pool",
              "Recreational Pool",
              "Diving Pool",
              "Spa",
              "Jacuzzi",
              "Sauna",
            ],
            path: "/about",
            cta: "Inquire",
          },
          {
            name: "VIP",
            price: "Must be a gold member",
            networth: "Must be a top 10 taxpayer",
            benefits: [
              "24 hour access per day",
              "Cafeteria access",
              "Lounge access",
              "Concierge",
              "Lap Pool",
              "Wave Pool",
              "Recreational Pool",
              "Diving Pool",
              "Spa",
              "Jacuzzi",
              "Sauna",
            ],
            path: "/about",
            cta: "Inquire",
          },
        ]
      }
    }
  }
</script>

<style>
</style>
