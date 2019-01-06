<template>
  <v-card
    :disabled="!item.quantity"
    :to="itemLink"
    :color="!item.quantity ? 'grey' : ''"
    nuxt
    height="350"
    @click="onClick">
    <v-img
      :src="item.img || ''"
      contain
      height="150" />
    <v-card-title
      class="justify-center font-weight-bold">
      <span
        class="pr-1">
        {{ item.name }}
      </span>
      <v-badge
        v-if="item.quantity"
        color="secondary">
        <span
          slot="badge">
          {{ item.quantity }}
        </span>
      </v-badge>
    </v-card-title>
    <v-card-title
      v-if="!item.quantity"
      class="white--text font-weight-bold justify-center text-xs-center py-0">
      Out of Stock
    </v-card-title>
    <v-card-text
      class="text-xs-center">
      <v-rating
        v-model="item.rating"
        dense
        half-increments
        readonly />
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
        const { category, sku } = this.item
        return "/store/" + encodeURIComponent(category) + "/" + encodeURIComponent(sku)
      }
    },
    methods: {
      onClick() {
        // this.$store.dispatch("setCurrentItem", this.item)
        // this.$router.push(this.itemLink)
      }
    }
  }
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
