import Vue from 'vue'
import store from '@/store'
import api from '@/api/api'
import getValue from 'get-value'
import { baseURL } from '@/settings'

initialization()

async function initialization() {
  let consoleStr = '🌈🌻🌼'
  let $api = api
  const needMock =
    process.env.NODE_ENV === 'development' && baseURL === 'https://mockjs'
  if (needMock) {
    consoleStr += 'mock'
    //#ifndef MP-WEIXIN
    require('@/mock')
    //#endif
    //#ifdef MP-WEIXIN
    await import('@/mock/wechat-mock').then(res => {
      $api = res.default
    })
    //#endif
  }

  //set global functions, variables, components, etc.
  Vue.use({
    install(Vue) {
      Vue.prototype.$api = $api
      Vue.prototype.$getValue = getValue
    }
  })
  
  //#ifdef MP-WEIXIN
  if (!needMock) {
    store.dispatch('user/weChatLogin')
  }
  //#endif

  try {
    console && console.log && console.log('%c' + consoleStr, 'font-size:50px;')
  } catch (e) {
    console.log(e)
  }
}
