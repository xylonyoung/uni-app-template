const state = {
  list: uni.getStorageSync('cart') || []
}

const actions = {
  setCart({ commit }, list) {
    commit('SET_CART', list)
    uni.setStorageSync('cart', cart)
  },
  setBadge({ state }) {
    if (state.list.length > 0) {
      uni.setTabBarBadge({
        index: 2,
        text: String(state.list.length)
      })
    } else {
      uni.removeTabBarBadge({
        index: 2
      })
    }
  }
}

export default {
  state,
  actions
}
