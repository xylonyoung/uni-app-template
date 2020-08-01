import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import store from './store'
import getProperty from './utils/get-property'

Vue.prototype.getProperty = getProperty

Vue.use(uView)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store,
})
app.$mount()
