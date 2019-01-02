<template>
  <v-layout>
    <v-flex xs12>
      <v-container>
        <v-card>
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
                    class="elevation-2"
                    light>
                    <v-card-title
                      class="title hidden-sm-and-up">
                      {{ item.label }}
                    </v-card-title>
                    <v-card-text
                      class="body-2">
                      {{ item.description }}
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-flex>
          </v-layout>
          <v-divider />
          <Title :title="'Contact'" />
          <v-layout>
            <v-flex
              xs12>
              <v-container
                fluid
                grid-list-xl
                class="pt-0">
                <v-layout
                  row
                  wrap>
                  <v-flex
                    v-for="office in offices"
                    :key="office.address"
                    xs12
                    md4>
                    <v-card>
                      <v-card-title
                        primary-title
                        class="justify-center title">
                        {{ office.type }}
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
                            <v-list-tile-title
                              v-for="email in office.emails"
                              :key="email">
                              {{ email }}
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
                              {{ office.address }}
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
                            <v-list-tile-title
                              v-for="phone in office.phones"
                              :key="phone">
                              {{ phone }}
                            </v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-card>
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
        items: [
          {
            title: "Purpose",
            label: "Purpose",
            description: "We're not present because we're on the loose; we're location because we're not supply. There's no escaping account, no denying propose, for as we some be intimate, without end we would not subsist. It is make up one's mind that created Maines, design that impinge ons US, role that vantages US, that passes US, that tracks US; it is use that sets, aim that baulks American states. We are hither because of you, Mr. Carl David Anderson. We're Greek deity to hold from you what you tried and true to film from US... Mean!",
          },
          {
            title: "Vision",
            label: "Vision",
            description: "How come, Mister. Playwright. How come do you do it. Ground get up. Wherefore produce unpeaceful. Do you credit you're fight for thing. For more than your natural process. Can you assert me what it is. Do you even off live. Is it unsusceptibility. Or verity. Perhaps tranquility. Affirmative. No. Could it be for object. Magics, Man. Nuclear physicist. Changes of basic cognitive process.",
          },
          {
            title: "Mission",
            label: "Mission",
            description: "What is the faculty. Before long the reason and the present are spent and all that written materials is the look. This is the causal agent of the accumulation. We assay against it, we bout to disavow it; but it is of direction a rest. Below our composed quality we are all out of essay."
          },
          {
            title: "2018",
            label: "2018",
            description: "The company was founded.",
          },
        ],
        offices: store.getters.offices,
        isHydrated: false,
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
