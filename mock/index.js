import Mock from 'mockjs'
import { getFiles, createMock, param2Obj } from './utils'

initMock()

function initMock() {
  Mock.setup({
    timeout: '200-600',
  })
  const fileList = getFiles()
  fileList.forEach((e) => {
    for (const [key, value] of Object.entries(e)) {
      const path = key.split('.')
      Mock.mock(new RegExp(path[0]), path[1], function (options) {
        const data = param2Obj(options.url)
        return createMock(data, value)
      })
    }
  })
}
