import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const keys = {
  USER: 'user',
  TOKEN: 'token'
}

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem(keys.USER)) || {},
    token: localStorage.getItem(keys.TOKEN) || null
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      localStorage.setItem(keys.USER, JSON.stringify(data))
    },
    deleteUser (state) {
      state.user = {}
      localStorage.removeItem(keys.USER)
    },

    /* token相关 */
    setToken (state, token) {
      state.token = token
      localStorage.setItem(keys.TOKEN, token)
    },
    deleteToken (state) {
      state.token = null
      localStorage.removeItem(keys.TOKEN)
    }
  },
  actions: {
  },
  getters: {
    auth (state) {
      return !!state.token
    }
  },
  modules: {
  }
})
