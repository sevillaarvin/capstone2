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
        fab: false,
      }
    },
    computed: {
      allNavs() {
        return this.$store.getters.allNavs
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
  }
</script>
