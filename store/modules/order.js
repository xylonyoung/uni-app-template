const state = {
  products: []
}

const actions = {
  toPay({ commit }, products) {
    commit('SET_PRODUCTS', products)
    uni.navigateTo({
      url: '/pages/pay/pay'
    })
  }
}

export default {
  state,
  actions
}
