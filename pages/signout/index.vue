<template>
  <v-layout>
    <v-flex xs12>
      &nbsp;
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch("signOutUser")
      this.$auth.logout()
      this.$router.replace("/")
    }
  }
</script>

<style>
</style>
