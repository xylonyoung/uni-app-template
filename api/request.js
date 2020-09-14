import store from '../store'
import {baseURL} from './url.js'

function request(method, url, data) {
	const token = store.getters.token
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url,
			header: {
				'Content-Type': 'application/json;charset=UTF-8',
				'X-Auth-Token': token,
			},
			data: data || {},
			method: method,
			dataType: 'json',
			responseType: 'text',
			success(res) {
				if (res.data.code === 0) {
					resolve(res.data)
				} else if (
					res.statusCode === 403 &&
					res.data.message === 'Username could not be found.'
				) {
					uni.showToast({
						title: '登录过期，正在跳转登录',
						icon: 'none',
						duration: 3000
					})
					setTimeout(() => {
						uni.clearStorageSync()
						let url = '../login/login'
						//#ifdef MP-WEIXIN
						url = '../index/index'
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
						icon: 'none',
					})
				}
			},
			fail(err) {
				uni.showToast({
					title: '网络错误！',
					icon: 'none',
				})
			},
		})
	})
}

function post(url, data) {
	return request('POST', url, data)
}

function del(url, data) {
	return request('DELETE', url, data)
}

function put(url, data) {
	return request('PUT', url, data)
}

function get(url, data) {
	return request('GET', url, data)
}

module.exports = {
	request,
	post,
	del,
	put,
	get,
}
