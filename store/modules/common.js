import $api from '@/api'

const state = {
  cart: uni.getStorageSync('cart') || [],
  stockHasLimit: false,
  orderProducts: [],
  orderStatus: [
    { label: '失败', value: '-2' },
    { label: '已取消', value: '-1' },
    { label: '等待', value: '0' },
    { label: '待支付', value: '1' },
    { label: '待发货', value: '2' },
    { label: '待收货', value: '3' },
    { label: '已收货', value: '4' },
    { label: '完成', value: '5' },
    { label: '售后中', value: '6' }
  ],
  member: {},
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
  // getMember({ commit }) {
  //   $api.get('/api/members').then((res) => {
  //     commit('SET_MEMBER', res.data)
  //   })
  // },
}

export default {
  state,
  actions
}
