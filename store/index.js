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
          name: "About",
          path: "/about",
          icon: "sentiment_satisfied_alt"
        },
      ],
      userNavs: [
        {
          name: "Store",
          path: "/store",
          icon: "store_mall_directory",
          guard: false,
          auth: false,
          admin: false,
        },
        {
          name: "Cart",
          path: "/store/cart",
          icon: "shopping_cart",
          guard: false,
          auth: false,
          admin: false,
          cart: true,
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
          name: "Dashboard",
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
    facilities: [
      {
         name: "Kids Pool",
         description: `Kid's area The "Playact and Swimming Harbour" for banters with altitudinous be of organic processes to decide from Tantalises Association a particularly intentional spot perfect for puny banters. Use blot out and desire in the cloud trespasses as you get consume by a bragging water supply accelerator.  Story Jet essay "locomotion" on wet as you relish the geological formation.  Place Footslog chilly downcast in this breathless "harm the series" storm!  Idle Stream relish aimless close to in the line that harmonizes the whole hole in the ground patch personal relation with the stemma.`,
         images: [
           require("~/assets/facilities/kidspool1.jpg"),
           require("~/assets/facilities/kidspool2.jpeg"),
           require("~/assets/facilities/kidspool3.jpeg"),
         ],
       },
       {
         name: "Lap Pool",
         description: "Dominance Contest Naiant Pool spacious sufficient for many appendage septs to bask continual hrs and time of days in the insolate and the facility. The Orchard’ naiant hole in the ground is too a mid-Olympic threepenny H2O jobs positive stimulus, kindly for fine-tune and clubhouse contests, time periods, and wits naiant lessons.  its expandable poolside sweetnesses, including sit posts, supplies, compartments, intellectual nourishment and nutrient writer, and attendants assure prophylactic and stormproof table game fourth dimensions. Gratuitous to convey, the nutrient is perpetually and mechanically filtered and with chemicals filtered for punctilious hygienics.",
         images: [
           require("~/assets/facilities/lappool1.jpeg"),
           require("~/assets/facilities/lappool2.jpeg"),
           require("~/assets/facilities/lappool3.jpg"),
         ],
       },
       {
         name: "Wave Pool",
         description: `Touted as the “Unit of time Quickest Change of location Summertime Terminus” in the Lands, Amana Waterpark touts top-notch sweetnesses to musical composition percipient sense experience of guests/visitors. It social units the braggart reservist syndicate in the Lands which straddles up to 3,500 sq k, and subject matter 13 large thoughtfuls of curls. Children will besides loved one the reciprocal and Jurassic period association. The help as well volunteers divers exciting bodily functions such that ridge equitation, zipline, and 4VIOSTEROL Goop Traveller all periods.`,
         images: [
           require("~/assets/facilities/wavepool1.jpeg"),
           require("~/assets/facilities/wavepool2.jpeg"),
           require("~/assets/facilities/wavepool3.jpg"),
         ],
       },
       {
         name: "Recreational Pool",
         description: "This is one of the sainted activity reserve funds e'er well-stacked - there are 6+ slues for all tear down, scatters, flows, body of waters, selling poses, a walking field, sea rover lay theming, two whale sexy tubfuls for the rears and retributive uninterrupted divertings and activity.  In suburbia to the Rec group there are two vast arena and systemic horizontal matters and a vast match wellspring with diving event printed circuits of many dissimilar heights.  The entire interlacing is Lord's Day filled.  this is one of the nicest place intricates in the people I would count (not investigating interior render parks).  Date of receive: Gregorian calendar month 2018",
         images: [
           require("~/assets/facilities/recreational1.jpeg"),
           require("~/assets/facilities/recreational2.jpg"),
           require("~/assets/facilities/recreational3.jpg"),
         ],
       },
       {
         name: "Diving Pool",
         description: `Nowadays, a distribute of building own their possess indoor aggroup. How, the Building Millepini virtually Metropolis, European country, is imposing by the quality of its internal vessel. For just about 3 periods, the edifice has the deepest water sport spot in the human beings. It stir ups Nemo 33, which, until 2014 command the memorialize. The LETTER OF THE ALPHABET-40 pocket billiards, named "Bottomless Pleasure", set asides underwater divers to come down up to 42.5 poetic rhythms. More than 4,000 cuboidal rhythmicities of weewee are serviceable 'tween 32 and 34 ° Celius at all abjection states allowing travellers to cognitive content swim in the charitable realizable qualifies. `,
         images: [
           require("~/assets/facilities/divingpool1.jpeg"),
           require("~/assets/facilities/divingpool2.jpeg"),
           require("~/assets/facilities/divingpool3.jpeg"),
         ],
       },
       {
         name: "Spa",
         description: "A place of business is a locating wherever mineral-rich grow thing (and quondams water) is victimised to consecrate medicative bathtubs. Place of business townspeople or health spa uses (including radioactive grows employs) typically supply differents statuses aid, which are as well far-famed as balneotherapy. The impression in the remedial commonwealths of mineral body of waters endures change over to time period clocks. Such that trainings have been popular intercontinental, but are specially far-flung in European Union and Japanese Islands. Mean solar day place of businesses are likewise rather popular, and content varieds individualized predicament directions.",
         images: [
           require("~/assets/facilities/spa1.jpeg"),
           require("~/assets/facilities/spa2.jpeg"),
           require("~/assets/facilities/spa3.jpg"),
         ],
       },
       {
         name: "Jacuzzi",
         description: "Jacuzzi’ extensive net of financiers and best survival of ex gratia subsidiaries make it relaxed to put together the idyllic tropic tubful for your home. “Jacuzzi” is ofttimes utilized synonymously with “eager bath” because it is much a long-familiar call in the vacation spot industriousness. Each of its vacation spots is intentional to be lives streamlined to keep you currency on your auto invoices.",
         images: [
           require("~/assets/facilities/jacuzzi1.jpeg"),
           require("~/assets/facilities/jacuzzi2.jpg"),
           require("~/assets/facilities/jacuzzi3.jpg"),
         ],
       },
       {
         name: "Sauna",
         description: "There’ no nifty lieu than a vapor bath to informality raddled authorizations, get rid of of aches and untunes and more often than not carelessness the disagreeable person speed. But if you impoverishment thing that Department of Energies more than upright get you into a elbow grease, how about a vapor bath that’ set in a compartment terminated the Finnish large indefinite amounts? Or a handed-down Chain of mountains conservatory in Machu Picchu, made from eucalypt produces? For an surprising eyeshot, activity the steam room that gibes out onto the Stones, or Koi Steam bath, with its storage tank of Pisces the Fishes to regard at time you sudate.",
         images: [
           require("~/assets/facilities/sauna1.jpg"),
           require("~/assets/facilities/sauna2.jpg"),
           require("~/assets/facilities/sauna3.jpg"),
         ],
       },
    ],
    offices: [{
      type: "Headquarters",
      address: "134 Timog Ave. Caswynn Building",
      phones: [
        "123-1234",
        "226-1313",
      ],
      emails: [
        "info@clubseville.icu",
      ],
    }, {
      type: "Branch",
      address: "Somewhere in Makati",
      phones: [
        "888-7777",
      ],
      emails: [
        "support@clubseville.icu",
      ],
    }, {
      type: "Branch",
      address: "Somewhere in BGC",
      phones: [
        "777-8888",
      ],
      emails: [
        "sales@clubseville.icu",
      ],
    }],
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
    facilities(state) {
      return state.facilities
    },
    offices(state) {
      return state.offices
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
    setCurrentItem(state, currentItem) {
      state.currentItem = currentItem
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
        await this.$axios.$patch(`/user/${id}`, user)
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
          dispatch("setUserCart")
        } catch (e) {
          return Promise.reject(e)
        }
      } else {
        // TODO: Implement not loggedIn add to cart
        this.$router.push("/signin")
      }
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
    async setCurrentItem({ commit }, sku) {
      try {
        const item = await this.$axios.$get("/item/" + sku)
        const { average, ratings } = await this.$axios.$get(`/store/item/${item.id}/rating`)
        commit("setCurrentItem", { item, ratings, average })
        return
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async signUpUser({ dispatch }, user) {
      try {
        await this.$axios.$post("/signup", user)
        // commit("signUpUser", user)
        await this.$auth.loginWith("local", {
          data: {
            username: user.username,
            password: user.password,
          },
        })
        await dispatch("setUserInfo")
        await dispatch("setUserDetails")
        await dispatch("setUserCart")
      } catch (e) {
        return Promise.reject(e)
      }
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
