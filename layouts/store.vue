<template>
  <v-app>
    <TheDrawer v-model="drawer" />
    <TheHeader @drawer="drawer = !drawer" />
  </v-app>
</template>

<script>
  import TheHeader from "~/components/TheHeader"
  import TheDrawer from "@/components/TheDrawer"

  export default {
    components: {
      TheHeader,
      TheDrawer
    },
    data() {
      return {
        drawer: false
      }
    }
  }
</script>

<style>
</style>
