import store from '@/store'
import { baseURL } from '@/settings'

export class Api {
  post(url, data) {
    return this.request('POST', url, data)
  }
  del(url, data) {
    return this.request('DELETE', url, data)
  }
  put(url, data) {
    return this.request('PUT', url, data)
  }
  get(url, data) {
    return this.request('GET', url, data)
  }
  request(method, url, data = {}) {
    const token = store.getters.token
    return new Promise((resolve, reject) => {
      uni.request({
        url: baseURL + url,
        header: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Auth-Token': token,
        },
        data,
        method: method,
        dataType: 'json',
        responseType: 'text',
        complete: (res) => {
          this.responseProcess(res, resolve, reject)
        },
      })
    })
  }
  responseProcess(res, resolve, reject) {
    if (res.status === 403) {
      store.dispatch('user/reLogin')
    } else if (res.data && res.data.code === 0) {
      resolve(res.data)
    } else {
      reject(res.data)
      console.log(res)
      uni.showToast({
        title: '服务器繁忙！',
        icon: 'none',
      })
    }
  }
}

export default new Api()
