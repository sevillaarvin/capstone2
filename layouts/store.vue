<template>
  <v-app>
    <MainDrawer
      v-model="drawer"
      :user-info="userInfo" />
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
  import MainDrawer from "@/components/MainDrawer"
  import NavDrawer from "@/components/NavDrawer"

  export default {
    components: {
      TheHeader,
      MainDrawer,
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
      },
      userInfo() {
        return this.$store.getters.userInfo || {
          firstName: "Anonymous",
          lastName: "",
          username: "",
          avatar: "http://i.pravatar.cc/150?u=Anonymous",
        }
      }
    },
    middleware: [
      "user",
    ]
  }
</script>

<style>
</style>
