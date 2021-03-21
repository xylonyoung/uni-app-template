import Mock from 'mockjs'
import { Api } from '@/api/api'
import { getFiles } from './utils'

class MockApi extends Api {
  constructor() {
    super()
    this.requestData = {}
    this.initMock()
  }
  
  request(method, url, data = {}) {
    return new Promise((resolve) => {
      const name = url.replace('/', '')
      resolve(this.createMock(data, this.requestData[method][name]))
    })
  }

  initMock() {
    const fileList = getFiles()
    fileList.forEach((e) => {
      for (const [key, value] of Object.entries(e)) {
        const path = key.split('.')
        const url = path[0]
        const method = path[1].toUpperCase()
        this.requestData[method] = Object.assign({}, this.requestData[method])
        this.requestData[method][url] = value
      }
    })
  }

  createMock(data, func) {
    return Mock.mock(
      Object.assign(
        {
          code: 0,
          status: 200,
          message: 'success',
        },
        func(data)
      )
    )
  }
}

export default new MockApi()
