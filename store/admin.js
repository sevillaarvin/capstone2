export const state = () => ({
  roles: [],
  members: [],
  categories: [],
  sizes: [],
  items: [],
  statuses: [],
  shipMethods: [],
  payMethods: [],
  orders: [],
  events: [],
})

export const getters = {
  roles(state) {
    return state.roles
  },
  members(state) {
    return state.members
  },
  categories(state) {
    return state.categories
  },
  sizes(state) {
    return state.sizes
  },
  items(state) {
    return state.items
  },
  statuses(state) {
    return state.statuses
  },
  shipMethods(state) {
    return state.shipMethods
  },
  payMethods(state) {
    return state.payMethods
  },
  orders(state) {
    return state.orders
  },
  events(state) {
    return state.events
  },
  isAdmin(state, getters, rootState) {
    if (rootState.auth.user) {
      return rootState.auth.user.roleId === 1
    } else {
      return false
    }
  }
}

export const mutations = {
  setRoles(state, roles) {
    state.roles = roles
  },
  setMembers(state, members) {
    state.members = members
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setSizes(state, sizes) {
    state.sizes = sizes
  },
  setItems(state, items) {
    state.items = items
  },
  setStatuses(state, statuses) {
    state.statuses = statuses
  },
  setShipMethods(state, shipMethods) {
    state.shipMethods = shipMethods
  },
  setPayMethods(state, payMethods) {
    state.payMethods = payMethods
  },
  setOrders(state, orders) {
    state.orders = orders
  },
  setEvents(state, events) {
    state.events = events
  },
}

export const actions = {
  async setRoles({ commit }) {
    let roles

    try {
      roles = await this.$axios.$get("/role")
    } catch (e) {
      return Promise.reject(e)
    }

    commit("setRoles", roles)
  },
  async setMembers({ commit }, pagination) {
    try {
      const {
        page,
        rowsPerPage,
        sortBy: orderBy,
        descending
      } = pagination || {}
      const offset = (page - 1) * rowsPerPage || 0
      let limit = rowsPerPage || 5
      if (limit < 0) {
        limit = null
      }
      const members = await this.$axios.$get("/member", {
        params: {
          offset,
          limit,
          orderBy,
          descending,
        }
      })

      commit("setMembers", members)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async createMember(context, member) {
    try {
      await this.$axios.$post("/member", member)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async updateMember({ getters }, { id, ...member }) {
    try {
      await this.$axios.$patch(`/member/${id}`, member)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async deleteMember(context, id) {
    try {
      await this.$axios.$delete(`/member/${id}`)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async setCategories({ commit }) {
    try {
      const categories = await this.$axios.$get("/category")
      commit("setCategories", categories)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async setSizes({ commit }) {
    try {
      const sizes = await this.$axios.$get("/size")
      commit("setSizes", sizes)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async setItems({ commit }, pagination) {
    try {
      const { page, rowsPerPage, sortBy: orderBy, descending } = pagination
      const offset = (page - 1) * rowsPerPage || 0
      let limit = rowsPerPage || 5
      if (limit < 0) {
        limit = null
      }
      
      const { total, items } = await this.$axios.$get("/item", {
        params: {
          offset,
          limit,
          orderBy,
          descending,
        }
      })

      commit("setItems", items)
      return total
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async createItem(context, item) {
    try {
      await this.$axios.$post("/item", item)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async updateItem({ getters }, { id, ...item }) {
    try {
      await this.$axios.$patch(`/item/${id}`, item)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async deleteItem(context, id) {
    try {
      await this.$axios.$delete(`/item/${id}`)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async setStatuses({ commit }) {
    try {
      const statuses = await this.$axios.$get("/status")
      commit("setStatuses", statuses)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async setShipMethods({ commit }) {
    try {
      const shipMethods = await this.$axios.$get("/ship_method")
      commit("setShipMethods", shipMethods)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async setPayMethods({ commit }) {
    try {
      const payMethods = await this.$axios.$get("/pay_method")
      commit("setPayMethods", payMethods)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async setOrders({ commit }, pagination) {
    try {
      const {
        page,
        rowsPerPage,
        sortBy: orderBy,
        descending
      } = pagination || {}
      const offset = (page - 1) * rowsPerPage || 0
      let limit = rowsPerPage || 5
      if (limit < 0) {
        limit = null
      }

      const { total, items: orders } = await this.$axios.$get("/order", {
        params: {
          offset,
          limit,
          orderBy,
          descending,
        }
      })

      commit("setOrders", orders)
      return total
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async updateOrder({ commit, getters }, { id, ...order }) {
    try {
      await this.$axios.$patch(`/order/${id}`, order)
    } catch (e) {
      return Promise.reject(e)
    }
  },
}
