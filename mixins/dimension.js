export default {
  computed: {
    selectedDimension() {
      return (
        this.product?.specifications?.find(
          (e) => e.id === this.product.dimensionId
        ) ?? this.product?.specifications?.[0]
      )
    },
    dimensionCover(){
      return this.$getImage(this.selectedDimension?.__metadata?.cover)
    },
    dimensionPrice() {
      return this.$numberFormat(this.selectedDimension?.__metadata?.price)
    },
    dimensionMarketPrice() {
      return this.$numberFormat(this.selectedDimension?.__metadata?.marketPrice)
    }
  },
  methods: {
    findDimension(item) {
      return item.specifications.find((e) => e.id === item.dimensionId) ?? {}
    },
    getDimensionName(item) {
      return this.findDimension(item)?.__metadata?.name
    },
    getDimensionPrice(item) {
      return this.$numberFormat(this.findDimension(item)?.__metadata?.price)
    }
  }
}
