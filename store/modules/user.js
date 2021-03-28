import $api from '@/api/api'

const state = {
  user: {},
  registered: false,
}

const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_REGISTERED: (state, registered) => {
    state.registered = registered
  },
}

const actions = {
  async putRecommendedUser({ dispatch }, id) {
    await dispatch('getUserInformation')
    //be shared user must register on one hour
    function newUser() {
      const recommended_user = state.userInfo.recommended_user
      const createdTime = new Date(state.userInfo.created_time).getTime()
      const now = new Date().getTime()
      console.log('分享时间差:' + (now - createdTime - 60 * 60 * 1000))
      if (now - createdTime < 60 * 60 * 1000 && !recommended_user) {
        return true
      } else {
        return false
      }
    }
    if (newUser()) {
      await putUserSet('recommendedUser', id)
      uni.showToast({
        title: '成功获取分享',
        duration: 2000,
      })
      dispatch('getUserInformation')
    } else {
      uni.showToast({
        title: '分享失败！',
        icon: 'none',
        duration: 2000,
      })
    }
    uni.removeStorageSync('shareId')
  },

  async getUserInformation({ commit }) {
    await $api.get('/api/user').then((res) => {
      const { data } = res
      commit('SET_USER', data)
      const { profile } = data
      if (profile && profile.phone) {
        commit('SET_REGISTERED', true)
      }
    })
    return new Promise((resolve) => resolve())
  },

  async wechatLogin({ dispatch }, phone) {
    if (!uni.getStorageSync('token')) {
      await login()
    }
    uni.getUserInfo({
      success: (res) => {
        const { userInfo } = res
        $api.put('/api/user-profile', userInfo).then(() => {
          dispatch('getUserInformation')
        })
      },
      fail: (err) => {
        console.log(err)
      },
    })

    function login() {
      return new Promise((resolve) => {
        uni.login({
          provider: 'weixin',
          success: (res) => {
            const params = {
              code: res.code,
            }
            if (phone) {
              params.phone = phone
            }
            $api.get('/wechat/mini/login', params).then((response) => {
              const { data } = response
              uni.setStorageSync('token', data.token)
              dispatch('switchHomePage')
              resolve()
            })
          },
          fail: (err) => {
            console.log('error' + err)
            uni.showModal({
              title: '登录失败，请点击确认重新登录~',
              showCancel: false,
              success: (res) => {
                if (res.confirm) {
                  dispatch('wechatLogin')
                }
              },
            })
          },
        })
      })
    }
  },

  async reLogin({ dispatch }) {
    uni.showToast({
      title: '登录过期，正在跳转登录~',
      icon: 'none',
      duration: 3000,
    })
    uni.removeStorageSync('token')

    setTimeout(() => {
      //#ifdef MP-WEIXIN
      dispatch('wechatLogin')
      //#endif
      //#ifndef MP-WEIXIN
      uni.redirectTo({
        url: '/pages/login/login',
      })
      //#endif
    }, 2000)
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
    uni.switchTab({
      url: '/pages/home/home',
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
