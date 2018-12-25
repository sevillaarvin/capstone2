<template>
  <v-layout>
    <v-flex
      xs12>
      <!--
      <v-container
        fluid>
      -->
      <v-layout>
        <v-flex
          xs12
          class="position-relative">
          <div
            class="bg-video">
            <video
              autoplay
              muted
              loop
              class="bg-video__content">
              <source
                src="~/assets/video-bg.mp4"
                type="video/mp4">
            </video>
          </div>
          <v-card
            flat
            color="transparent"
            height="85vh"
            class="d-flex">
            <v-layout
              align-self-center>
              <v-flex
                v-if="isMediumBreakpoint"
                xs12>
                <v-hover>
                  <v-card
                    slot-scope="{ hover }"
                    :class="{ hover: hover }"
                    flat
                    color="transparent"
                    height="500"
                    width="500"
                    class="text-xs-center mx-auto slogan">
                    <v-layout
                      align-center
                      fill-height>
                      <v-flex>
                        <v-card-title
                          primary-title
                          class="justify-center display-3 slogan__side slogan__side--front">
                          Experience Real Luxury
                        </v-card-title>
                        <v-card-actions
                          class="justify-space-around slogan__side slogan__side--back">
                          <v-btn
                            large
                            light
                            round
                            nuxt
                            to="/signup"
                            color="secondary">
                            &laquo; Register
                          </v-btn>
                          <v-divider
                            inset
                            vertical />
                          <v-btn
                            large
                            round
                            light
                            nuxt
                            to="/store"
                            color="primary black--text">
                            Go to Shop &raquo; 
                          </v-btn>
                        </v-card-actions>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-hover>
              </v-flex>
              <v-flex
                v-else>
                <v-card
                  flat
                  class="text-xs-center mx-auto py-3 slogan__stacked">
                  <v-card-title
                    primary-title
                    class="justify-center display-1 slogan__stacked-title">
                    Experience Real Luxury
                  </v-card-title>
                  <v-card-actions
                    class="justify-space-around">
                    <v-btn
                      large
                      light
                      round
                      nuxt
                      to="/signup"
                      color="secondary">
                      &laquo; Register
                    </v-btn>
                    <v-divider
                      inset
                      vertical />
                    <v-btn
                      large
                      round
                      light
                      nuxt
                      to="/store"
                      color="primary black--text">
                      Go to Shop &raquo; 
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex
          xs12>
          <v-card
            flat
            color="transparent">
            <v-layout
              row
              wrap>
              <v-flex
                xs12>
                <v-card-title
                  primary-title
                  class="headline justify-center">
                  Facilities
                </v-card-title>
              </v-flex>
              <v-flex
                xs12>
                <v-container
                  fluid
                  grid-list-md>
                  <v-layout
                    row
                    wrap>
                    <v-flex
                      v-for="n in 3"
                      :key="n"
                      xs12>
                      <v-card
                        color="transparent">
                        <v-layout
                          row
                          wrap>
                          <v-flex
                            :order-xs1="n % 2 != 1"
                            xs12
                            sm6
                            md4
                            lg3
                            xl2>
                            <v-carousel
                              height="360"
                              hide-controls
                              hide-delimiters>
                              <v-carousel-item
                                v-for="facility in facilities"
                                :key="facility"
                                :src="facility">
                                &nbsp;
                              </v-carousel-item>
                            </v-carousel>
                          </v-flex>
                          <v-flex
                            :order-xs2="n % 2 == 1"
                            xs12
                            sm6
                            md8
                            lg9
                            xl10>
                            <v-card-text>
                              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            </v-card-text>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex
          xs12>
          <v-card
            height="100vh">
            <v-layout
              fill-height
              row
              wrap>
              <v-flex
                xs12
                md6>
                <v-layout
                  fill-height
                  align-center>
                  <v-flex
                    xs12>
                    <v-card>
                      <v-card-title
                        primary-title
                        class="headline justify-center">
                        News
                      </v-card-title>
                      <v-container
                        fluid
                        grid-list-xs>
                        <v-layout
                          row
                          wrap>
                          <v-flex
                            v-for="n in 3"
                            :key="n"
                            xs12>
                            <v-card>
                              <v-layout>
                                <v-flex
                                  xs12
                                  sm6
                                  md4
                                  lg3
                                  xl2>
                                  <v-img
                                    contain
                                    src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
                                    class="mr-3" />
                                </v-flex>
                                <v-flex
                                  xs12
                                  sm6
                                  md8
                                  lg9
                                  xl10>
                                  <v-card-title
                                    class="title py-0">
                                    Fan tast ic C'est
                                  </v-card-title>
                                  <v-card-text>
                                    This is a new news, spectacular amazin amazon boycott nice japhet.
                                  </v-card-text>
                                </v-flex>
                              </v-layout>
                            </v-card>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex
                xs12
                md6>
                <v-layout
                  fill-height
                  align-center>
                  <v-flex
                    xs12>
                    <v-card>
                      <v-card-title
                        primary-title
                        class="headline justify-center">
                        Events
                      </v-card-title>
                      <v-container
                        fluid
                        grid-list-xs>
                        <v-layout
                          row
                          wrap>
                          <v-flex
                            v-for="n in 3"
                            :key="n"
                            xs12>
                            <v-card>
                              <v-layout>
                                <v-flex
                                  class="text-xs-right"
                                  xs12
                                  sm6
                                  md8
                                  lg9
                                  xl10>
                                  <v-card-title
                                    class="title py-0 justify-end">
                                    New fan plastic
                                  </v-card-title>
                                  <v-card-text>
                                    This is a new news, spectacular amazin amazon boycott nice japhet.
                                  </v-card-text>
                                </v-flex>
                                <v-flex
                                  xs12
                                  sm6
                                  md4
                                  lg3
                                  xl2>
                                  <v-img
                                    contain
                                    src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
                                    class="mr-3" />
                                </v-flex>
                              </v-layout>
                            </v-card>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex
          xs12>
          <v-card>
            <v-layout
              row
              wrap>
              <v-flex
                class="mb-3"
                xs12>
                <v-card-title
                  primary-title
                  class="headline justify-center">
                  Trending Items
                </v-card-title>
              </v-flex>
              <v-flex
                xs12>
                <v-layout
                  row
                  wrap>
                  <v-flex
                    v-for="item in items"
                    :key="item.id"
                    xs4>
                    <Item :item="item"/>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex
          xs12>
          <v-card
            height="480">
            <v-layout
              fill-height
              column
              justify-center>
              <v-card-title
                primary-title
                class="display-2 justify-center">
                What are you waiting for?
              </v-card-title>
              <v-card-actions
                class="justify-center">
                <v-btn
                  round
                  large>
                  Register Now
                </v-btn>
              </v-card-actions>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex
          xs12>
          <v-card>
            <v-card-title
              primary-title
              class="headline justify-center">
              Contact
            </v-card-title>
          </v-card>
          <v-layout>
            <v-flex
              xs12
              md6>
              <v-card-text>
                <v-layout
                  row
                  wrap>
                  <v-flex
                    xs12>
                    Email
                  </v-flex>
                  <v-flex
                    xs12>
                    Address
                  </v-flex>
                  <v-flex
                    xs12>
                    Phone
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-flex>
            <v-flex
              xs12
              md6>
              ( INSERT MAPS HERE )
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <!--
      </v-container>
      -->
    </v-flex>
  </v-layout>
</template>

<script>
  import Item from "~/components/store/Item"

  export default {
    components: {
      Item
    },
    async asyncData({ app, redirect, store }) {
      const { $auth } = app
      if ($auth.$state.loggedIn) {
        let link

        if (store.getters["admin/isAdmin"]) {
          link = '/admin'
        } else {
          link = '/' + encodeURIComponent($auth.$state.user.username)
        }

        redirect(link)
      }

      return {
        facilities: [
          'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        ]
      }
    },
    computed: {
      items() {
        return this.$store.getters.featuredItems.slice(0,3)
      },
      isMediumBreakpoint() {
        return this.$vuetify.breakpoint.mdAndUp
      }
    },
    layout: 'default',
  }
</script>

<style
  lang="scss"
  scoped>
  .position-relative {
    position: relative;
  }

  .bg-video {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    opacity: .5;

    &__content {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .slogan {
    position: relative;

    -moz-perspective: 150rem;
    perspective: 150rem;

    &__stacked {
      background-color: rgba(#333, .5);

      &-title {
        font-family: 'Charm', cursive !important;
      }
    }

    &__side {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      transition: all .7s;
      clip-path: circle(50% at 50% 50%);
      background-color: rgba(#333, .5);

      &--front {
        font-family: 'Charm', cursive !important;
      }

      &--back {
        transform: rotateY(180deg);
      }
    }

    &.hover &__side--front {
      transform: rotateY(180deg);
    }

    &.hover &__side--back {
      transform: rotateY(0);
    }

    // &:hover &__side--front {
    //   transform: rotateY(180deg);
    // }

    // &:hover &__side--back {
    //   transform: rotateY(0);
    // }
  }
</style>
