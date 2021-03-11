import Mock from 'mockjs'

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
})

const filesList = []
// 使用webpack的require.context()遍历所有mock文件
const files = require.context('./data', true, /\.js$/)
files.keys().forEach(key => {
  filesList.push(files(key).default)
})
// 注册所有的mock服务
filesList.forEach(item => {
  for (const [path, func] of Object.entries(item)) {
    const protocol = path.split('.')
    Mock.mock(new RegExp(protocol[0]), protocol[1], function (options) {
      return createMock(options, func)
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
