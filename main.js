import Vue from 'vue'
import App from './App'
import store from './store'
import uView from 'uview-ui'
import vueUse from './utils/vue-use'
import './utils/run'

Vue.use(uView)

//set global functions, variables, components, etc.
Vue.use(vueUse)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
