<template>
  <v-card
    :to="'/store/' + item.category + '/' + item.id"
    nuxt>
    <v-img
      :src="item.img" />
    <v-card-title
      class="justify-center font-weight-bold">
      {{ item.name }}
    </v-card-title>
    <v-card-text
      class="text-xs-center">
      <v-rating v-model="item.rating" />
      {{ item.price | currency }}
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>
