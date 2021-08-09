import $request from '@/utils/request'

const state = {
  regions: [],
  select: null
}

const actions = {
  async getRegions({ commit, state }) {
    if (state.regions.length > 0) return state.regions

    const { data } = await $request.get('/api/regions')
    const result = data ?? []
    commit('SET_REGIONS', result)
    return result
  }
}

export default {
  state,
  actions
}
