<template>
  <v-navigation-drawer
    :value="value"
    fixed
    app
    right
    temporary
    @input="$emit('input', $event)">
    <v-list
      class="hidden-lg-and-up">
      <template
        v-for="nav in genNavs">
        <v-list-group
          v-if="nav.dropdown"
          :key="nav.name">
          <v-list-tile slot="activator">
            {{ nav.name }}
          </v-list-tile>
          <v-list-tile
            v-for="item in nav.items"
            :key="item.name"
            :to="item.path"
            nuxt>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>
              {{ item.name }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list-group>
        <v-list-tile
          v-else
          :key="nav.name"
          :to="nav.path"
          nuxt>
          <v-list-tile-action>
            <v-icon>{{ nav.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ nav.name }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <v-divider
      class="hidden-sm-and-up"/>
    <v-list
      class="hidden-sm-and-up">
      <v-list-tile
        v-for="nav in userNavs"
        :key="nav.name"
        :to="nav.path"
        nuxt>
        <v-list-tile-action>
          <v-icon>{{ nav.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          {{ nav.name }}
        </v-list-tile-title>
      </v-list-tile>
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
