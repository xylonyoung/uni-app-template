import $api from '@/api'

const state = {
  cart: [],
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
  member: {}
}

const actions = {
  async getCategory() {
    const params = {
      '@filter': 'type = 1',
      '@order': 'listOrder|ASC'
    }
    const res = await $api.get('/api/categories', params)
    const result = res.content.filter((e) => e.parent === null)
    return result.map((e) => {
      const children = []
      res.content.forEach((i) => {
        if (i.parent === e.id) {
          children.push(i)
        }
      })
      return { children, ...e }
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
