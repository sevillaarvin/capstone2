<template>
  <v-layout>
    <v-flex xs12>
      <v-container>
        <Title :title="'About'" />
        <v-layout>
          <v-flex xs12>
            <v-timeline
              :dense="isXsScreen">
              <v-timeline-item
                v-for="item in items"
                :key="item.title">
                <div
                  slot="opposite">
                  <span
                    class="headline">
                    {{ item.label }}
                  </span>
                </div>
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
        <Title :title="'Contact'" />
        <v-container
          fluid
          grid-list-xl
          class="pt-0">
          <v-layout
            row
            wrap>
            <v-flex
              v-for="n in 3"
              :key="n"
              xs12
              md4>
              <v-card>
                <v-card-title
                  primary-title
                  class="justify-center title">
                  Headquarters
                </v-card-title>
                <v-layout>
                  <v-flex
                    xs12>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.4101322936885!2d121.04148385087574!3d14.632645089731954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7afe6a39331%3A0xd367e6dc5e274032!2sCaswynn+Building%2C+134+Timog+Ave%2C+Diliman%2C+Quezon+City%2C+Metro+Manila%2C+Philippines!5e0!3m2!1sen!2sin!4v1540603840894"
                      width="100%"
                      height="100%"
                      frameborder="0"
                      style="border:0"
                      allowfullscreen />
                  </v-flex>
                </v-layout>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon>
                        email
                      </v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        sample@sample.com
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon>
                        location_on
                      </v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        134 Timog Ave. Caswynn Building
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon>
                        phone
                      </v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        123-1234
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
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
        isHydrated: false,
        items: [
          {
            title: "Purpose",
            label: "Purpose",
            description: "It is purpose that created us. Purpose that connects us. Purpose that guides us, that drives us. It is purpose that defines us. Purpose that binds us.",
          },
          {
            title: "Vision",
            label: "Vision",
            description: "It is purpose that created us. Purpose that connects us. Purpose that guides us, that drives us. It is purpose that defines us. Purpose that binds us.",
          },
          {
            title: "Mission",
            label: "Mission",
            description: "It is purpose that created us. Purpose that connects us. Purpose that guides us, that drives us. It is purpose that defines us. Purpose that binds us.",
          },
          {
            title: "2018",
            label: "2018",
            description: "The company was founded.",
          },
        ]
      }
    },
    computed: {
      isXsScreen() {
        // Breakpoint workaround
        // https://github.com/vuetifyjs/vuetify/issues/3436#issuecomment-371872303
        // data: isHydrated = false
        // mounted: isHydrated = true
        // computed: if isHydrated = return desired true value
        return this.isHydrated
          ? this.$vuetify.breakpoint.xsOnly
          : false // "empty" $breakpoint object with initial values
      },
    },
    mounted() {
      this.isHydrated = true
    },
  }
</script>

<style>
</style>
