const state = {
  list: uni.getStorageSync('favorites') || []
}

const actions = {
  addToFavorites({ state, commit }, productId) {
    const result = [...state.list, productId]
    commit('SET_LIST', result)
    uni.setStorageSync('favorites', result)
  },
  removeFromFavorites({ state, commit }, productId) {
    const result = state.list.filter((e) => e !== productId)
    commit('SET_LIST', result)
    uni.setStorageSync('favorites', result)
  }
}

export default {
  state,
  actions
}
