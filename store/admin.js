export const state = () => ({
  roles: [],
  members: [],
  categories: [],
  sizes: [],
  items: [],
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
  orders(state) {
    return state.orders
  },
  events(state) {
    return state.events
  },
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
  async setMembers({ commit }) {
    let members

    try {
      members = await this.$axios.$get("/member", {
        params: {
          offset: 0,
          limit: 20,
        }
      })
    } catch (e) {
      return Promise.reject(e)
    }

    commit("setMembers", members)
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
      const { page, rowsPerPage, sortBy, descending } = pagination
      const offset = (page - 1) * rowsPerPage || 0
      let limit = rowsPerPage || 5
      if (limit < 0) {
        limit = null
      }
      
      const { total, items } = await this.$axios.$get("/item", {
        params: {
          offset,
          limit,
        }
      })

      if (sortBy) {
        items.sort((a, b) => {
          if (descending) {
            if (a[sortBy] < b[sortBy]) {
              return 1
            } else if (a[sortBy] > b[sortBy]) {
              return -1
            } else {
              return 0
            }
          } else {
            if (a[sortBy] < b[sortBy]) {
              return -1
            } else if (a[sortBy] > b[sortBy]) {
              return 1
            } else {
              return 0
            }
          }
        })
      }

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
  async updateItem({ commit }, { id, ...item }) {
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
  async setOrders({ commit }) {
    let orders

    try {
      orders = await this.$axios.$get("/order", {
        params: {
          offset: 0,
          limit: 20,
        }
      })
    } catch (e) {
      return Promise.reject(e)
    }

    commit("setOrders", orders)
  },
}
