import Vue from 'vue'
import App from './App'
import store from './store'
import uView from 'uview-ui'
import $api from './api'
import { getValue } from './utils/get-value'
import './utils/login.js'

// mock for fake data
if (process.env.NODE_ENV === 'development') {
	require('./mock')
}

// global api
Vue.prototype.$api = $api
// global getValue
Vue.prototype.$getValue = getValue

Vue.use(uView)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store,
})
app.$mount()
