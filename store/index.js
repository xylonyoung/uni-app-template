import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let token = null
try {
	token = uni.getStorageSync('token')
} catch (e) {

}
export default new Vuex.Store({
	state: {
		hasLogin: false,
		token: token,
		user: {},
	},
	mutations: {
		login(state, value) {
			state.hasLogin = true
			state.token = value;
			uni.setStorage({
				key: 'token',
				data: value
			});
		},
		logout(state) {
			state.hasLogin = false;
			state.token = '';
			uni.removeStorage({
				key: 'token'
			})
		}

	},
	actions: {},
	modules: {},
});
