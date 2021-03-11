import store from '@/store'
import { baseURL } from '@/settings'

class Api {
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
  request(method, url, data) {
    const token = store.getters.token
    // https://uniapp.dcloud.io/api/request/request
    return new Promise((resolve, reject) => {
      uni.request({
        url: baseURL + url,
        header: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Auth-Token': token
        },
        data: data || {},
        method: method,
        dataType: 'json',
        responseType: 'text',
        success(res) {
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res.data)
            uni.showToast({
              title: res.data.message || res.data,
              icon: 'none'
            })
          }
        },
        fail(err) {
          console.log('error' + err)
          if (err.status === 403) {
            //login again
            store.dispatch('user/reLogin')
          } else {
            uni.showToast({
              title: '服务器繁忙！',
              icon: 'none'
            })
          }
        }
      })
    })
  }
}

export default new Api()
