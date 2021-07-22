import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { snakeCase } from 'lodash'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = autoCreateMutations(value.default)
  return modules
}, {})

/**
 * auto create mutation base on state and set default namespaced:true.
 * https://vuex.vuejs.org/guide/modules.html#namespacing
 * https://vuex.vuejs.org/guide/mutations.html
 * @example state.name --> SET_NAME(state, val){state[name] = val}
 * @returns {Object}
 */
function autoCreateMutations(storeData) {
  const { state } = storeData
  const mutations = Object.keys(state).reduce((aMutation, current) => {
    aMutation[`SET_${snakeCase(current).toUpperCase()}`] = function (
      state,
      data
    ) {
      state[current] = data
    }
    return aMutation
  }, {})

  return {
    namespaced: true,
    ...storeData,
    mutations: { ...mutations, ...storeData?.mutations }
  }
}

export default new Vuex.Store({
  modules,
  getters
})
