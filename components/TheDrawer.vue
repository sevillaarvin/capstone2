<template>
  <v-navigation-drawer
    :value="value"
    fixed
    temporary
    @input="$emit('input', $event)">
    <v-img />
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
