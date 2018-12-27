export const state = () => ({
  search: {
    term: "",
    items: [],
    offset: 0,
    limit: 24,
    total: 0,
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
}

export const mutations = {
  setSearchItems(state, search) {
    state.search = search
  },
}
export const actions = {
  async setSearchItems({ commit, getters }, { searchTerm, scroll }) {
    try {
      const currentTerm = scroll ? getters.searchTerm : searchTerm
      const currentOffset = scroll ? getters.searchOffset : 0
      const currentLimit = scroll ? getters.searchLimit : 24
      const currentTotal = scroll ? getters.searchTotal : 0

      // If no more items, stop requesting
      if (scroll && currentOffset >= currentTotal) {
        return
      }

      const { total, items } = await this.$axios.$get("/item", {
        params: {
          search: currentTerm,
          offset: currentOffset,
          limit: currentLimit,
        }
      })
      commit("setSearchItems", {
        term: currentTerm,
        items,
        offset: currentOffset + items.length,
        limit: 12,
        total,
      })
    } catch (e) {
      return Promise.reject(e)
    }
  },
}
