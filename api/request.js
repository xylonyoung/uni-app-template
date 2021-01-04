import store from '@/store'
import { baseURL } from '@/settings'

export default function request(method, url, data) {
	const token = store.getters.token
	// auto concatenation '/' in fornt of url
	url = url.indexOf('/') === 0 ? url : `/${url}`
	// https://uniapp.dcloud.io/api/request/request
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url,
			header: {
				'Content-Type': 'application/json;charset=UTF-8',
				'X-Auth-Token': token
			},
			data: data || {},
			method: method,
			dataType: 'json',
			responseType: 'text',
			success(res) {
				if (res.data.code === 0) {
					resolve(res.data)
				} else if (res.statusCode === 403) {
					//login again
					uni.showToast({
						title: '登录过期，正在跳转登录',
						icon: 'none',
						duration: 3000
					})
					setTimeout(_ => {
						uni.removeStorageSync('token')
						let url = '/pages/login/login'
						//#ifdef MP-WEIXIN
						url = '/pages/home/home'
						//#endif
						uni.reLaunch({
							url: url
						})
					}, 2000)
				} else {
					reject(res.data)
					let message = res.data.message || res.data
					uni.showToast({
						title: message,
						icon: 'none'
					})
				}
			},
			fail(err) {
				console.log('error' + err)
				uni.showToast({
					title: '服务器繁忙！',
					icon: 'none'
				})
			},
			complete(res) {
				uni.hideLoading()
			}
		})
	})
}
