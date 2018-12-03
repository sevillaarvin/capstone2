<template>
  <v-app>
    <UserDrawer
      :user="$route.params.user"
      v-model="drawer" />
    <TheHeader
      :gen-navs="allNavs.genNavs"
      :user-navs="allNavs.userNavs"
      drawer
      @drawer="drawer = !drawer"
      @navDrawer="navDrawer = !navDrawer" />
    <NavDrawer
      :gen-navs="allNavs.genNavs"
      :user-navs="allNavs.userNavs"
      v-model="navDrawer" />
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import TheHeader from "~/components/TheHeader"
  import UserDrawer from "@/components/user/UserDrawer"
  import NavDrawer from "@/components/NavDrawer"

  export default {
    components: {
      TheHeader,
      UserDrawer,
      NavDrawer,
    },
    data() {
      return {
        drawer: null,
        navDrawer: false,
      }
    },
    computed: {
      allNavs() {
        return this.$store.getters.allNavs
      }
    },
    middleware: ["auth"]
  }
</script>

<style>
</style>
