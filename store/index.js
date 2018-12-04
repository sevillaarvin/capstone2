import Vuex from 'vuex'

export default () => new Vuex.Store({
  state: {
    user: {},
    featuredItems: [],
    categories: [],
    currentCategory: {
      items: [],
      offset: 0,
      limit: null,
    },
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
  },
  getters: {
    featuredItems(state) {
      // TODO: Should return x items at a time
      return state.featuredItems.slice(0,15)
    },
    categories(state) {
      return state.categories
    },
    currentCategoryItems(state) {
      return state.currentCategory.items
    },
    currentCategoryOffset(state) {
      return state.currentCategory.offset
    },
    currentCategoryLimit(state) {
      return state.currentCategory.limit
    },
    allNavs(state) {
      return state.allNavs
    },
  },
  mutations: {
    setFeaturedItems(state, items) {
      state.featuredItems = items
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setCurrentCategoryItems(state, { items, offset, limit }) {
      state.currentCategory.items.push(...items)
      state.currentCategory.offset += limit
      state.currentCategory.limit = limit
    },
    signUpUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async nuxtServerInit(vuexContext, context) {
      await vuexContext.dispatch("setFeaturedItems", context)
      await vuexContext.dispatch("setCategories", context)
    },
    async setFeaturedItems({commit}, context) {
      let items
      try {
        items = await this.$axios.$get("/item?featured=")
        return commit("setFeaturedItems", items)
      } catch (e) {
        context.error(e)
      }
    },
    async setCategories({ commit }, context) {
      try {
        const categories = await this.$axios.$get("/category")
        commit("setCategories", categories)
        return
      } catch (e) {
        context.error(e)
      }
    },
    async setCurrentCategoryItems({ commit }, category) {
      try {
        const { name, offset, limit } = category
        console.log(name, offset, limit)
        const items = await this.$axios.$get("/category/" + name, {
          params: {
            offset,
            limit,
          }
        })
        commit("setCurrentCategoryItems", {
          items,
          offset,
          limit,
        })
      } catch (e) {
        return Promise.reject()
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
