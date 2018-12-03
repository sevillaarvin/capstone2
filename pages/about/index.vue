<template>
  <v-layout>
    <v-flex xs12>
      <v-container fluid>
        <Title :title="'About'" />
        <v-layout>
          <v-flex xs12>
            <v-timeline
              :dense="$vuetify.breakpoint.xsOnly">
              <v-timeline-item
                v-for="item in items"
                :key="item.title">
                <span slot="opposite">
                  {{ item.label }}
                </span>
                <v-card
                  class="elevation-2">
                  <v-card-title
                    class="title hidden-sm-and-up">
                    {{ item.label }}
                  </v-card-title>
                  <v-card-text>
                    {{ item.description }}
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
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
    data() {
      return {
        items: [
          {
            title: "Purpose",
            label: "Purpose",
            description: "It is purpose that created us. Purpose that connects us. Purpose that guides us, that drives us. It is purpose that defines us. Purpose that binds us."
          },
          {
            title: "Vision",
            label: "Vision",
            description: "It is purpose that created us. Purpose that connects us. Purpose that guides us, that drives us. It is purpose that defines us. Purpose that binds us."
          },
          {
            title: "Mission",
            label: "Mission",
            description: "It is purpose that created us. Purpose that connects us. Purpose that guides us, that drives us. It is purpose that defines us. Purpose that binds us."
          },
        ]
      }
    }
  }
</script>

<style>
</style>
