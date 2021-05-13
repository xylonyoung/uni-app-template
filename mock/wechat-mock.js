import Api from '@/api'
import { getFiles, createMock } from './mock-utils'

class MockApi extends Api {
  constructor() {
    super()
    this.requestData = {}
    this.initMock()
  }

  async request(method, url, data = {}) {
    await new Promise((resolve) => setTimeout(resolve, 666))
    const name = url.replace('/', '')
    return createMock(data, this.requestData[method][name])
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
