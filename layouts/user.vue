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
      <v-container
        fluid>
        <nuxt />
        <v-fab-transition>
          <v-btn
            v-scroll="onScroll"
            v-show="fab"
            fab
            fixed
            bottom
            right
            color="secondary"
            @click="toTop">
            <v-icon>
              keyboard_arrow_up
            </v-icon>
          </v-btn>
        </v-fab-transition>
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
        fab: false,
        drawer: null,
        navDrawer: false,
      }
    },
    computed: {
      allNavs() {
        return this.$store.getters.allNavs
      },
      userInfo() {
        return this.$store.getters.userInfo
      }
    },
    methods: {
      onScroll() {
        this.fab = (window.pageYOffset || document.documentElement.scrollTop) > 300
      },
      toTop() {
        this.$vuetify.goTo(0)
      },
    },
    middleware: [
      "auth",
      "user",
    ]
  }
</script>

<style>
</style>
