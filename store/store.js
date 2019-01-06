export const state = () => ({
  search: {
    term: "",
    items: [],
    offset: 0,
    limit: 24,
    total: 0,
    unsortedItems: null,
  },
})

export const getters = {
  searchTerm(state) {
    return state.search.term
  },
  searchItems(state) {
    return state.search.items
  },
  searchOffset(state) {
    return state.search.offset
  },
  searchLimit(state) {
    return state.search.limit
  },
  searchTotal(state) {
    return state.search.total
  },
  searchUnsortedItems(state) {
    return state.search.unsortedItems
  },
}

export const mutations = {
  setSearchItems(state, search) {
    state.search = search
  },
}
export const actions = {
  async setSearchItems({ commit, getters }, { searchTerm, scroll, category }) {
    try {
      const currentTerm = scroll ? getters.searchTerm : searchTerm
      const currentItems = scroll ? getters.searchItems : []
      const currentOffset = scroll ? getters.searchOffset : 0
      const currentLimit = scroll ? getters.searchLimit : 24
      const currentTotal = scroll ? getters.searchTotal : 0
      let path

      // If no more items, stop requesting
      if (scroll && currentOffset >= currentTotal) {
        return
      }

      if (category) {
        path = `/category/${category}`
      } else {
        path = "/item"
      }

      const { total, items } = await this.$axios.$get(path, {
        params: {
          search: currentTerm,
          offset: currentOffset,
          limit: currentLimit,
        }
      })

      commit("setSearchItems", {
        term: currentTerm,
        items: currentItems.concat(items),
        offset: currentOffset + items.length,
        limit: 12,
        total,
      })
    } catch (e) {
      return Promise.reject(e)
    }
  },
  sortSearchItems({ commit, getters }, { sortBy, descending }) {
      const term = getters.searchTerm
      const offset = getters.searchOffset
      const limit = getters.searchLimit
      const total = getters.searchTotal
      const unsortedItems = getters.searchUnsortedItems || getters.searchItems
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
  async sendComment({ commit, dispatch }, { itemId, sku, ...rating }) {
    try {
      await this.$axios.$post(`/store/item/${itemId}/rating`, rating)
      await dispatch("setCurrentItem", sku, { root: true })
    } catch (e) {
      return Promise.reject(e)
    }
  },
}

// TODO: Fix duplicate code, already in index.js
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
