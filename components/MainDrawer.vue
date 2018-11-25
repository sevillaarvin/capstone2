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
        v-for="category in 5">
        <v-list-tile
          :key="category"
          :to="'/store/' + category"
          nuxt>
          <v-list-tile-content>
            Category {{ category }}
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          :key="category + '' + category" />
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
      }
    },
    data() {
      return {
      }
    }
  }
</script>

<style>
</style>
