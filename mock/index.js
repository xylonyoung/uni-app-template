import Mock from 'mockjs'

Mock.setup({
  timeout: '200-600'
})

const filesList = []
const files = require.context('./data', true, /\.js$/)
files.keys().forEach(key => {
  filesList.push(files(key).default)
})

filesList.forEach(item => {
  for (const [key, value] of Object.entries(item)) {
    const path = key.split('.')
    Mock.mock(new RegExp(path[0]), path[1], function (options) {
      return createMock(options, value)
    })
  }
})

function createMock(options, func) {
  return Mock.mock(
    Object.assign(
      {
        code: 0,
        status: 200,
        message: 'success'
      },
      func(options)
    )
  )
}
