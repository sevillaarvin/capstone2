<template>
  <v-layout>
    &nbsp;
  </v-layout>
</template>

<script>
  export default {
    fetch({ redirect }) {
      redirect(301, "/store/cart")
    },
  }
</script>
