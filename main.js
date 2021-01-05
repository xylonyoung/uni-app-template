import Vue from 'vue'
import App from './App'
import store from './store'
import uView from 'uview-ui'
import vueUse from './utils/vue-install'

Vue.use(uView)

//set global functions, variables, components, etc.
Vue.use(vueUse)

// mock for fake data
if (process.env.NODE_ENV === 'development') {
  require('./mock')
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
