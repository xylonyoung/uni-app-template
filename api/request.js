import store from '@/store'
import { baseURL } from '@/settings'

export default function request(method, url, data) {
  const token = store.getters.token
  // auto concatenation '/' in fornt of url
  url = url.indexOf('/') === 0 ? url : `/${url}`
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
