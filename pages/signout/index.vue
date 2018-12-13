<template>
  <v-layout>
    <v-flex xs12>
      You will automatically be redirected.
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch("signOutUser")
      this.$auth.logout()
    }
  }
</script>

<style>
</style>
