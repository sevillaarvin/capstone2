<template>
  <v-footer
    dark
    height="auto"
    color="secondary">
    <v-btn
      v-for="link in links"
      :key="link.name"
      :to="link.path"
      flat
      round
      nuxt>
      {{ link.name }}
    </v-btn>
    <v-spacer />
    <div
      class="mr-3">
      <span>
        &copy; {{ new Date().getFullYear() }}
      </span>
      <span>
        Club Seville International
      </span>
    </div>
  </v-footer>
</template>

<script>
  export default {
    data() {
      return {
        links: [{
          name: "Terms",
          path: "/terms",
        }, {
          name: "Privacy Policy",
          path: "/privacy",
        }]
      }
    }
  }
</script>
