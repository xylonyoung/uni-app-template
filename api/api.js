import { post, del, put, get } from './request.js'
export function getData(params) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: [1, 2, 3, 4, 5] })
    }, 999)
  })
}
// export function post(data) {
// 	return post(`/api-login`, data)
// }
// export function put(id,params) {
// 	return put(`/api/${id}`,params)
// }
// export function get() {
// 	return get(`/api/`)
// }
// export function del(id) {
// 	return del(`/api/${id}`)
// }
