import { post, del, put, get } from './request'

class Api {
  user = {
    get: data => get(`/api/user`, data),
    login: data => post(`/api-login`, data),
    putProfile: data => put(`/api/user-profile`, data),
  }
  loadList = {
    get: data => get(`/load-list`, data),
  }
  pagination = {
    get: data => get('/uni-pagination', data),
  }
}

const api = new Api()

export default api
