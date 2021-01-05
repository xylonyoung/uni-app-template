import store from './store'

module.exports = {
  //'/upload' '/uploads/images/' '/uploads/videos/'
  baseURL: process.env.NODE_ENV === 'development' ? 'https://mockjs' : '',
  // how to login
  loginType: async () => {
    store.commit('user/SET_TOKEN', uni.getStorageSync('token'))
    // await store.dispatch('user/wxLogin')
  }
}
