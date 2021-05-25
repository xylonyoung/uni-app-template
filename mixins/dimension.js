export default {
  methods: {
    findDimension(item) {
      return item?.metadata?.specification?.find((e) => e.id === item.dimensionId) ?? {}
    },
    dimensionName(item) {
      return this.findDimension(item)?.name
    },
    dimensionPrice(item) {
      return this.$numberFormat(this.findDimension(item)?.price)
    }
  }
}
