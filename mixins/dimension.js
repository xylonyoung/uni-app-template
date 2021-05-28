export default {
  computed: {
    selectedDimension() {
      return (
        this.product?.metadata?.specification?.find(
          (e) => e.id === this.product.dimensionId
        ) ??
        this.product?.metadata?.specification?.[0] ??
        {}
      )
    },
    dimensionPrice() {
      return this.$numberFormat(this.selectedDimension?.price)
    }
  },
  methods: {
    findDimension(item) {
      const id = item?.specialPrice
        ? item?.specialPrice?.specification
        : item?.dimensionId
      return item?.metadata?.specification?.find((e) => e.id === id) ?? {}
    },
    getDimensionName(item) {
      return this.findDimension(item)?.name
    },
    getDimensionPrice(item) {
      return this.$numberFormat(this.findDimension(item)?.price)
    }
  }
}
