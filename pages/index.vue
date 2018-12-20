<template>
  <v-layout>
    <v-flex xs12>
      <v-carousel
        height="720"
        hide-controls
        hide-delimiters>
        <v-carousel-item
          v-for="item in items"
          :key="item"
          :src="item">
          <v-container
            fill-height
            pa-0
            fluid>
            <v-layout
              justify-center
              align-center>
              <v-flex
                text-xs-center
                xs12
                class="jumbotron py-5">
                <h1>Experience Real Luxury</h1>
                <div>
                  <v-btn
                    @click="$router.push('/signup')">
                    Be a Member
                  </v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [
        "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
      ]
    }
  },
  beforeCreate() {
    if (this.$auth.$state.loggedIn) {
      let link

      // TODO: Fix admin authorization
      if (this.$auth.$state.user.roleId === 1) {
        link = "/" + encodeURIComponent(this.$auth.$state.user.username)
      } else {
        link = "/admin"
      }

      this.$router.replace(link)
    }
  },
  layout: "landing"
}
</script>

<style scoped>
.jumbotron {
  background-color: rgba(255,255,255, 0.3);
}
</style>
