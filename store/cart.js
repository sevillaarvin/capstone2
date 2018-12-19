export const state = () => ({
  latestOrder: {},
})

export const getters = {
  latestOrder(state) {
    return state.latestOrder
  },
}

export const mutations = {
  setLatestOrder(state, order) {
    state.latestOrder = order
  },
}

export const actions = {
  async approveCheckout({ dispatch, commit }, checkoutOptions) {
    let order

    try {
      order = await this.$axios.$post("/checkout", checkoutOptions)
    } catch (e) {
      return Promise.reject(e)
    }

    dispatch("setUserCart", null, { root: true })
    commit("setLatestOrder", order)
  },
}
