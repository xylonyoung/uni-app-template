import request from './request'

class Api {
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

export default new Api()
