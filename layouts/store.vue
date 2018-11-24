<template>
  <v-app>
    <MainDrawer v-model="drawer" />
    <TheHeader
      :gen-navs="allNavs.genNavs"
      :user-navs="allNavs.userNavs"
      @drawer="drawer = !drawer"
      @navDrawer="navDrawer = !navDrawer" />
    <NavDrawer
      :gen-navs="allNavs.genNavs"
      :user-navs="allNavs.userNavs"
      v-model="navDrawer" />
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
        drawer: false,
        navDrawer: false,
        allNavs: {
          genNavs: [
            {
              dropdown: true,
              name: "News & Events",
              items: [
                {
                  name: "News",
                  path: "/news",
                  icon: "rss_feed"
                },
                {
                  name: "Events",
                  path: "/events",
                  icon: "event_note"
                },
              ]
            },
            {
              name: "Facilities",
              path: "/facilities",
              icon: "pool"
            },
            {
              name: "Membership",
              path: "/membership",
              icon: "card_membership"
            },
            {
              name: "Store",
              path: "/store",
              icon: "store_mall_directory"
            },
            {
              name: "About",
              path: "/about",
              icon: "sentiment_satisfied_alt"
            },
          ],
          userNavs: [
            { name: "Cart", path: "/cart"
            },
            {
              name: "Signin",
              path: "/signin"
            },
            {
              name: "Signup",
              path: "/signup"
            },
            {
              name: "Signout",
              path: "/signout"
            },
          ]
        }
      }
    }
  }
</script>

<style>
</style>
