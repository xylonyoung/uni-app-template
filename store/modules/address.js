import $api from '@/api'

const state = {
  regions: [],
  select: null
}

const actions = {
  async getRegions({ commit, state }) {
    if (state.regions.length > 0) return state.regions

    const { data } = await $api.get('/api/regions')
    const result = data ?? []
    commit('SET_REGIONS', result)
    return result
  }
}

export default {
  state,
  actions
}
