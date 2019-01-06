<template>
  <!--
  <v-card>
    <v-layout
      row
      wrap>
      <v-flex
        xs12
        sm2>
        <v-layout
          row
          wrap>
          <v-flex
            xs12>
            <v-avatar
              v-if="rating.avatar"
              size="50">
              <v-img
                :src="rating.avatar" />
            </v-avatar>
            <v-avatar
              v-else
              size="50">
              <v-icon
                size="50">
                account_circle
              </v-icon>
            </v-avatar>
          </v-flex>
          <v-flex
            xs12>
            {{ rating.firstName }}
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex
        xs12
        sm4>
        <v-rating
          v-model="rating.stars"
          dense
          half-increments
          readonly />
      </v-flex>
      <v-flex
        xs12
        sm6>
        <v-card-text>
          {{ rating.comment }}
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-card>
  -->
  <v-card>
    <v-list
      three-line>
      <v-list-tile>
        <v-list-tile-avatar>
          <v-avatar
            v-if="rating.avatar"
            size="50">
            <v-img
              :src="rating.avatar" />
          </v-avatar>
          <v-avatar
            v-else
            size="50">
            <v-icon
              size="50">
              account_circle
            </v-icon>
          </v-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ rating.firstName }}
          </v-list-tile-title>
          <v-rating
            v-model="rating.stars"
            dense
            small
            half-increments
            readonly />
          <v-list-tile-sub-title>
            {{ rating.comment }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    props: {
      rating: {
        type: Object,
        required: true,
      },
    },
  }
</script>
