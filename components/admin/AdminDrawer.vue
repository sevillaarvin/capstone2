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
        :src="adminInfo.avatar"
        contain
        height="100" />
      <v-card-title
        class="justify-center">
        {{ `${adminInfo.firstName} ${adminInfo.lastName}` }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          placeholder="Search"/>
      </v-card-text>
    </v-card>
    <v-list>
      <template
        v-for="link in adminLinks">
        <v-list-tile
          :key="link.name"
          :to="adminLink(link.path)"
          nuxt>
          <v-list-tile-content>
            {{ link.name }}
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          :key="link.name + '0'" />
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
      adminInfo: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        adminLinks: [
          {
            name: "Profile",
            path: "/profile",
          },
          {
            name: "Members",
            path: "/members",
          },
          {
            name: "Items",
            path: "/items",
          },
          {
            name: "Orders",
            path: "/orders",
          },
          {
            name: "Events",
            path: "/events",
          },
        ]
      }
    },
    methods: {
      adminLink(link) {
        return "/admin" + link
      },
    },
  }
</script>

<style>
</style>
