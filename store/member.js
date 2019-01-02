export const state = () => ({
  genders: ["Male", "Female"],
  orders: [],
  events: [],
})

export const getters = {
  genders(state) {
    return state.genders
  },
  orders(state) {
    return state.orders
  },
  events(state) {
    return state.events
  },
}

export const mutations = {
  setOrders(state, orders) {
    state.orders = orders
  },
  setEvents(state, events) {
    state.events = events
  },
}

export const actions = {
  async setOrders({ commit }) {
    try {
      const { userId } = this.$auth.$state.user
      const { total, items: orders } = await this.$axios.$get(`/user/${userId}/order`)
      commit("setOrders", orders)
    } catch(e) {
      return Promise.reject(e)
    }
  },
  async setEvents(context) {
    try {} catch(e) {}
  },
}
