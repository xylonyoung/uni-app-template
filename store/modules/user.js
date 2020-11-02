import $api from '@/api'
const state = {
	token: '',
	user: {},
	profile: {},
	registered: false
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_USER: (state, user) => {
		state.user = user
	},
	SET_PROFILE: (state, profile) => {
		state.profile = profile
	},
	SET_REGISTERED: (state, registered) => {
		state.registered = registered
	}
}

const actions = {
	async putRecommendedUser({ dispatch }, id) {
		await dispatch('updateUser')
		//be shared user must register on one hour
		function newUser() {
			const recommended_user = state.userInfo.recommended_user
			const createdTime = new Date(state.userInfo.created_time).getTime()
			const now = new Date().getTime()
			console.log('分享时间差:' + (now - createdTime - 60 * 60 * 1000))
			if (now - createdTime < 60 * 60 * 1000 && !recommended_user) {
				return true
			} else {
				return false
			}
		}
		if (newUser()) {
			await putUserSet('recommendedUser', id)
			uni.showToast({
				title: '成功获取分享',
				duration: 2000
			})
			dispatch('updateUser')
		}else{
			uni.showToast({
				title: '分享失败！',
				icon:'none',
				duration: 2000
			})
		}
		uni.removeStorageSync('shareId')
	},
	
	//update user
	async updateUser({ commit }) {
		await $api.user.get().then(res => {
			const { data } = res
			commit('SET_USER', data)
			uni.setStorageSync('user', data)
			if (data.profile) {
				const profile = data.profile.__metadata
				commit('SET_PROFILE', profile)
				if (profile.phone) {
					commit('SET_REGISTERED', true)
				}
			}
		})
		return new Promise(resolve => resolve())
	},
	
	//weixin login
	wxLogin({ dispatch, commit }) {
		const token = uni.getStorageSync('token')
		function getInfo() {
			uni.getUserInfo({
				success: res => {
					const { userInfo } = res
					commit('SET_PROFILE', userInfo)
					$api.user.putProfile(userInfo).then(_ => {
						dispatch('updateUser')
					})
				},
				fail: () => {
					console.log('未授权')
					dispatch('updateUser')
				}
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
						$api.user
							.wxLogin({
								code: res.code
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

	// user login
	login({ dispatch, commit }) {
		const token = uni.getStorageSync('token')
		commit('SET_TOKEN', token)
		dispatch('updateUser')
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
