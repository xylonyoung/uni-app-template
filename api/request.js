const baseURL = 'http://express.jmhsmy.com'

function request(method, url, data) {
  const token = uni.getStorageSync('token')
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + url,
      header: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Auth-Token': token,
      },
      data: data || {},
      method: method,
      dataType: 'json',
      responseType: 'text',
      success(res) {
        if (res.data.code === 0) {
          resolve(res.data)
        } else if (
          token &&
          res.statusCode === 403 &&
          res.data.message === 'Username could not be found.'
        ) {
          uni.showToast({
            title: '登录过期',
            icon: 'none',
          })
          uni.clearStorageSync()
          location.reload()
        } else {
          reject(res.data)
          let message = res.data.message || res.data
          uni.showToast({
            title: message,
            icon: 'none',
          })
        }
      },
      fail(err) {
        uni.showToast({
          title: '网络错误！',
          icon: 'none',
        })
      },
    })
  })
}

function post(url, data) {
  return request('POST', url, data)
}

function del(url, data) {
  return request('DELETE', url, data)
}

function put(url, data) {
  return request('PUT', url, data)
}

function get(url, data) {
  return request('GET', url, data)
}

module.exports = {
  baseURL,
  request,
  post,
  del,
  put,
  get,
}
