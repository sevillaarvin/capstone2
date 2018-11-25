import Vuex from 'vuex'

export default () => new Vuex.Store({
  state: {
    featuredItems: [
      {
        id: "item1",
        category: "cat1",
        name: "Item1",
        description: "This is description of Item1.",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3QzcRLX4kQRxHWu7Kluz0XyqbOHQdkDEHJlGtIbEhzgfmWwB9Q",
        price: "100",
        rating: 5,
      },
      {
        id: "item2",
        category: "cat2",
        name: "Item2",
        description: "This is description of Item2.",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3QzcRLX4kQRxHWu7Kluz0XyqbOHQdkDEHJlGtIbEhzgfmWwB9Q",
        price: "100",
        rating: 4,
      },
      {
        id: "item3",
        category: "cat3",
        name: "Item3",
        description: "This is description of Item3.",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3QzcRLX4kQRxHWu7Kluz0XyqbOHQdkDEHJlGtIbEhzgfmWwB9Q",
        price: "100",
        rating: 3,
      },
    ]
  },
  getters: {
    featuredItems(state) {
      // TODO: Fix featured items
      // return state.featuredItems
      let items = [...state.featuredItems]
      for (let i = 0; i < 10; ++i) {
        const item = JSON.parse(JSON.stringify(items[0]))
        item.name += i
        items.push(item)
      }
      return items
    }
  },
  mutations: {},
  actions: {},
})
