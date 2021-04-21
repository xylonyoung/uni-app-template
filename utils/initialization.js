import Vue from 'vue'
import api from '@/api'
import getValue from 'get-value'
import { baseURL } from '@/settings'
import { getImage, numberFormat } from './index'
;(async function initialization() {
  let consoleStr = '🌈🌻🌼'
  let $api = api
  const needMock =
    process.env.NODE_ENV === 'development' && baseURL === 'https://mockjs'

  if (needMock) {
    consoleStr += 'mock'
    //#ifndef MP-WEIXIN
    import('@/mock')
    //#endif
    //#ifdef MP-WEIXIN
    await import('@/mock/wechat-mock').then((module) => {
      $api = module.default
    })
    //#endif
  }

  try {
    console?.log && console.log('%c' + consoleStr, 'font-size:50px;')
  } catch (e) {
    console.log(e)
  }

  vueUse($api)
})()

/**
 * set global functions, variables, components, etc.
 */
function vueUse($api) {
  Vue.use({
    install(Vue) {
      Vue.prototype.$api = $api
      Vue.prototype.$getValue = getValue
      Vue.prototype.$getImage = getImage
      Vue.prototype.$numberFormat = numberFormat
    },
  })
}
