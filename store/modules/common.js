import $api from '@/api'

const state = {
  cart: uni.getStorageSync('cart') || [],
  stockHasLimit: false,
  orderProducts: [],
  favorites: uni.getStorageSync('favorites') || []
}

const actions = {
  addToFavorites({ state, commit }, productId) {
    const result = [...state.favorites, productId]
    commit('SET_FAVORITES', result)
    uni.setStorageSync('favorites', result)
  },
  removeFromFavorites({ state, commit }, productId) {
    const result = state.favorites.filter((e) => e !== productId)
    commit('SET_FAVORITES', result)
    uni.setStorageSync('favorites', result)
  },
  async getCategory() {
    const params = {
      '@filter':
        'entity.getEnabled() && entity.getType().getName() == "产品分类"',
      '@order': 'sequence|ASC'
    }
    const result = await $api.get('/api/categories', params)
    return result
  },
  setCart({ commit }, cart) {
    commit('SET_CART', cart)
    uni.setStorageSync('cart', cart)
  },
  setBadge({ state }) {
    if (state.cart.length > 0) {
      uni.setTabBarBadge({
        index: 2,
        text: String(state.cart.length)
      })
    } else {
      uni.removeTabBarBadge({
        index: 2
      })
    }
  },
  toPay({ commit }, products) {
    commit('SET_ORDER_PRODUCTS', products)
    uni.navigateTo({
      url: '/pages/pay/pay'
    })
  }

}

export default {
  state,
  actions
}
