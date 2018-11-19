<template>
  <v-toolbar>
    <v-toolbar-side-icon
      @click="$emit('drawer')"/>
    <v-container
      fluid
      fill-height
      d-flex
      justify-start>
      <v-toolbar-items>
        <v-btn
          v-for="nav in genNavs"
          :key="nav.name"
          :to="nav.path"
          flat>
          {{ nav.name }}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-title>
        TITLE
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn
          v-for="nav in userNavs"
          :key="nav.name"
          :to="nav.path"
          flat>
          {{ nav.name }}
        </v-btn>
      </v-toolbar-items>
    </v-container>
  </v-toolbar>
</template>

<script>
  export default {
    data() {
      return {
        genNavs: [
          {
            name: "News",
            path: "/news"
          },
          {
            name: "Events",
            path: "/events"
          },
          {
            name: "Facilities",
            path: "/facilities"
          },
          {
            name: "Membership",
            path: "/membership"
          },
          {
            name: "Store",
            path: "/store"
          },
          {
            name: "About",
            path: "/about"
          },
        ],
        userNavs: [
          {
            name: "Cart",
            path: "/cart"
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
    },
  }
</script>

<style>
</style>
