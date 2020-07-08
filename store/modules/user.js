import { getLogin, putUserProfile, getUser } from '../../api/api.js'

const state = {
  token: uni.getStorageSync('token'),
  userInfo: {},
  roles: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}

const actions = {
  // user login
  login({ commit }) {
    getUser().then(res => {
      const { data } = res
      commit('SET_USER_INFO', data)
      const { roles } = res.data
      commit('SET_ROLES', roles)
    })
    // //  wx
    // uni.login({
    //   success: res => {
    //     uni.getUserInfo({
    //       success: response => {
    //         const { userInfo } = response;
    //         commit('SET_USER_INFO', userInfo);
    //         putUserProfile(userInfo);
    //       },
    //     });
    //     if (!state.token) {
    //       getLogin({
    //         code: res.code,
    //       }).then(response => {
    //         const { token } = response.data;
    //         commit('SET_TOKEN', token);
    //         uni.setStorage({
    //           key: 'token',
    //           data:token,
    //         });
    //       });
    //     }
    //   },
    // });
  },

  // user logout
  logout() {
    uni.clearStorageSync()
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
