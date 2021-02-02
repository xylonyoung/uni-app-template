import $api from '@/api'
import getValue from 'get-value'

const vueUse = {
  install(Vue) {
    Vue.prototype.$api = $api
    Vue.prototype.$getValue = getValue
  }
}

export default vueUse
