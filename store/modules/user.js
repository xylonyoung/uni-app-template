import $api from '@/api/api'

const state = {
  token: null,
  user: {},
  registered: false
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_REGISTERED: (state, registered) => {
    state.registered = registered
  }
}

const actions = {
  needLogin() {
    if (state.token) {
    }
  },
  async reLogin({ commit }) {
    uni.showToast({
      title: '登录过期，正在跳转登录',
      icon: 'none',
      duration: 3000
    })
    setTimeout(() => {
      uni.removeStorageSync('token')
      commit('SET_TOKEN', null)

      let url = '/pages/login/login'
      //#ifdef MP-WEIXIN
      url = '/pages/home/home'
      //#endif
      uni.reLaunch({
        url: url
      })
    }, 2000)
  },

  async putRecommendedUser({ dispatch }, id) {
    await dispatch('updateUser')
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
        duration: 2000
      })
      dispatch('updateUser')
    } else {
      uni.showToast({
        title: '分享失败！',
        icon: 'none',
        duration: 2000
      })
    }
    uni.removeStorageSync('shareId')
  },

  async updateUser({ commit }) {
    await $api.get('/api/user').then(res => {
      const { data } = res
      commit('SET_USER', data)
      uni.setStorageSync('user', data)
      const { profile } = data
      if (profile && profile.phone) {
        commit('SET_REGISTERED', true)
      }
    })
    return new Promise(resolve => resolve())
  },

  weChatLogin({ dispatch, commit }) {
    const token = uni.getStorageSync('token')
    if (token) {
      setTokenAndInfo(token)
    } else {
      login(token => {
        setTokenAndInfo(token)
      })
    }

    function login(callback) {
      uni.login({
        provider: 'weixin',
        success: res => {
          $api
            .get('/wechat/mini/login', {
              code: res.code
            })
            .then(response => {
              const { data } = response
              uni.setStorageSync('token', data.token)
              callback(data.token)
            })
        },
        fail: err => {
          console.log('error' + err)
          uni.showModal({
            title: '登录失败，请点击确认重新登录',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                dispatch('weChatLogin')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    }

    function setTokenAndInfo(token) {
      commit('SET_TOKEN', token)
      uni.getUserInfo({
        success: res => {
          const { userInfo } = res
          $api.put('/api/user-profile', userInfo).then(() => {
            dispatch('updateUser')
          })
        },
        fail: () => {
          console.log('未授权')
          dispatch('updateUser')
        }
      })
    }
  },

  login({ dispatch, commit }, loginData) {
    $api.post('/api-login', loginData).then(res => {
      commit('SET_TOKEN', res.data)
      uni.setStorageSync('token', res.data)
      dispatch('updateUser')
      uni.reLaunch({
        url: '/pages/home/home'
      })
    })
  },

  logout() {
    uni.clearStorageSync()
    commit('SET_TOKEN', null)
    uni.reLaunch({
      url: '/pages/home/home'
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
