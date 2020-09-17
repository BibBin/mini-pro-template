// initial state
const state = () => ({
  info: {},
  userInfo: {}
})

// getters
const getters = {
  userInFnfo: (state, getters, rootState) => state.info,
  userInfo: (state, getters, rootState) => state.userInfo
}

// actions
const actions = {
  getUserInfo ({ commit }) {
    // shop.getProducts(data => {
    //   commit('setUserInfo', data)
    // })
    commit('setUserInfo', { name: '黎明' })
  }
}

// mutations
const mutations = {
  setUserInfo (state, data) {
    state.info = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
