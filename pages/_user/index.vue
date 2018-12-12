<template>
  <v-layout>
    USER
  </v-layout>
</template>

<script>
  export default {
    created() {
      // TODO: check if own page
      const { user: unauthorizedUser } = this.$route.params
      const { username: authorizedUser } = this.$auth.$state.user
    },
    asyncData(context) {
    },
    layout: "user",
  }
</script>

<style>
</style>
