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
          v-if="user.avatar"
          size="100">
          <v-img
            :src="user.avatar"
            class="cursor-pointer"
            @click="gotoDashboard" />
        </v-avatar>
        <v-avatar
          v-else
          size="100">
          <v-icon
            size="100"
            @click="gotoDashboard">
            account_circle
          </v-icon>
        </v-avatar>
      </div>
      <v-card-title
        class="justify-center">
        {{ user.firstName }} {{ user.lastName }}
      </v-card-title>
    </v-card>
    <v-list>
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
            name: "Cart",
            path: "/cart",
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
    computed: {
      user() {
        return this.userInfo || {
          username: "Anonymous",
          firstName: "Anonymous",
        }
      }
    },
    methods: {
      userLink(link) {
        return '/' + encodeURIComponent(this.userInfo.username) + link
      },
      gotoDashboard() {
        this.$router.push(this.userLink())
      },
    },
  }
</script>

<style
  scoped>
  .cursor-pointer {
    cursor: pointer;
  }
</style>
