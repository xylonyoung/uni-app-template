<template>
  <view class="favorites-container">
    <c-product-list
      :product-list="productList"
      empty-mode="favor"
    />
  </view>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      productList: []
    }
  },
  computed: {
    ...mapGetters(['favorites'])
  },
  onShow() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      const params = { '@filter': `entity.getId() in [${this.favorites}]` }
      this.$request.get('/api/products', params).then((res) => {
        this.productList = res.data
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.favorites-container {
  background-color: $c-background;
  height: min(100vh);
}
</style>