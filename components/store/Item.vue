<template>
  <v-card
    :to="itemLink"
    nuxt>
    <v-img
      :src="item.img || ''"
      contain
      height="150" />
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
    },
    computed: {
      itemLink() {
        const { category, name } = this.item
        return encodeURIComponent(category) + "/" + encodeURIComponent(name)
      }
    },
    created() {
      // console.log(this.item)
    },
  }
</script>
