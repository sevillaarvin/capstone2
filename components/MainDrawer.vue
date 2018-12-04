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
      <v-list-tile
        to="/store"
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
    },
    computed: {
      categories() {
        return this.$store.getters.categories
      }
    }
  }
</script>

<style>
</style>
