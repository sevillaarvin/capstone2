<template>
  <v-app
    dark>
    <TheHeader
      :gen-navs="allNavs.genNavs"
      :user-navs="allNavs.userNavs"
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
        <nuxt />
      </v-container>
    </v-content>
    <TheFooter />
  </v-app>
</template>

<script>
  import TheHeader from "~/components/TheHeader"
  import NavDrawer from "@/components/NavDrawer"
  import TheFooter from "~/components/TheFooter"

  export default {
    components: {
      TheHeader,
      NavDrawer,
      TheFooter,
    },
    data() {
      return {
        drawer: false,
        navDrawer: false,
      }
    },
    computed: {
      allNavs() {
        return this.$store.getters.allNavs
      }
    }
  }
</script>
