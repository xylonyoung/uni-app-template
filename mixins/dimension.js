export default {
  methods: {
    findDimension(item) {
      return item.specifications.find((e) => e.id === item.dimensionId) ?? {}
    },
    dimensionName(item) {
      return this.findDimension(item)?.__metadata?.name
    },
    dimensionPrice(item) {
      return this.$numberFormat(this.findDimension(item)?.__metadata?.price)
    }
  }
}
