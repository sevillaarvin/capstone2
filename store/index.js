// TODO: Fix strict, vuex mutation outside store
// export const strict = false
// import Vuex from 'vuex'
// export default () => new Vuex.Store({
  export const state = () => ({
    // authenticated data
    user: {
      cart: null, // { cartId, items }
      info: null,
      details: null,
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
          name: "Profile",
          path: "/",
          icon: "person",
          guard: true,
          auth: true
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
  })
export const getters = {
    userCart(state) {
      return state.user.cart
    },
    userInfo(state) {
      return state.user.info || {
        firstName: "Anonymous",
        lastName: "",
        username: "",
        avatar: "http://i.pravatar.cc/150?u=Anonymous",
      }
    },
    userDetails(state) {
      return state.user.details
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
  }
export const mutations = {
    setUserCart(state, cart) {
      state.user.cart = cart
    },
    setUserInfo(state, info) {
      state.user.info = info
    },
    setUserDetails(state, details) {
      state.user.details = details
    },
    setFeaturedItems(state, { items, offset, limit }) {
      state.featured.items = state.featured.items.concat(items)
      state.featured.offset = offset
      state.featured.limit = limit
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setCurrentCategoryItems(state, { items, offset, limit }) {
      state.currentCategory.items = state.currentCategory.items.concat(items)
      state.currentCategory.offset = offset
      state.currentCategory.limit = limit
    },
    setCurrentItem(state, item) {
      state.currentItem = item
    },
    signUpUser(state, user) {
      state.user = user
    }
  }
export const actions = {
    async nuxtServerInit(vuexContext, context) {
      try {
        await vuexContext.dispatch("setCategories", context)
        // Execute if member already logged in
        await vuexContext.dispatch("setUserCart")
        await vuexContext.dispatch("setUserDetails")
      } catch (e) {
        console.log("nuxtServerInit", e.message)
      }
    },
    async setUserCart({ commit }, cart) {
      if (!cart) {
        try {
          cart = await this.$axios.$get("/cart/" + this.$auth.$state.user.userId)
        } catch (e) {
          // User is not logged in
          return Promise.reject(e)
        }
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
    async addToCart({ getters, state, dispatch }, item) {
      if (this.$auth.$state.loggedIn) {
        try {
          await this.$axios.$post("/cart", {
            cartId: getters.userCart.cartId,
            ...item,
          })
        } catch (e) {
          return Promise.reject(e)
        }
      } else {
        // TODO: Implement not loggedIn add to cart
      }

      dispatch("setUserCart")
    },
    async removeFromCart({ dispatch }, cartItemId) {
      if (this.$auth.state.loggedIn) {
        try {
          await this.$axios.$delete("/cart/item/" + cartItemId)
        } catch (e) {
          return Promise.reject(e)
        }
      } else {
        // TODO: Implement not loggedIn add to cart
      }
      dispatch("setUserCart")
    },
    async clearCart({ dispatch }) {
      if (this.$auth.state.loggedIn) {
        try {
          const id = this.$auth.$state.user.userId
          await this.$axios.$delete("/cart/" + id)
        } catch (e) {
          return Promise.reject(e)
        }
      } else {
        // TODO: Implement not loggedIn clearCart
      }
      dispatch("setUserCart")
    },
    async setFeaturedItems({ commit, /* getters */ }, query) {
      let { offset, limit, featured } = query
      // let items = getters.featuredItems
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
      /*
      if (offset === 0) {
        items = storeItems
      } else { // Add items to item list
        items = items.concat(storeItems)
      }
      */

      offset += storeItems.length
      limit = 12
      commit("setFeaturedItems", { items: storeItems, offset, limit })
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
    async setCurrentCategoryItems({ commit, /* getters */ }, category) {
      let { name, offset, limit } = category
      // let items = getters.currentCategoryItems
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
        /*
        if (offset === 0) {
          items = categoryItems
        } else { // Add items to item list
          items = items.concat(categoryItems)
        }
        */

        offset += categoryItems.length
        limit = 12

        commit("setCurrentCategoryItems", {
          items: categoryItems,
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
    },
  }
// })
