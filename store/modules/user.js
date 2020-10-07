import api from '../../api'
const state = {
  token: '',
  user: {},
  registered: false,
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
  },
}

const actions = {
  putRecommendedUser({ dispatch }, id) {
    function newUser() {
      const createdTime = new Date(state.userInfo.created_time).getTime()
      const now = new Date().getTime()
      if (now - createdTime < 60 * 60 * 1000) {
        return true
      } else {
        console.log('用户已过分享期')
        return false
      }
    }
    if (newUser()) {
      console.log('进行putUserSet')
      putUserSet('recommendedUser', id).then(_ => {
        uni.showToast({
          title: '成功获取分享',
          duration: 2000,
        })
        dispatch('updateUser')
      })
    }
  },
  // user login
  login({ dispatch, commit }) {
    const token = uni.getStorageSync('token')
    commit('SET_TOKEN', token)
    dispatch('updateUser')
  },
  //weixin login
  wxLogin({ dispatch, commit }) {
    const token = uni.getStorageSync('token')
    function getInfo() {
      uni.getUserInfo({
        success: res => {
          const { userInfo } = res
          api.user.putProfile(userInfo).then(_ => {
            dispatch('updateUser')
          })
        },
        fail: _ => {
          console.log('未授权')
        },
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
            api.user
              .login({
                code: res.code,
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
              },
            })
          },
        })
      }
    })
  },
  //update user
  updateUser({ commit }) {
    api.user.get().then(res => {
      const { data } = res
      commit('SET_USER', data)
      uni.setStorageSync('user', data)
      if (data.profile) {
        const profile = data.profile.__metadata
        if (profile.phone) {
          commit('SET_REGISTERED', true)
        }
      }
    })
  },
  // user logout
  logout() {
    uni.clearStorageSync()
    uni.reLaunch({
      url: '../login/login',
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
