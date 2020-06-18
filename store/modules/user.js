import { getLogin, putUserProfile, getUser } from '../../api/api.js';

const state = {
  token: uni.getStorageSync('token'),
  userInfo: uni.getStorageSync('userInfo'),
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
};

const actions = {
  // user login
  login({ commit }) {
    uni.login({
      success: res => {
        uni.getUserInfo({
          success: response => {
            const { userInfo } = response;
            commit('SET_USER_INFO', userInfo);
            uni.setStorage({
              key: 'userInfo',
              data: userInfo,
            });
            putUserProfile(userInfo);
          },
        });
        if (!state.token) {
          getLogin({
            code: res.code,
          }).then(response => {
            const { data } = response;
            commit('SET_TOKEN', data.token);
            uni.setStorage({
              key: 'token',
              data: data.token,
            });
          });
        }
      },
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          resetRouter();

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch('tagsView/delAllViews', null, {
            root: true,
          });

          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
