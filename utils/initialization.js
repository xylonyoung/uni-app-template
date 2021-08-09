import Vue from 'vue'
import request from './request'
import { baseURL } from '@/config'
import { getValue, getImage, numberFormat } from './index'
;(async function initialization() {
  let aLog = '🌈🌻🌼'
  let $request

  // when development need mock or not?
  if (process.env.NODE_ENV === 'development' && baseURL === 'https://mockjs') {
    aLog += 'mock'
    //#ifndef MP-WEIXIN
    import('@/mock')
    //#endif
    //#ifdef MP-WEIXIN
    await import('@/mock/wechat-mock').then((module) => {
      $request = module.default
    })
    //#endif
  } else {
    $request = request
  }

  // debug console hint
  console?.log('%c' + aLog, 'font-size:50px;')

  vueUse($request)
})()

/**
 ** set global functions, variables, components, etc.
 */
function vueUse($request) {
  Vue.use({
    install(Vue) {
      Vue.prototype.$request = $request
      Vue.prototype.$getValue = getValue
      Vue.prototype.$getImage = getImage
      Vue.prototype.$numberFormat = numberFormat
    }
  })
}
