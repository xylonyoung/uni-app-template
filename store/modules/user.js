import $api from '@/api'

const state = {
  user: {},
  registered: false,
  member: {}
}

const actions = {
  // getMember({ commit }) {
  //   $api.get('/api/members').then((res) => {
  //     commit('SET_MEMBER', res.data)
  //   })
  // },

  async putRecommendedUser({ dispatch, state }, id) {
    let content = '失败，账号已经绑定了！'
    if (canShare()) {
      await $api.put(`/api/user/set/recommendedUser/` + id)
      dispatch('getUserInformation')
      content = '成功绑定'
    }

    uni.showModal({
      title: '提示',
      content
    })

    uni.removeStorageSync('shareId')

    //be shared user must register on one hour
    function canShare() {
      const recommendedUser = state.user.recommendedUser
      // const createdTime = new Date(state.user.createdTime).getTime()
      // const now = new Date().getTime()
      // console.log('分享时间差:' + (now - createdTime - 60 * 60 * 1000))
      // if (now - createdTime < 60 * 60 * 1000 && !recommendedUser) {
      //   return true
      // } else {
      //   return false
      // }
      return !recommendedUser
    }
  },

  async getUserInformation({ commit }) {
    const res = await $api.get('/api/user', {
      '@expands': "['entity.profile']"
    })
    const { data } = res
    commit('SET_USER', data)
    if (data?.profile?.__metadata?.phone) {
      commit('SET_REGISTERED', true)
    }

    const shareId = uni.getStorageSync('shareId')
    if (shareId) {
      dispatch('putRecommendedUser', shareId)
    }

    return data
  },

  async wechatLogin({ dispatch }, phone) {
    let result
    if (!uni.getStorageSync('token') || phone) {
      result = await login()
    }
    dispatch('getUserInformation')
    return result

    function login() {
      return new Promise((resolve, reject) => {
        uni.login({
          provider: 'weixin',
          success: (res) => {
            const params = {
              code: res.code
            }
            if (phone) params.phone = phone

            $api
              .get('/wechat/mini/login', params)
              .then((response) => {
                uni.setStorageSync('token', response?.data?.token)
                resolve(response?.data)
              })
              .catch((err) => {
                reject(err)
              })
          },
          fail: (err) => {
            console.log('error' + err)
            reject(err)
            uni.showModal({
              title: '登录失败，请点击确认重新登录~',
              showCancel: false,
              success: (res) => {
                if (res.confirm) {
                  dispatch('wechatLogin')
                }
              }
            })
          }
        })
      })
    }
  },

  async reLogin({ dispatch }) {
    uni.removeStorageSync('token')
    //#ifdef MP-WEIXIN
    dispatch('wechatLogin').then(() => {
      dispatch('switchHomePage')
    })
    //#endif
    //#ifndef MP-WEIXIN
    uni.redirectTo({
      url: '/pages/login/login'
    })
    //#endif
  },

  login({ dispatch }, loginData) {
    $api.post('/api-login', loginData).then((res) => {
      uni.setStorageSync('token', res.data)
      dispatch('getUserInformation')
      dispatch('switchHomePage')
    })
  },

  logout({ dispatch }) {
    uni.clearStorageSync()
    dispatch('switchHomePage')
  },

  switchHomePage() {
    uni.reLaunch({
      url: '/pages/home/home'
    })
  }
}
export default {
  state,
  actions
}
