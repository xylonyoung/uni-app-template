import store from '@/store'
import { buildFullPath } from '@/utils'

export class Api {
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
    const url = buildFullPath(requestedURL)
    const header = {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Auth-Token': token
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
        }
      })
    })
  }

  responseProcess(res, resolve, reject) {
    if (res.statusCode === 403) {
      store.dispatch('user/reLogin')
      return
    }
    if (!res.data) {
      errorResponse()
      return
    }
    
    switch (res.data.code) {
      case 0:
        resolve(res.data)
        break
      case -2:
        errorResponse(
          res.data.message === 'The user is not found.' ? '没有此用户~' : null
        )
        break
      default:
        errorResponse()
    }

    function errorResponse(message) {
      reject(res.data)
      console.log(res)
      uni.showToast({
        title: message || '服务器繁忙！',
        icon: 'none'
      })
    }
  }
}

export default new Api()
