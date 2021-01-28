import store from './store'

module.exports = {
	//'/upload' '/uploads/images/' '/uploads/videos/'
	baseURL: '' || 'https://mockjs',
	// how to login
	loginType: async () => {
		store.commit('user/SET_TOKEN', uni.getStorageSync('token'))
		// await store.dispatch('user/wxLogin')
	}
}
