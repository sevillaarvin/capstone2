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
      total: 0,
      unsortedItems: null,
    },
    categories: [],
    currentCategory: {
      items: [],
      offset: 0,
      limit: 24,
      total: 0,
      unsortedItems: null,
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
          icon: "shopping_cart",
          guard: false,
          auth: false,
          admin: false,
        },
        {
          name: "Signin",
          path: "/signin",
          icon: "person",
          guard: true,
          auth: false,
          admin: true,
        },
        {
          name: "Signup",
          path: "/signup",
          icon: "person_add",
          guard: true,
          auth: false,
          admin: true,
        },
        {
          name: "Profile",
          path: "/",
          icon: "person",
          guard: true,
          auth: true,
          admin: true,
        },
        {
          name: "Signout",
          path: "/signout",
          icon: "exit_to_app",
          guard: true,
          auth: true,
          admin: true,
        },
      ]
    },
  })
export const getters = {
    userCart(state) {
      return state.user.cart
    },
    userInfo(state) {
      return state.user.info
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
    featuredUnsortedItems(state) {
      return state.featured.unsortedItems
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
    currentCategoryTotal(state) {
      return state.currentCategory.total
    },
    currentCategoryUnsortedItems(state) {
      return state.currentCategory.unsortedItems
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
    setFeaturedItems(state, featured) {
      state.featured = featured
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
  }
export const actions = {
    async nuxtServerInit({ dispatch }, context) {
      try {
        await dispatch("setCategories")
        await dispatch("setFeaturedItems")

        // Execute if member already logged in
        await dispatch("setUserCart")
        await dispatch("setUserDetails")
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
        details = await this.$axios.$get("/profile/" + id)
      } catch (e) {
        return Promise.reject(e)
      }

      commit("setUserDetails", details)
    },
    async updateUserDetails(context, { id, ...user }) {
      try {
        await this.$axios.$patch(`/profile/${id}`, user)
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
    async setFeaturedItems({ commit, getters }, { scroll } = {}) {
      try {
        const currentItems = scroll ? getters.featuredItems : []
        const currentOffset = scroll ? getters.featuredOffset : 0
        const currentLimit = scroll ? getters.featuredLimit : 24
        const currentTotal = scroll ? getters.featuredTotal : 0

        if (scroll && currentOffset >= currentTotal) {
          return
        }

        const { total, items } = await this.$axios.$get("/item", {
          params: {
            featured: true,
            offset: currentOffset,
            limit: currentLimit,
          }
        })

        commit("setFeaturedItems", {
          items: currentItems.concat(items),
          offset: currentOffset + items.length,
          limit: 12,
          total,
        })
      } catch (e) {
        return Promise.reject(e)
      }
    },
    sortFeaturedItems({ commit, getters }, { sortBy, descending }) {
      const offset = getters.featuredOffset
      const limit = getters.featuredLimit
      const total = getters.featuredTotal
      const unsortedItems = getters.featuredUnsortedItems || getters.featuredItems
      let items = []

      if (sortBy === null) {
        items = unsortedItems
      } else {
        items = [...unsortedItems]
        sortInPlace(items, sortBy, descending)
      }

      commit("setFeaturedItems", {
        items,
        offset,
        limit,
        total,
        unsortedItems,
      })
    },
    async setCategories({ commit }) {
      try {
        const categories = await this.$axios.$get("/category")
        commit("setCategories", categories)
        return
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async setCurrentCategoryItems({ commit, getters }, { name, scroll }) {
      try {
        const currentCategoryItems = scroll ? getters.currentCategoryItems : []
        const currentCategoryOffset = scroll ? getters.currentCategoryOffset : 0
        const currentCategoryLimit = scroll ? getters.currentCategoryLimit : 24
        const currentCategoryTotal = scroll ? getters.currentCategoryTotal : 0

        // If no more items, stop requesting
        if (scroll && currentCategoryOffset >= currentCategoryTotal) {
          return
        }

        const { total, items } = await this.$axios.$get(`/category/${name}`, {
          params: {
            offset: currentCategoryOffset,
            limit: currentCategoryLimit,
          }
        })

        commit("setCurrentCategoryItems", {
          items: currentCategoryItems.concat(items),
          offset: currentCategoryOffset + items.length,
          limit: 12,
          total,
        })
      } catch (e) {
        return Promise.reject(e)
      }
    },
    sortCurrentCategoryItems({ commit, getters }, { sortBy, descending }) {
      const offset = getters.currentCategoryOffset
      const limit = getters.currentCategoryLimit
      const total = getters.currentCategoryTotal
      const unsortedItems = getters.currentCategoryUnsortedItems || getters.currentCategoryItems
      let items = []

      if (sortBy === null) {
        items = unsortedItems
      } else {
        items = [...unsortedItems]
        sortInPlace(items, sortBy, descending)
      }

      commit("setCurrentCategoryItems", {
        items,
        offset,
        limit,
        total,
        unsortedItems,
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
const sortInPlace = (items, sortBy, descending) => {
  switch (sortBy) {
    case "price":
      if (descending) {
        items.sort((a, b) => {
          return b.price - a.price
        })
      } else {
        items.sort((a, b) => {
          return a.price - b.price
        })
      }
      break
    // TODO: Determine popular products
    case "popularity":
      if (descending) {
        items.sort((a, b) => {
          return b.price * b.rating - a.price * a.rating
        })
      } else {
        items.sort((a, b) => {
          return a.price * a.rating - b.price * b.rating
        })
      }
      break
    case "rating":
      if (descending) {
        items.sort((a, b) => {
          return b.rating - a.rating
        })
      } else {
        items.sort((a, b) => {
          return a.rating - b.rating
        })
      }
      break
    default:
      throw new Error("Invalid sort value.")
  }
}
