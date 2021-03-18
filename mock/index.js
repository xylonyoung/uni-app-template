import Mock from 'mockjs'

initMock()

function initMock() {
  Mock.setup({
    timeout: '200-600'
  })
  const fileList = getFiles()
  fileList.forEach(e => {
    for (const [key, value] of Object.entries(e)) {
      const path = key.split('.')
      Mock.mock(new RegExp(path[0]), path[1], function (options) {
        return createMock(options, value)
      })
    }
  })
}

function getFiles() {
  const result = []
  const files = require.context('./data', true, /\.js$/)
  files.keys().forEach(key => {
    result.push(files(key).default)
  })
  return result
}

function createMock(options, func) {
  const data = param2Obj(options.url)
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

function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
