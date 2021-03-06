import { baseURL } from '@/settings'
import store from '@/store'
;(function () {
  let consoleStr = '🌈🌻🌼'
  //#ifndef MP-WEIXIN
  if (process.env.NODE_ENV === 'development' && baseURL === 'https://mockjs') {
    consoleStr += 'mock'
    require('@/mock')
  }
  //#endif
  try {
    console && console.log && console.log('%c' + consoleStr, 'font-size:50px;')
  } catch (e) {
    console.log(e)
  }
  //#ifdef MP-WEIXIN
  store.dispatch('user/weChatLogin')
  //#endif
})()
