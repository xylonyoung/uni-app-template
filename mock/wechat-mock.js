import { Request } from '@/utils/request'
import { getFiles, createMock } from './mock-utils'

class MockRequest extends Request {
  constructor() {
    super()
    this.requestData = {}
    this.initMock()
  }

  async aRequest(method, url, data = {}) {
    await new Promise((resolve) => setTimeout(resolve, 666))
    return createMock(data, this.requestData[method][url])
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

export default new MockRequest()
