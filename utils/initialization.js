import Vue from 'vue'
import api from '@/api'
import { baseURL } from '@/config'
import { getValue, getImage, numberFormat } from './index'
;(async function initialization() {
  let consoleStr = '🌈🌻🌼'
  let $api

  // when development need mock or not?
  if (process.env.NODE_ENV === 'development' && baseURL === 'https://mockjs') {
    consoleStr += 'mock'
    //#ifndef MP-WEIXIN
    import('@/mock')
    //#endif
    //#ifdef MP-WEIXIN
    await import('@/mock/wechat-mock').then((module) => {
      $api = module.default
    })
    //#endif
  } else {
    $api = api
  }

  // debug console hint
  console?.log('%c' + consoleStr, 'font-size:50px;')

  vueUse($api)
})()

/**
 ** set global functions, variables, components, etc.
 */
function vueUse($api) {
  Vue.use({
    install(Vue) {
      Vue.prototype.$api = $api
      Vue.prototype.$getValue = getValue
      Vue.prototype.$getImage = getImage
      Vue.prototype.$numberFormat = numberFormat
    }
  })
}
