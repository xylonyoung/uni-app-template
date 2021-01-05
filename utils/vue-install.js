import $api from '@/api'
import getValue from './get-value'

export default {
  install(Vue) {
    Vue.prototype.$api = $api
    Vue.prototype.$getValue = getValue
  }
}
