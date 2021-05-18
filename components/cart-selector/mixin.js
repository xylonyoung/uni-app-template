export default {
  computed: {
    selectedDimension() {
      return (
        this.product?.metadata?.specification?.find(
          (e) => e.id === this.product.dimensionId
        ) ?? this.product?.metadata?.specification?.[0] ?? {}
      )
    },
    dimensionPrice() {
      return this.$numberFormat(this.selectedDimension?.price)
    }
  }
}
