import Vuex from 'vuex'

export default () => new Vuex.Store({
  state: {
    allNavs: {
      genNavs: [
        {
          dropdown: true,
          name: "News & Events",
          items: [
            {
              name: "News",
              path: "/news",
              icon: "rss_feed"
            },
            {
              name: "Events",
              path: "/events",
              icon: "event_note"
            },
          ]
        },
        {
          name: "Facilities",
          path: "/facilities",
          icon: "pool"
        },
        {
          name: "Membership",
          path: "/membership",
          icon: "card_membership"
        },
        {
          name: "Store",
          path: "/store",
          icon: "store_mall_directory"
        },
        {
          name: "About",
          path: "/about",
          icon: "sentiment_satisfied_alt"
        },
      ],
      userNavs: [
        {
          name: "Cart",
          path: "/store/cart",
          icon: "shopping_cart"
        },
        {
          name: "Signin",
          path: "/signin",
          icon: "person",
          guard: true,
          auth: false
        },
        {
          name: "Signup",
          path: "/signup",
          icon: "person_add",
          guard: true,
          auth: false
        },
        {
          name: "Signout",
          path: "/signout",
          icon: "exit_to_app",
          guard: true,
          auth: true
        },
      ]
    },
    featuredItems: [],
    user: {}
  },
  getters: {
    allNavs(state) {
      return state.allNavs
    },
    featuredItems(state) {
      return state.featuredItems
    }
  },
  mutations: {
    setFeaturedItems(state, items) {
      state.featuredItems = items
    },
    signUpUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async nuxtServerInit(vuexContext, context) {
      await vuexContext.dispatch("setFeaturedItems", context)
    },
    async setFeaturedItems({commit}, context) {
      let items
      try {
        items = await this.$axios.$get("/item")
        return commit("setFeaturedItems", items)
      } catch (e) {
        context.error(e)
      }
    },
    async signUpUser({commit}, user) {
      try {
        await this.$axios.$post("/signup", user)
      } catch (e) {
        return Promise.reject(e)
      }
      commit("signUpUser", user)
    }
  },
})
