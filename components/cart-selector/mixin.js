export default{
  computed:{
    selectedDimension() {
      return (
        this.product?.specifications?.find(
          (e) => e.id === this.product.dimensionId
        ) ?? this.product?.specifications?.[0]
      )
    },
    dimensionPrice() {
      return this.$numberFormat(this.selectedDimension?.__metadata?.price)
    },

  }
}