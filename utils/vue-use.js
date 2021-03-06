import api from '@/api/api'
import getValue from 'get-value'

const vueUse = {
  install(Vue) {
    Vue.prototype.$api = api
    Vue.prototype.$getValue = getValue
  }
}

export default vueUse
