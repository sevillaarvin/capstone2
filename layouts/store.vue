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
      <v-container
        fluid
        fill-height
        class="pa-0">
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
      "user",
    ]
  }
</script>

<style>
</style>
