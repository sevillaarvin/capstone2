<template>
  <v-layout>
    DASHBOARD
  </v-layout>
</template>

<script>
  export default {
    created() {
      console.log(JSON.stringify(this.$auth.$state, null, 2))
    }
  }
</script>

<style>
</style>
