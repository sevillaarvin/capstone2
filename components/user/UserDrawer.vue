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
        :src="userInfo.avatar"
        contain
        height="100" />
      <v-card-title
        class="justify-center">
        {{ `${userInfo.firstName} ${userInfo.lastName}` }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          placeholder="Search"/>
      </v-card-text>
    </v-card>
    <v-list>
      <!--
      <template
        v-for="link in userLinks">
        <v-list-group
          v-if="link.pages"
          :key="link.name">
          <v-list-tile slot="activator">
            {{ link.name }}
          </v-list-tile>
          <v-list-tile
            v-for="page in link.pages"
            :key="page.name"
            :to="adminLink(page.path)"
            nuxt>
            <v-list-tile-action>
              <v-icon>{{ page.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>
              {{ page.name }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list-group>
        <v-list-tile
          v-else
          :key="link.name"
          :to="userLink(link.path)"
          nuxt>
          <v-list-tile-content>
            {{ link.name }}
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          :key="link.name + '1'" />
      </template>
      -->
      <template
        v-for="link in userLinks">
        <v-list-tile
          :key="link.name"
          :to="userLink(link.path)"
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
      userInfo: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        userLinks: [
          {
            name: "Profile",
            path: "/profile",
            admin: false,
          },
          {
            name: "Orders",
            path: "/orders",
            admin: false,
          },
          {
            name: "Events",
            path: "/events",
            admin: false,
          },
          // {
          //   name: "Admin",
          //   path: "/admin",
          //   admin: true,
          //   pages: [
          //     {
          //       name: "Members",
          //       path: "/members",
          //     },
          //     {
          //       name: "Items",
          //       path: "/items",
          //     },
          //     {
          //       name: "Orders",
          //       path: "/orders",
          //     },
          //     {
          //       name: "Events",
          //       path: "/events",
          //     },
          //   ],
          // },
        ]
      }
    },
    methods: {
      userLink(link) {
        return '/' + encodeURIComponent(this.userInfo.username) + link
      },
      // adminLink(link) {
      //   return this.userLink("/admin") + link
      // }
    },
  }
</script>

<style>
</style>
