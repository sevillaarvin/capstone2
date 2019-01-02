<template>
  <v-layout>
    <v-flex
      xs12>
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
            height="100vh"
            class="d-flex">
            <v-layout
              align-self-center>
              <v-flex
                xs12>
                <v-hover
                  v-if="isMdScreen">
                  <v-card
                    slot-scope="{ hover }"
                    :class="{ hover: hover }"
                    flat
                    color="transparent"
                    height="500"
                    width="500"
                    class="text-xs-center mx-auto slogan">
                    <v-card-title
                      class="justify-center display-3 slogan__side slogan__side--front">
                      Experience Real Luxury
                    </v-card-title>
                    <v-card-actions
                      class="justify-space-around pa-0 slogan__side slogan__side--back">
                      <v-layout
                        fill-height>
                        <v-hover>
                          <v-flex
                            slot-scope="{ hover }"
                            :class="{ 'darken-1': hover}"
                            xs6
                            class="d-flex align-center justify-center secondary cursor-pointer">
                            <v-card-text
                              class="headline">
                              &laquo; Register
                            </v-card-text>
                          </v-flex>
                        </v-hover>
                        <v-hover>
                          <v-flex
                            slot-scope="{ hover }"
                            :class="{ 'darken-1': hover}"
                            xs6
                            class="d-flex align-center justify-center primary cursor-pointer">
                            <v-card-text
                              class="black--text headline">
                              Go to Shop &raquo; 
                            </v-card-text>
                          </v-flex>
                        </v-hover>
                      </v-layout>
                    </v-card-actions>
                  </v-card>
                </v-hover>
                <v-card
                  v-else
                  flat
                  class="text-xs-center mx-auto py-3 slogan__stacked">
                  <v-card-title
                    primary-title
                    class="justify-center display-3 slogan__stacked-title">
                    Experience Real Luxury
                  </v-card-title>
                  <v-card-actions
                    class="justify-center">
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
                      vertical
                      class="mx-1" />
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
            light
            color="white">
            <v-layout
              row
              wrap>
              <v-flex
                xs12>
                <v-card-title
                  primary-title
                  class="display-2 justify-center">
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
                      v-for="(facility, n) in facilities"
                      :key="facility.name"
                      :offset-md1="n % 2 == 1"
                      :offset-md3="n % 2 == 0"
                      :offset-lg2="n % 2 == 1"
                      :offset-lg4="n % 2 == 0"
                      xs12
                      sm10
                      offset-sm1
                      md8
                      lg6
                      class="my-3">
                      <v-card
                        flat
                        hover
                        nuxt
                        to="/facilities">
                        <v-layout
                          row
                          wrap>
                          <v-flex
                            :order-xs1="n % 2 != 1"
                            xs12
                            md6
                            lg5>
                            <v-card-text>
                              <v-carousel
                                height="200"
                                hide-controls
                                hide-delimiters>
                                <v-carousel-item
                                  v-for="img in facility.images"
                                  :key="img"
                                  :src="img"
                                  class="skeleton">
                                  &nbsp;
                                </v-carousel-item>
                              </v-carousel>
                            </v-card-text>
                          </v-flex>
                          <v-flex
                            :order-xs2="n % 2 == 1"
                            xs12
                            md6
                            lg7>
                            <v-card-title
                              class="justify-center title">
                              {{ facility.name }}
                            </v-card-title>
                            <v-card-text>
                              {{ facility.description | short-desc }}
                              <span
                                class="font-weight-bold secondary--text">Read more</span>
                            </v-card-text>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-flex>
                    <v-flex
                      xs12>
                      <v-card-actions
                        class="justify-center">
                        <v-btn
                          large
                          round
                          nuxt
                          to="/facilities"
                          color="primary"
                          class="black--text">
                          View Facilities
                        </v-btn>
                      </v-card-actions>
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
            flat>
            <!--
            height="100vh">
            -->
            <v-layout
              fill-height
              row
              wrap>
              <v-flex
                xs12
                md6>
                <v-layout
                  fill-height>
                  <v-flex
                    xs12>
                    <v-card
                      flat>
                      <v-card-title
                        primary-title
                        class="display-2 justify-center">
                        News
                      </v-card-title>
                      <v-container
                        fluid
                        grid-list-md>
                        <v-layout
                          row
                          wrap>
                          <v-flex
                            v-for="article in news"
                            :key="article.id"
                            xs12>
                            <v-card
                              :to="`/news/${article.id}`"
                              nuxt
                              hover
                              class="my-1">
                              <v-layout
                                row
                                wrap>
                                <v-flex
                                  xs12
                                  sm6
                                  md4
                                  lg3
                                  xl2>
                                  <v-img
                                    :src="article.cover"
                                    contain
                                    class="mr-3 skeleton" />
                                </v-flex>
                                <v-flex
                                  xs12
                                  sm6
                                  md8
                                  lg9
                                  xl10>
                                  <v-card-title
                                    :class="!isMdScreen ? 'text-xs-center justify-center' : ''"
                                    primary-title
                                    class="title py-0">
                                    {{ article.title | micro-desc }}
                                    {{ isMdScreen }}
                                  </v-card-title>
                                  <v-card-title
                                    class="body-2 py-0">
                                    {{ article.date | long-date }}
                                  </v-card-title>
                                  <v-card-text>
                                    {{ article.content | mini-desc }}
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
                  fill-height>
                  <v-flex
                    xs12>
                    <v-card
                      flat>
                      <v-card-title
                        primary-title
                        class="display-2 justify-center">
                        Events
                      </v-card-title>
                      <v-container
                        fluid
                        grid-list-md>
                        <v-layout
                          row
                          wrap>
                          <v-flex
                            v-for="event in events"
                            :key="event.id"
                            xs12>
                            <v-card
                              :to="`/events/${event.id}`"
                              nuxt
                              hover
                              class="my-1">
                              <v-layout
                                row
                                wrap>
                                <v-flex
                                  xs12
                                  sm6
                                  md8
                                  lg9
                                  xl10>
                                  <v-card-title
                                    :class="!isMdScreen ? 'text-xs-center justify-center' : 'text-xs-right justify-end'"
                                    primary-title
                                    class="title py-0">
                                    {{ event.name | micro-desc }}
                                  </v-card-title>
                                  <v-card-title
                                    class="body-2 py-0 justify-end">
                                    {{ event.date | long-date }}
                                  </v-card-title>
                                  <v-card-text
                                    :class="isMdScreen ? 'text-xs-right' : ''">
                                    {{ event.description | mini-desc }}
                                  </v-card-text>
                                </v-flex>
                                <v-flex
                                  xs12
                                  sm6
                                  md4
                                  lg3
                                  xl2>
                                  <v-img
                                    :src="event.cover"
                                    contain
                                    class="mr-3 skeleton" />
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
          <v-card
            light
            class="py-3">
            <v-layout
              row
              wrap>
              <v-flex
                class="mb-3"
                xs12>
                <v-card-title
                  primary-title
                  class="display-2 justify-center">
                  Trending Items
                </v-card-title>
              </v-flex>
              <v-flex
                xs12>
                <v-container
                  grid-list-xl>
                  <v-layout
                    row
                    wrap
                    justify-center>
                    <v-flex
                      v-for="item in items"
                      :key="item.id"
                      xs12
                      sm6
                      md3>
                      <Item :item="item"/>
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
          <v-parallax
            :src="require('~/assets/image-bg2.jpeg')"
            class="pa-0">
            <v-layout
              align-center
              column
              justify-center
              class="call-to-action">
              <h1 class="display-2 font-weight-thin mb-3 text-xs-center">What are you waiting for?</h1>
              <v-btn
                round
                large
                nuxt
                to="/signup"
                color="primary"
                class="black--text">
                Register Now
              </v-btn>
            </v-layout>
          </v-parallax>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex
          xs12>
          <v-card
            light>
            <v-layout
              row
              wrap>
              <v-flex
                xs12>
                <v-card-title
                  primary-title
                  class="display-2 justify-center">
                  Contact
                </v-card-title>
              </v-flex>
              <v-flex
                xs12>
                <v-container>
                  <v-layout
                    row
                    wrap>
                    <v-flex
                      xs12
                      md6>
                      <v-card-title
                        class="justify-center title">
                        Club Seville International
                      </v-card-title>
                      <v-card-text>
                        <v-subheader>
                          Offices
                        </v-subheader>
                        <v-list
                          two-line>
                          <v-list-tile
                            v-for="office in offices"
                            :key="office.address">
                            <v-list-tile-content>
                              <v-list-tile-title>
                                {{ office.address }}
                              </v-list-tile-title>
                              <v-list-tile-sub-title>
                                {{ office.emails[0] }}
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                        <v-btn
                          round
                          outline
                          nuxt
                          to="/about"
                          color="secondary">
                          Contact Us
                        </v-btn>
                      </v-card-text>
                    </v-flex>
                    <v-flex
                      xs12
                      md6
                      class="d-flex justify-center">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.4101322936885!2d121.04148385087574!3d14.632645089731954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7afe6a39331%3A0xd367e6dc5e274032!2sCaswynn+Building%2C+134+Timog+Ave%2C+Diliman%2C+Quezon+City%2C+Metro+Manila%2C+Philippines!5e0!3m2!1sen!2sin!4v1540603840894"
                        width="600"
                        height="450"
                        frameborder="0"
                        style="border:0"
                        allowfullscreen />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
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
        facilities: store.getters.facilities.slice(0,5),
        news: store.getters["activities/news"].slice(0,3),
        events: store.getters["activities/events"].slice(0,3),
        items: store.getters.featuredItems.slice(0,4),
        offices: store.getters.offices,
        isHydrated: false,
      }
    },
    computed: {
      isMdScreen() {
        return this.isHydrated ? this.$vuetify.breakpoint.mdAndUp : false
      }
    },
    mounted() {
      this.isHydrated = true
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
      background-image: url(~@/assets/image-bg.jpg);
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .slogan {
    position: relative;

    -moz-perspective: 150rem;
    perspective: 150rem;
    // filter: drop-shadow(0 0 0 rgba(0,0,0,1));
    filter: drop-shadow(0 0 20px rgba(0,0,0,.3));

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
      border-radius: 50%;
      background-image: radial-gradient(rgba(#333, .6), rgba(#666, .4));

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

  .cursor-pointer {
    cursor: pointer;
  }
  .skeleton {
    /*
      define as separate properties
    */
    --card-height: 340px;
    --card-padding:24px;
    --card-skeleton: linear-gradient(gray var(--card-height), transparent 0);

    --title-height: 32px;
    --title-width: 200px;
    --title-position: var(--card-padding) 180px;
    --title-skeleton: linear-gradient(white var(--title-height), transparent 0);

    --avatar-size: 32px;
    --avatar-position: var(--card-padding) var(--card-padding);
    --avatar-skeleton: radial-gradient(
      circle calc(var(--avatar-size) / 2), 
      white 99%, 
      transparent 0
    );

    /* 
      now we can break the background up 
      into individual shapes 
    */
    background-image: 
      var(--avatar-skeleton),
      var(--title-skeleton),
      var(--card-skeleton);

    background-size:
      var(--avatar-size),
      var(--title-width) var(--title-height),
      100% 100%;

    background-position:
      var(--avatar-position),
      var(--title-position),
      0 0;
  }
  .call-to-action {
    background-image: linear-gradient(to right, rgba(0,0,0,.05), rgba(0,0,0,.35), rgba(0,0,0,.05));
  }
</style>
