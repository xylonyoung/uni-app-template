import request from './request.js'

export function post(data){
	return request.post(`/api-login`,data)
}
export function put(id){
	return request.put(`/api/${id}`)
}
export function get() {
	return request.get(`/api/`)
}
export function del(id){
	return request.del(`/api/${id}`)
}
