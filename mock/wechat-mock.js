import Mock from 'mockjs'

class MockApi {
  constructor() {
    this.mockData = {}
    this.initMock()
  }
  initMock() {
    const filesList = []
    const files = require.context('./data', true, /\.js$/)
    files.keys().forEach(key => {
      filesList.push(files(key).default)
    })
    filesList.forEach(e => {
      for (const [path, func] of Object.entries(e)) {
        const protocol = path.split('.')
        let url = protocol[0]
        let method = protocol[1].toUpperCase()
        this.mockData[method] = Object.assign(this.mockData, {
          [url]: func
        })
      }
    })
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
    return new Promise((resolve, reject) => {
      const name = url.replace('/', '')
      resolve(this.createMock({ body: data }, this.mockData[method][name]))
    })
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
