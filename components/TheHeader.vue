<template>
  <v-toolbar
    app
    clipped-left>
    <v-toolbar-side-icon
      v-if="drawer"
      @click="$emit('drawer')"/>
    <v-toolbar-title
      class="pr-1">
      <nuxt-link
        class="cursor-pointer"
        tag="span"
        to="/">
        Club Seville Int.
      </nuxt-link>
    </v-toolbar-title>
    <v-toolbar-items
      class="hidden-md-and-down">
      <template
        v-for="nav in genNavs">
        <v-menu
          v-if="nav.dropdown"
          :key="nav.name">
          <v-btn
            slot="activator"
            flat>
            {{ nav.name }}
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="item in nav.items"
              :key="item.name"
              :to="item.path"
              class="cursor-pointer">
              <v-list-tile-content>
                {{ item.name }}
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn
          v-else
          :key="nav.name"
          :to="nav.path"
          flat>
          {{ nav.name }}
        </v-btn>
      </template>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items
      class="hidden-xs-only">
      <template
        v-for="nav in userNavs">
        <v-btn
          v-if="!nav.guard"
          :key="nav.name"
          :to="nav.path"
          flat>
          {{ nav.name }}
        </v-btn>
        <v-btn
          v-else-if="nav.auth == $auth.$state.loggedIn"
          :key="nav.name"
          :to="nav.path"
          flat>
          {{ nav.name }}
        </v-btn>
      </template>
    </v-toolbar-items>
    <v-btn
      icon
      class="hidden-lg-and-up"
      @click="$emit('navDrawer')">
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    props: {
      drawer: {
        type: Boolean,
        default: false
      },
      genNavs: {
        type: Array,
        required: true
      },
      userNavs: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
      }
    },
  }
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
