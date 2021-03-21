import Mock from 'mockjs'
import { getFiles, param2Obj } from './utils'

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
        return createMock(options, value)
      })
    }
  })
}

function createMock(options, func) {
  const data = param2Obj(options.url)
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

