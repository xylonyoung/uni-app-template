import Vue from 'vue'
import App from './App'
import store from './store'
import uView from 'uview-ui'
import vueUse from './utils/vue-install'
import { baseURL } from './settings'

Vue.use(uView)

//set global functions, variables, components, etc.
Vue.use(vueUse)

// mock for fake data
let consoleStr = '🌈🌻🌼'
if (process.env.NODE_ENV === 'development' && baseURL === 'https://mockjs') {
  consoleStr += 'mock'
  require('./mock')
}
try {
  window.console &&
    window.console.log &&
    console.log('%c' + consoleStr, 'font-size:50px;')
} catch (e) {
  console.log(e)
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
