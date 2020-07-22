import { getLogin, putUserProfile, getUser } from '../../api/api.js'

const state = {
	token: '',
	userInfo: {},
	profile: {}
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
	}
}

const actions = {
	// user login
	login({ commit }) {
		const token = uni.getStorageSync('token')
		commit('SET_TOKEN', token)
		getUser().then(res => {
			const { data } = res
			commit('SET_USER_INFO', data)
		})
	},
	//weixin login
	wxLogin({ dispatch, commit }) {
		const token = uni.getStorageSync('token')
		const getInfo = () => {
			uni.getUserInfo({
				success: response => {
					const { userInfo } = response
					commit('SET_PROFILE', userInfo)
					console.log(userInfo)
					putUserProfile(userInfo).then(() => {
						getUser().then(res => {
							const { data } = res
							commit('SET_USER_INFO', data)
						})
					})
				},
				fail: () => {
					console.log('未授权')
				}
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
							code: res.code
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
							success: function(res) {
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

	register() {
		return new Promise(resolve => {
			if (state.profile.phone && state.profile.room) {
				resolve(true)
			} else {
				resolve(false)
			}
		})
	},

	// user logout
	logout() {
		uni.clearStorageSync()
		uni.reLaunch({
			url: '../login/login'
		})
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	actions
}
