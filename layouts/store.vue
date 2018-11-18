<template>
  <v-app>
    <v-navigation-drawer
      v-model="sideNav"
      temporary
      fixed>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          to="/">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{ item.title }}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      dark
      class="purple darken-1">
      <v-toolbar-side-icon
        class="hidden-sm-and-up"
        @click="sideNav = !sideNav"/>
      <v-toolbar-title>
        <nuxt-link
          to="/"
          tag="span"
          style="cursor: pointer;">Title Store</nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-for="item in menuItems"
          :key="item.title"
          flat>
          <v-icon
            left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
<!--
  <div @click="console.log('hmm')">Test</div>
-->
</template>

<script>
  export default {
    data() {
      return {
        sideNav: false,
        menuItems: [
          {icon: "supervisor_account", title: "View Meetups"},
          {icon: "room", title: "Organize Meetup"},
          {icon: "person", title: "Profile"},
          {icon: "face", title: "Sign up"},
          {icon: "lock_open", title: "Sign in"}
        ]
      }
    }
  }
</script>

<style scoped>
.test {
  background-color: red;
}

.hmm {
  background-color: orange;
}

.what {
  background-color: blue;
}
</style>
