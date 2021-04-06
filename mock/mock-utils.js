import Mock from 'mockjs'

export function getFiles() {
  const files = require.context('./data', true, /\.js$/)
  return files.keys().map((key) => files(key).default)
}

export function createMock(data, func) {
  return Mock.mock({
    code: 0,
    status: 200,
    message: 'success',
    ...func(data),
  })
}
/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach((v) => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
