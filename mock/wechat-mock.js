import { Api } from '@/api'
import { getFiles, createMock } from './mock-utils'

class MockApi extends Api {
  constructor() {
    super()
    this.requestData = {}
    this.initMock()
  }

  request(method, url, data = {}) {
    return new Promise((resolve) => {
      const name = url.replace('/', '')
      setTimeout(() => {
      resolve(createMock(data, this.requestData[method][name]))
      }, 666);
    })
  }

  initMock() {
    const fileList = getFiles()
    fileList.forEach((e) => {
      for (const [key, value] of Object.entries(e)) {
        const path = key.split('.')
        const url = path[0]
        const method = path[1].toUpperCase()
        this.requestData[method] = { ...this.requestData[method] }
        this.requestData[method][url] = value
      }
    })
  }
}

export default new MockApi()
