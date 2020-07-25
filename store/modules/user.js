import { getLogin, putUserProfile, getUser } from '../../api/api.js'

const state = {
  token: '',
  userInfo: {},
  profile: {},
  registered: false,
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_PROFILE: (state, profile) => {
    state.profile = profile
  },
  SET_REGISTERED: (state, registered) => {
    state.registered = registered
  },
}

const actions = {
  updateUser({ commit }) {
    getUser().then(res => {
      const { data } = res
      commit('SET_USER_INFO', data)
      if (data.profile) {
        const profile = data.profile.__metadata
        if (profile.phone && profile.room) {
          commit('SET_REGISTERED', true)
        }
      }
    })
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
    const getInfo = () => {
      uni.getUserInfo({
        success: response => {
          const { userInfo } = response
          commit('SET_PROFILE', userInfo)
          putUserProfile(userInfo).then(() => {
            dispatch('updateUser')
          })
        },
        fail: () => {
          console.log('未授权')
          dispatch('updateUser')
        },
      })
    }
    return new Promise(resolve => {
      if (token) {
        commit('SET_TOKEN', token)
        getInfo()
        resolve(true)
      } else {
        uni.login({
          provider: 'weixin',
          success: res => {
            getLogin({
              code: res.code,
            }).then(response => {
              const { data } = response
              commit('SET_TOKEN', data.token)
              uni.setStorageSync('token', data.token)
              getInfo()
              resolve(res)
            })
          },
          fail: err => {
            console.log(err)
            resolve(err)
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
