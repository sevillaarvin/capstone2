<template>
  <v-layout>
    <v-flex
      pb-3
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
