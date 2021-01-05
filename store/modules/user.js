import $api from '@/api'
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

  //update user
  async updateUser({ commit }) {
    await $api.user.get().then(res => {
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

  //wechat login
  wxLogin({ dispatch, commit }) {
    const token = uni.getStorageSync('token')

    function getInfo() {
      uni.getUserInfo({
        success: res => {
          const { userInfo } = res
          $api.user.putProfile(userInfo).then(_ => {
            dispatch('updateUser')
          })
        },
        fail: () => {
          console.log('未授权')
          dispatch('updateUser')
        }
      })
    }
    return new Promise((resolve, reject) => {
      if (token) {
        commit('SET_TOKEN', token)
        getInfo()
        resolve()
      } else {
        uni.login({
          provider: 'weixin',
          success: res => {
            $api.user
              .wxLogin({
                code: res.code
              })
              .then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                uni.setStorageSync('token', data.token)
                getInfo()
                resolve()
              })
          },
          fail: err => {
            console.log('error' + err)
            reject(err)
            uni.showModal({
              title: '登录失败，请点击确认重新登录',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  dispatch('wxLogin')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        })
      }
    })
  },

  // user login
  login({ dispatch, commit }, loginData) {
    $api.user.login().then(res => {
      commit('SET_TOKEN', res.data)
      uni.setStorageSync('token', res.data)
      dispatch('updateUser')
      uni.reLaunch({
        url: '/pages/home/home'
      })
    })
  },

  // user logout
  logout() {
    uni.clearStorageSync()
    uni.reLaunch({
      url: '/pages/login/login'
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
