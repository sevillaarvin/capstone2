<template>
  <v-layout>
    <v-flex
      xs12
      sm8
      offset-sm2
      md6
      offset-md3>
      <v-card>
        <v-container>
          <v-layout>
            <v-flex>
              <v-card-title
                primary-title
                class="headline justify-center text-xs-center pb-0">
                {{ article.title }}
              </v-card-title>
              <v-subheader class="justify-center">
                {{ article.date | long-date }}
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex
              xs12>
              <v-card>
                <v-img
                  :src="article.cover"
                  contain
                  class="left mx-2"
                  width="300" />
                <v-card-text>
                  {{ article.content }}
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import Title from "~/components/TheTitle"
  
  export default {
    components: {
      Title
    },
    async asyncData({ store, route }) {
      return {
        article: store.getters["activities/news"]
          .find((article) => {
          return article.id == route.params.article
        })
      }
    },
  }
</script>

<style>
</style>
