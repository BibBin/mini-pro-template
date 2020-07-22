
// initial state
const state = () => ({
  info: {}
})

// getters
const getters = {
  userInFnfo: (state, getters, rootState) => state.info
}

// actions
const actions = {
  getUserInfo ({ commit }) {
    // shop.getProducts(data => {
    //   commit('setUserInfo', data)
    // })
    commit('setUserInfo', {name: '黎明'})
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
