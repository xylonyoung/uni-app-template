import store from '@/store'
async function login() {
	await store.dispatch('user/wxLogin')
}
// login()
