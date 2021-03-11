import Vue from 'vue'
import App from './App'
import store from './store'
import uView from 'uview-ui'
import './utils/initialization'

Vue.use(uView)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
