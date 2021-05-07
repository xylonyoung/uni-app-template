import Vue from 'vue'
import store from '@/store'
import api from '@/api'
import { baseURL } from '@/settings'
import { getValue, getImage, numberFormat } from './index'
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
  
  store.commit('store/SET_CART', uni.getStorageSync('cart') || [])
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
    }
  })
}
