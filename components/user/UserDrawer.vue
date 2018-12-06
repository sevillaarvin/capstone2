<template>
  <v-navigation-drawer
    :value="value"
    app
    clipped
    fixed
    @input="$emit('input', $event)">
    <v-card
      flat
      class="mt-3">
      <v-img
        contain
        height="100"
        src="https://randomuser.me/api/portraits/men/85.jpg" />
      <v-card-title
        class="justify-center">
        Juan dela Cruz
      </v-card-title>
      <v-card-text>
        <v-text-field
          placeholder="Search"/>
      </v-card-text>
    </v-card>
    <v-list>
      <template
        v-for="link in userLinks">
        <v-list-tile
          :key="link.name"
          :to="userLink"
          nuxt>
          <v-list-tile-content>
            {{ link.name }}
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          :key="link.name + '1'" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      user: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        userLinks: [
          {
            name: "Profile",
            path: "/profile",
          },
          {
            name: "Orders",
            path: "/orders",
          },
          {
            name: "Events",
            path: "/events",
          },
          {
            name: "Admin",
            path: "/admin",
          },
        ]
      }
    },
    computed: {
      userLink() {
        return '/' + encodeURIComponent(user) + link.path
      }
    },
  }
</script>

<style>
</style>
