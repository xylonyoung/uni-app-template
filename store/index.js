import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = createMutations(value.default)
  return modules
}, {})

/**
 * auto create mutation base on state
 * @example state.name --> SET_NAME(state, val){state[name] = val}
 * @returns {Object}
 */
function createMutations(storeData) {
  // https://next.vuex.vuejs.org/guide/modules.html#namespacing
  const result = { ...storeData, namespaced: true }
  const { state } = result
  const mutations = Object.keys(state).reduce((mutations, current) => {
    mutations[snakeCase(current)] = function (state, data) {
      state[current] = data
    }
    return mutations
  }, {})
  result.mutations = { ...mutations }
  return result

  function snakeCase(str) {
    const result = str.replace(/[A-Z]/g, function (match) {
      return `_${match}`
    })
    return `SET_${result.toUpperCase()}`
  }
}

export default new Vuex.Store({
  modules,
  getters,
})
