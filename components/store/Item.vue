<template>
  <v-card
    class="cursor-pointer"
    @click="onClick">
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
        console.log(JSON.stringify(this.item, null, 2))
        this.$store.dispatch("setCurrentItem", this.item)
        this.$router.push(this.itemLink)
      }
    }
  }
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
