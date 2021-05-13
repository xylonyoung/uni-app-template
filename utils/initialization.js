import Vue from 'vue'
import store from '@/store'
import api from '@/api'
import lodash from 'lodash'
import { baseURL } from '@/settings'
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
  try {
    console?.log && console.log('%c' + consoleStr, 'font-size:50px;')
  } catch (e) {
    console.log(e)
  }

  vueUse($api)

  store.commit('common/SET_CART', uni.getStorageSync('cart') || [])
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
      Vue.prototype._ = lodash
    }
  })
}
