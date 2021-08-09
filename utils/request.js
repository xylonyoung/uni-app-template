import store from '@/store'
import { buildFullPath } from '@/utils'

export class Request {
  constructor() {
    this.buildMethods()
  }

  buildMethods() {
    const methods = ['post', 'delete', 'put', 'get']
    methods.forEach((e) => {
      this[e] = (requestedURL, data) => {
        const method = e.toUpperCase()
        return this.aRequest(method, requestedURL, data)
      }
    })
  }

  aRequest(method, requestedURL, data = {}) {
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
    if (!res.data) {
      errorResponse()
      return
    }

    const message = res.data?.message ?? res.data
    if (res.statusCode === 403) {
      uni.showModal({
        title: '登录错误',
        content: message,
        confirmText: '重新登录',
        success: function (res) {
          if (res.confirm) {
            store.dispatch('user/reLogin')
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }

    switch (res.data.code) {
      case 0:
        resolve(res.data)
        break
      default:
        errorResponse(message)
    }

    function errorResponse(message) {
      reject(res.data)
      console.log(res)
      uni.showToast({
        title: message || '服务器繁忙！',
        icon: 'error'
      })
    }
  }
}

export default new Request()
