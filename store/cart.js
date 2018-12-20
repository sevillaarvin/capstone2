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
      // if via paypal, expect approval_url
      if (typeof order === "string") {
        return order
      }
    } catch (e) {
      return Promise.reject(e)
    }

    dispatch("setUserCart", null, { root: true })
    commit("setLatestOrder", order)
  },
  async executePayment({ commit, dispatch }, paymentDetails) {
    let order

    try {
      order = await this.$axios.$post("/paypal", paymentDetails)
    } catch (e) {
      return Promise.reject(e)
    }

    dispatch("setUserCart", null, { root: true })
    commit("setLatestOrder", order)
  },
}
