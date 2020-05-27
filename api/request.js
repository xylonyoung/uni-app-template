export default {
	baseURL: 'http://bluelink.jmhsmy.com',
	request(options) {
		const token = uni.getStorageSync('token')
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.baseURL + options.url,
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
	},

	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	del(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}

}
