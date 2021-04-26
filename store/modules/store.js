import $api from '@/api'

const state = {
  info: {},
  cart: [],
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
    { label: '售后中', value: '6' },
  ],
  categoryQuery: null,
  member: {},
}

const actions = {
  toPay({ state, dispatch }, products) {
    if (state.member && state.member.id) {
      dispatch('setOrderProducts', [...products])
      uni.navigateTo({
        url: '/pages/pay/pay',
      })
    } else {
      uni.showToast({
        title: '请先注册会员~',
        icon: 'none',
      })
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/member/member',
        })
      }, 3000)
    }
  },
  getMember({ commit }) {
    $api.get('/api/members').then((res) => {
      commit('SET_MEMBER', res.data)
    })
  },
  setCategoryQuery({ commit }, query) {
    commit('SET_CATEGORY_QUERY', query)
  },
  setOrderProducts({ commit }, products) {
    commit('SET_ORDER_PRODUCTS', products)
  },
  getStoreInfo({ commit }, storeId) {
    $api.get('/api/stores/' + storeId).then((res) => {
      commit('SET_INFO', res.data)
    })
  },
  setCart({ commit }, cart) {
    commit('SET_CART', cart)
    uni.setStorageSync('cart', cart)
  },
  setBadge({ state }) {
    if (state.cart.length > 0) {
      uni.setTabBarBadge({
        index: 2,
        text: String(state.cart.length),
      })
    } else {
      uni.removeTabBarBadge({
        index: 2,
      })
    }
  },
}

export default {
  state,
  actions,
}
