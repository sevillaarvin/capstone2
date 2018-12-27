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
            v-for="n in 5"
            :key="n"
            xs12
            class="mb-3">
            <v-card
              :to="'/news/' + test"
              nuxt>
              <v-layout
                row
                wrap>
                <v-flex
                  xs12
                  sm4
                  md5>
                  <v-img
                    contain
                    src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" />
                </v-flex>
                <v-flex
                  xs12
                  sm8
                  md7>
                  <v-card-title
                    primary-title
                    class="title">
                    This Is The Headline
                  </v-card-title>
                  <v-card-text>
                    The news is that nothing is true, everything is permitted. Here at blah blah, we have blah blah blah blah blah.
                    The news is that nothing is true, everything is permitted. Here at blah blah, we have blah blah blah blah blah.
                    The news is that nothing is true, everything is permitted. Here at blah blah, we have blah blah blah blah blah...
                    <span>
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
    }
  }
</script>

<style>
</style>
