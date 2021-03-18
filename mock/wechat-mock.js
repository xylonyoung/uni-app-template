import Mock from 'mockjs'

class MockApi {
  constructor() {
    this.requestData = {}
    this.initMock()
  }

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
    return new Promise(resolve => {
      const name = url.replace('/', '')
      resolve(this.createMock(data, this.requestData[method][name]))
    })
  }

  initMock() {
    const fileList = this.getFiles()
    fileList.forEach(e => {
      this.getRequestData(e)
    })
  }

  getRequestData(arg) {
    for (const [key, value] of Object.entries(arg)) {
      const path = key.split('.')
      const url = path[0]
      const method = path[1].toUpperCase()
      this.requestData[method] = Object.assign({}, this.requestData[method])
      this.requestData[method][url] = value
    }
  }

  getFiles() {
    const result = []
    const files = require.context('./data', true, /\.js$/)
    files.keys().forEach(key => {
      result.push(files(key).default)
    })
    return result
  }

  createMock(data, func) {
    return Mock.mock(
      Object.assign(
        {
          code: 0,
          status: 200,
          message: 'success'
        },
        func(data)
      )
    )
  }
}

export default new MockApi()
