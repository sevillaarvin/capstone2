<template>
  <v-app>
    <UserDrawer
      :user-info="userInfo"
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
      },
      userInfo() {
        const user = this.$store.getters.userInfo
        if (!user.avatar) {
          user.avatar = "http://i.pravatar.cc/150?u=Anonymous'"
        }
        return user
      }
    },
    middleware: [
      "auth",
      "user",
    ]
  }
</script>

<style>
</style>
