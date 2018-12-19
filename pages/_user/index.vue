<template>
  <v-layout>
    <v-flex
      xs12>
      <v-container
        app>
        <Title
          title="Dashboard" />
        <v-layout>
          <v-flex
            xs6>
            Orders
          </v-flex>
          <v-flex
            xs6>
            Events
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import Title from "~/components/TheTitle"

  export default {
    components: {
      Title
    },
    created() {
      // TODO: check if own page
      const { user: unauthorizedUser } = this.$route.params
      const { username: authorizedUser } = this.$auth.$state.user
    },
    layout: "user",
  }
</script>

<style>
</style>
