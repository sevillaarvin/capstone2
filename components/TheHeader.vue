<template>
  <v-toolbar>
    <v-toolbar-side-icon
      @click="$emit('drawer')"/>
    <v-toolbar-title>
      Brand
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
              :key="item.name">
              <v-list-tile-content>
                <nuxt-link
                  :to="item.path"
                  tag="span">
                  {{ item.name }}
                </nuxt-link>
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
      <v-btn
        v-for="nav in userNavs"
        :key="nav.name"
        :to="nav.path"
        flat>
        {{ nav.name }}
      </v-btn>
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

<style>
</style>
