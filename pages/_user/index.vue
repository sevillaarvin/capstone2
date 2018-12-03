<template>
  <v-layout>
    USER
  </v-layout>
</template>

<script>
  export default {
    created() {
      const asdf = JSON.stringify(this.$route.params, null, 2)
      console.log(asdf)
    },
    layout: "user"
  }
</script>

<style>
</style>
