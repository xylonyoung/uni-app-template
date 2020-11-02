import request from './request'

const api = {
	loadList: '/load-list',
	pagination:'/uni-pagination'
}
class Api {
	constructor(api) {
		for (const key in api) {
			const temp = {
				post: data => this.post(api[key], data),
				del: (id, data) => this.del(`${api[key]}/${id}`, data),
				put: data => this.put(api[key], data),
				putId: (id, data) => this.put(`${api[key]}/${id}`, data),
				get: data => this.get(api[key], data),
				getId: (id, data) => this.get(`${api[key]}/${id}`, data)
			}
			this[key] = Object.assign(temp, this[key] || {})
		}
	}

	user = {
		get: data => this.get(`/api/user`, data),
		login: data => this.post(`/api-login`, data),
		wxLogin: data => this.get(`/wechat/mini/login`, data),
		putProfile: data => this.put(`/api/user-profile`, data)
	}

	// base function
	post(url, data) {
		return request('POST', url, data)
	}
	del(url, data) {
		return request('DELETE', url, data)
	}
	put(url, data) {
		return request('PUT', url, data)
	}
	get(url, data) {
		return request('GET', url, data)
	}
}

const $api = new Api(api)

export default $api
