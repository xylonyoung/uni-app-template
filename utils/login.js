import store from '@/store'
async function login() {
	store.commit('token', uni.getStorageSync('token'))
	await store.dispatch('user/wxLogin')
}
// login()
