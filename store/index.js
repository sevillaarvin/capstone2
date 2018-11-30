import Vuex from 'vuex'

export default () => new Vuex.Store({
  state: {
    featuredItems: []
    /*
    featuredItems: [
      {
        id: "item1",
        category: "cat1",
        name: "Item1",
        description: "This is description of Item1.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3QzcRLX4kQRxHWu7Kluz0XyqbOHQdkDEHJlGtIbEhzgfmWwB9Q",
        price: "100",
        rating: 5,
      },
      {
        id: "item2",
        category: "cat2",
        name: "Item2",
        description: "This is description of Item2.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3QzcRLX4kQRxHWu7Kluz0XyqbOHQdkDEHJlGtIbEhzgfmWwB9Q",
        price: "100",
        rating: 4,
      },
      {
        id: "item3",
        category: "cat3",
        name: "Item3",
        description: "This is description of Item3.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3QzcRLX4kQRxHWu7Kluz0XyqbOHQdkDEHJlGtIbEhzgfmWwB9Q",
        price: "100",
        rating: 3,
      },
    ]
    */
  },
  getters: {
    featuredItems(state) {
      return state.featuredItems
    }
  },
  mutations: {
    setFeaturedItems(state, items) {
      state.featuredItems = items
    }
  },
  actions: {
    async nuxtServerInit(vuexContext, context) {
      await vuexContext.dispatch("setFeaturedItems", context)
    },
    async setFeaturedItems({commit}, context) {
      let items
      try {
        items = await this.$axios.$get("/api/item")
        return commit("setFeaturedItems", items)
      } catch (e) {
        context.error(e)
      }
    }
  },
})
