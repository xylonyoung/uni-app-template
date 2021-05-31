import $api from '@/api'
import store from '@/store'

const state = {
  cart: [],
  stockHasLimit: false,
  orderProducts: [],
  orderStatus: [
    { label: '失败', value: 'FAILED' },
    { label: '已取消', value: 'CANCELLED' },
    { label: '等待', value: 'PENDING' },
    { label: '待支付', value: 'SUBMITTED' },
    { label: '待发货', value: 'PAID' },
    { label: '完成', value: 'COMPLETE' },
  ],
  categoryList: [],
  member: {}
}

const actions = {
  async getCategory({ commit }) {
    const res = await $api.get('/api/categories')
    const result = res.content
      .filter((e) => !e?.parent)
      .map((e) => {
        const children = []
        res.content.forEach((i) => {
          if (i.parent === e.id) {
            children.push(i)
          }
        })
        return { children, ...e }
      })
    commit('SET_CATEGORY_LIST', result)
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
    if (store.getters?.user?.join) {
      commit('SET_ORDER_PRODUCTS', products)
      uni.navigateTo({
        url: '/pages/pay/pay'
      })
    } else {
      uni.showToast({
        title: '请先加盟',
        icon: 'none'
      })
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/join/join'
        })
      }, 2222)
    }
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
