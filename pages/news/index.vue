<template>
  <v-layout>
    <v-flex xs12>
      <v-container
        grid-list-xl
        class="pt-0">
        <Title
          :title="'News'" />
        <v-layout
          row
          wrap>
          <v-flex
            v-for="article in news"
            :key="article.id"
            xs12
            class="mb-3">
            <v-card
              :to="`/news/${article.id}`"
              nuxt>
              <v-layout
                row
                wrap>
                <v-flex
                  xs12
                  sm4
                  md5>
                  <v-img
                    :src="article.cover"
                    contain />
                </v-flex>
                <v-flex
                  xs12
                  sm8
                  md7>
                  <v-card-title
                    primary-title
                    class="title">
                    {{ article.title }}
                  </v-card-title>
                  <v-card-text>
                    {{ article.content | short-desc }}
                    <span
                      class="primary--text">
                      Read more
                    </span>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import Title from "~/components/TheTitle"

  export default {
    components: {
      Title
    },
    async asyncData({ store }) {
      return {
        news: store.getters["activities/news"]
      }
    },
  }
</script>

<style>
</style>
