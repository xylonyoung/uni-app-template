import { baseURL } from '@/settings'

class Api {
  constructor() {
    this.buildMethods()
  }
  buildMethods() {
    const methods = ['post', 'delete', 'put', 'get']
    methods.forEach((e) => {
      this[e] = (requestedURL, data) => {
        const method = e.toUpperCase()
        return this.request(method, requestedURL, data)
      }
    })
  }
  request(method, requestedURL, data = {}) {
    const token = uni.getStorageSync('token')
    const url = this.buildFullPath(requestedURL)
    const header = {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Auth-Token': token,
    }
    return new Promise((resolve, reject) => {
      uni.request({
        url,
        header,
        data,
        method,
        dataType: 'json',
        responseType: 'text',
        complete: (res) => {
          this.responseProcess(res, resolve, reject)
        },
      })
    })
  }
  buildFullPath(relativeURL) {
    return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
  }
  responseProcess(res, resolve, reject) {
    if (res.statusCode === 403) {
      store.dispatch('user/reLogin')
      return
    }
    if (res.data && res.data.code === 0) {
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
