export default {
  data() {
    return {
      regionList: [],
      selectList: [],
      loading: true
    }
  },
  methods: {
    setSelectAddress(index) {
      this.$store.commit('address/SET_SELECT', index)
    },
    getRegionFullName(id) {
      const getRegionName = (id) => {
        const anRegion = this.regionList.find((e) => e.id === id)
        if (anRegion) {
          result.unshift(anRegion.name)
        }

        const parentId = anRegion?.parent?.id
        if (parentId) {
          getRegionName(parentId)
        }
      }

      const result = []
      getRegionName(id)
      return result.join(' ')
    },
    async getRegions() {
      const res = await this.$store.dispatch('address/getRegions')
      this.regionList = res
      this.selectList = this.regionFormat(res)
      this.loading = false
    },
    regionFormat(data) {
      const result = data
        .filter((e) => e.parent === null)
        .sort((a, b) => a.listOrder - b.listOrder)
      return result.map((e) => findChild(e))

      function findChild(item) {
        if (item?.children?.length > 0) {
          const children = item.children
            .map((e) => {
              const result = data.find((i) => e.id === i.id)
              return findChild(result)
            })
            .sort((a, b) => a.listOrder - b.listOrder)

          return { ...item, children }
        }

        delete item.children
        return item
      }
    }
  }
}
