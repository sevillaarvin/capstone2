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
      <div
        class="text-xs-center">
        <v-avatar
          v-if="userInfo.avatar"
          size="100">
          <v-img
            :src="userInfo.avatar" />
        </v-avatar>
        <v-avatar
          v-else
          size="100">
          <v-icon
            size="100">
            account_circle
          </v-icon>
        </v-avatar>
      </div>
      <v-card-title
        class="justify-center">
        {{ userInfo.firstName }} {{ userInfo.lastName }}
      </v-card-title>
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
          exact
          active-class="default-class secondary--text"
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
        ]
      }
    },
    methods: {
      userLink(link) {
        return '/' + encodeURIComponent(this.userInfo.username) + link
      },
    },
  }
</script>

<style>
</style>
