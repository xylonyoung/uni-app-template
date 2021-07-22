import $api from '@/api'

const state = {
  list: []
}

const actions = {
  async getRegionList({ commit, state }) {
    if (state.list.length > 0) return state.list
    
    const { data } = await $api.get('api/regions')
    const result = data ?? []
    commit('SET_LIST', result)
    return result
  }
}

export default {
  state,
  actions
}
