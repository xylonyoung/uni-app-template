import $request from '@/utils/request'

const state = {
  list: []
}

const actions = {
  async get({ state, commit }) {
    if (state.list.length > 0) return state.list

    const { data } = await $request.get('/api/categories', {
      '@filter': 'entity.getEnabled() && entity.getType().getName() == "产品"'
    })
    const result = data ?? []
    commit('SET_LIST', result)
    return result
  }
}

export default {
  state,
  actions
}
