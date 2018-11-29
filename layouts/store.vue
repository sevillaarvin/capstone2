<template>
  <v-app>
    <MainDrawer v-model="drawer" />
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
            {
              name: "Cart",
              path: "/store/cart",
              icon: "shopping_cart"
            },
            {
              name: "Signin",
              path: "/signin",
              icon: "person"
            },
            {
              name: "Signup",
              path: "/signup",
              icon: "person_add"
            },
            {
              name: "Signout",
              path: "/signout",
              icon: "exit_to_app"
            },
          ]
        }
      }
    }
  }
</script>

<style>
</style>
