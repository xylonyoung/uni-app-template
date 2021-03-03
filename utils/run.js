import { baseURL } from '@/settings'
;(function () {
  let consoleStr = '🌈🌻🌼'
  // mock data
  if (process.env.NODE_ENV === 'development' && baseURL === 'https://mockjs') {
    consoleStr += 'mock'
    require('@/mock')
  }
  try {
    console && console.log && console.log('%c' + consoleStr, 'font-size:50px;')
  } catch (e) {
    console.log(e)
  }
})()
