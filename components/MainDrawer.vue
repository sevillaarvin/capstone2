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
            @click="gotoDashboard" >
            account_circle
          </v-icon>
        </v-avatar>
      </div>
      <v-card-title
        class="justify-center">
        {{ user.firstName }} {{ user.lastName }}
      </v-card-title>
      <v-card-actions>
        <SearchBar
          drawer />
      </v-card-actions>
    </v-card>
    <v-list>
      <v-list-tile
        to="/store"
        exact
        active-class="default-class secondary--text"
        nuxt>
        <v-list-tile-content>
          All
        </v-list-tile-content>
      </v-list-tile>
      <v-divider />
      <template
        v-for="category in categories">
        <v-list-tile
          :key="category.id"
          :to="'/store/' + category.name"
          active-class="default-class secondary--text"
          nuxt>
          <v-list-tile-content>
            {{ category.name }}
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          :key="category.name + category.id" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import SearchBar from "@/components/store/SearchBar"

  export default {
    components: {
      SearchBar,
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      userInfo: {
        type: Object,
        default: null,
      }
    },
    data() {
      return {
        search: "",
      }
    },
    computed: {
      categories() {
        return this.$store.getters.categories
      },
      user() {
        return this.userInfo || {
          username: "Anonymous",
          firstName: "Anonymous",
        }
      },
    },
    methods: {
      gotoDashboard() {
        this.$router.push("/")
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
