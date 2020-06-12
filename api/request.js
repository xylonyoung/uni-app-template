const baseURL = 'http://47.107.144.252:8003'

const token = uni.getStorageSync('token')

function request(options) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + options.url,
			header: {
				'Content-Type': 'application/json;charset=UTF-8',
				'X-Auth-Token': token,
			},
			data: options.data,
			method: options.method,
			dataType: options.dataType,
			responseType: "text",
			success(res) {
				if (res.data.code === 0) {
					resolve(res.data)
				} else {
					reject(res.data)
					let message = res.data.message ? res.data.message : res.data
					uni.showToast({
						title: message,
						icon: 'none',
					})
				}
			},
			fail(err) {
				uni.showToast({
					title: '网络错误！',
					icon: 'none'
				})
			},
		})
	})
}

function post(url, data, options = {}) {
	options.url = url
	options.data = data
	options.method = 'POST'
	return request(options)
}

function del(url, data, options = {}) {
	options.url = url
	options.data = data
	options.method = 'DELETE'
	return request(options)
}

function put(url, data, options = {}) {
	options.url = url
	options.data = data
	options.method = 'PUT'
	return request(options)
}

function get(url, data, options = {}) {
	options.url = url
	options.data = data
	options.method = 'GET'
	return request(options)
}

module.exports = {
	baseURL,
	token,
	request,
	post,
	del,
	put,
	get
}
