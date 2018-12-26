<template>
  <v-layout>
    <v-flex
      :py-5="$vuetify.breakpoint.mdAndUp"
      :py-3="!$vuetify.breakpoint.mdAndUp"
      xs12>
      <h1
        class="display-2 text-xs-center">{{ title }}</h1>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      }
    }
  }
</script>

<style>
</style>
