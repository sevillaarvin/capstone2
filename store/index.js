import Vuex from 'vuex'

export default () => new Vuex.Store({
  state: {
    // authenticated data
    user: {
      cart: null,
      info: null,
      details: null,
    },

    // authenticated data
    // authorized data
    admin: {
      members: [],
      items: [],
      orders: [],
      events: [],
    },

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
    userCart(state) {
      return state.user.cart
    },
    userInfo(state) {
      return state.user.info
    },
    userDetails(state) {
      return state.user.details
    },
    adminMembers(state) {
      return state.admin.members
    },
    adminItems(state) {
      return state.admin.items
    },
    adminOrders(state) {
      return state.admin.orders
    },
    adminEvents(state) {
      return state.admin.events
    },
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
    setUserCart(state, cart) {
      state.user.cart = cart
    },
    setUserInfo(state, info) {
      state.user.info = info
    },
    setUserDetails(state, details) {
      state.user.details = details
    },
    setAdminMembers(state, members) {
      state.admin.members = members
    },
    setAdminItems(state, items) {
      state.admin.items = items
    },
    setAdminOrders(state, orders) {
      state.admin.orders = orders
    },
    setAdminEvents(state, events) {
      state.admin.events = events
    },
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
    /*
    setCurrentCategoryItems(state, { items, offset, limit }) {
      state.currentCategory.items = items
      state.currentCategory.offset = offset
      state.currentCategory.limit = limit
    },
    */
    setCurrentItem(state, item) {
      state.currentItem = item
    },
    signUpUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async nuxtServerInit(vuexContext, context) {
      try {
        await vuexContext.dispatch("setCategories", context)
        await vuexContext.dispatch("setUserCart")
      } catch (e) {
        console.log("nuxtServerInit", e.message)
      }
    },
    async setUserCart({ commit }) {
      let cart
      
      try {
        cart = await this.$axios.$get("/cart/" + this.$auth.$state.user.userId)
      } catch (e) {
        // User is not logged in
        return
      }

      commit("setUserCart", cart)
    },
    // Method is called even if not logged in when in layout/store
    async setUserInfo({ commit }) {
      // Might not be set if not logged in
      let id
      let info

      try {
        id = this.$auth.$state.user.userId
      } catch (e) {
        // Member is not logged in
        return Promise.reject(e)
      }

      try {
        info = await this.$axios.$get("/member/" + id)
      } catch (e) {
        return Promise.reject(e)
      }

      commit("setUserInfo", info)
    },
    async setUserDetails({ commit }) {
      let id
      let details
      
      try {
        id = this.$auth.$state.user.userId
      } catch (e) {
        return Promise.reject(e)
      }

      try {
        details = await this.$axios.$get("/member/detail/" + id)
      } catch (e) {
        return Promise.reject(e)
      }

      commit("setUserDetails", details)
    },
    async updateUserDetails({ dispatch }, user) {
      let details

      try {
        await this.$axios.$patch("/member/detail", user)
        await dispatch("setUserDetails")
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async addToCart({ commit, dispatch }, item) {
      let items

      try {
        await this.$axios.$post("/cart", item) 
      } catch (e) {
        return Promise.reject(e)
      }

      dispatch("setUserCart")
    },
    async setAdminMembers({ commit }) {
      let members
      try {
        members = await this.$axios.$get("/member", {
          params: {
            offset: 0,
            limit: 20,
          }
        })
      } catch (e) {
        return Promise.reject(e)
      }
      commit("setAdminMembers", members)
    },
    async setAdminItems({ commit }) {
      let items
      try {
        items = await this.$axios.$get("/item", {
          params: {
            offset: 0,
            limit: 20,
          }
        })
      } catch (e) {
        return Promise.reject(e)
      }
      commit("setAdminItems", items)
    },
    async setAdminOrders({ commit }, context) {
      let orders
      try {
        orders = await this.$axios.$get("/order", {
          params: {
            offset: 0,
            limit: 20,
          }
        })
      } catch (e) {
        context.error(e)
        return
      }
      commit("setAdminOrders", orders)
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

      // If initial load, set items
      if (offset === 0) {
        items = storeItems
      } else { // Add items to item list
        items = items.concat(storeItems)
      }

      offset += storeItems.length
      limit = 12
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
      let { name, offset, limit } = category
      let items = getters.currentCategoryItems
      let categoryItems

      try {
        categoryItems = await this.$axios.$get("/category/" + name, {
          params: {
            offset,
            limit,
          }
        })
      } catch (e) {
        return Promise.reject(e)
      }

        // If initial load, set items
        if (offset === 0) {
          items = categoryItems
        } else { // Add items to item list
          items = items.concat(categoryItems)
        }

        offset += categoryItems.length
        limit = 12

        commit("setCurrentCategoryItems", {
          items,
          offset,
          limit,
        })
    },
    setCurrentItem({ commit }, item) {
      commit("setCurrentItem", item)
    },
    async signUpUser({ commit }, user) {
      try {
        await this.$axios.$post("/signup", user)
      } catch (e) {
        return Promise.reject(e)
      }
      commit("signUpUser", user)
    },
    signOutUser({ commit }) {
      commit("setUserCart", null)
      commit("setUserInfo", null)
      commit("setUserDetails", null)
    }
  },
})
