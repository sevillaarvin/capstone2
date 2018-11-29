<template>
  <v-layout>
    <v-flex xs12>
      <v-container
        fluid
        grid-list-md>
        <Title :title="'Membership'" />
        <v-layout
          justify-center
          row
          wrap>
          <v-flex
            v-for="membership in memberships"
            :key="membership.name"
            xs12
            sm6
            md4
            lg3>
            <v-card>
              <v-card-title
                class="justify-center">
                <h3 class="display-1">{{ membership.name }}</h3>
              </v-card-title>
              <v-subheader
                class="justify-center">
                <v-card-text
                  class="text-xs-center">
                  Price: {{ membership.price }}
                </v-card-text>
              </v-subheader>
              <v-subheader
                class="justify-center">
                <v-card-text
                  class="text-xs-center">
                  Net worth: {{ membership.networth }}
                </v-card-text>
              </v-subheader>
              <v-list>
                <v-list-tile
                  v-for="benefit in membership.benefits"
                  :key="benefit">
                  <v-list-tile-content>
                    <v-card-text>
                      {{ benefit }}
                    </v-card-text>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-card-actions
                class="justify-center">
                <v-btn>
                  Register
                </v-btn>
              </v-card-actions>
            </v-card>
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
        memberships: [
          {
            name: "Iron",
            price: "Free",
            networth: "None",
            benefits: [
              "Lap pool - 1 hour per day",
            ],
          },
          {
            name: "Bronze",
            price: "10 million",
            networth: "100 million",
            benefits: [
              "Lap pool - 1 hour per day",
            ],
          },
          {
            name: "Silver",
            price: "50 million",
            networth: "500 million",
            benefits: [
              "Lap pool - 1 hour per day",
            ],
          },
          {
            name: "Gold",
            price: "550 million",
            networth: "1.1 billion",
            benefits: [
              "Lap pool - 1 hour per day",
            ],
          },
          {
            name: "VIP",
            price: "Must be a gold member",
            networth: "Must be a top 10 taxpayer",
            benefits: [
              "Lap pool - 1 hour per day",
            ],
          },
        ]
      }
    }
  }
</script>

<style>
</style>
