import Vuex from 'vuex'

export default () => new Vuex.Store({
  state: {
    featured: {
      items: [],
      offset: 0,
      limit: 24,
    },
    categories: [],
    currentCategory: {
      items: [],
      offset: 0,
      limit: 24,
    },
    currentItem: null,
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
      return state.featured.items
    },
    featuredOffset(state) {
      return state.featured.offset
    },
    featuredLimit(state) {
      return state.featured.limit
    },
    featuredIterator(state) {
      return state.featured.iterator
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
    currentItem(state) {
      return state.currentItem
    },
    allNavs(state) {
      return state.allNavs
    },
  },
  mutations: {
    setFeaturedItems(state, { items, offset, limit }) {
      state.featured.items = items
      state.featured.offset = offset
      state.featured.limit = limit
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setCurrentCategoryItems(state, currentCategory) {
      state.currentCategory = currentCategory
    },
    setCurrentItem(state, item) {
      state.currentItem = item
    },
    signUpUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async nuxtServerInit(vuexContext, context) {
      await vuexContext.dispatch("setCategories", context)
    },
    async setFeaturedItems({ commit, getters }, query) {
      let { offset, limit, featured } = query
      let items = getters.featuredItems
      let storeItems

      try {
        storeItems = await this.$axios.$get("/item", {
          params: {
            featured,
            offset,
            limit,
          }
        })
      } catch (e) {
        context.error(e)
        return
      }
      offset += storeItems.length
      limit = 12

      items = items.concat(storeItems)
      commit("setFeaturedItems", { items, offset, limit })
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
    async setCurrentCategoryItems({ commit, getters }, category) {
      try {
        const { name, offset, limit, initial } = category
        let items = await this.$axios.$get("/category/" + name, {
          params: {
            offset,
            limit,
          }
        })

        if (!initial) {
          getters.currentCategoryItems.push(...items)
          items = getters.currentCategoryItems
        }

        commit("setCurrentCategoryItems", {
          items,
          offset: items.length,
          limit: 12,
        })
      } catch (e) {
        return Promise.reject(e)
      }
    },
    setCurrentItem({ commit }, item) {
      commit("setCurrentItem", item)
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
