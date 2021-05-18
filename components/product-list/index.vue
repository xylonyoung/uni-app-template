<template>
  <view>
    <u-empty v-if="empty" margin-top="32"></u-empty>
    <view class="product">
      <view
        class="product-item"
        v-for="(item, index) in productList"
        :key="index"
        @click="navTo(item)"
      >
        <u-image
          width="330rpx"
          height="330rpx"
          border-radius="16"
          mode="aspectFit"
          :src="item.cover"
        ></u-image>
        <view class="product-item-name">{{ item.name }}</view>
        <view class="product-item-bottom">
          <view class="product-item-bottom-price">
            {{ productPrice(item) }}
          </view>
          <view class="product-item-bottom-sold">
            已售{{
              $numberFormat(item.sales, {
                average: true,
                mantissa: 0
              })
            }}件
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    productList: { type: Array, required: true },
    showEmpty: { type: Boolean, default: true }
  },
  computed: {
    empty() {
      return this.showEmpty && this.productList.length === 0
    }
  },
  methods: {
    productPrice(item) {
      const { specialPrice } = item
      const result = specialPrice ? specialPrice.price : item?.metadata?.specification?.[0]?.price
      return this.$numberFormat(result)
    },
    navTo(item) {
      let result = item.id
      if (item?.specialPrice) {
        result += '&specialPriceId=' + item?.specialPrice?.id
      }
      uni.navigateTo({
        url: `/pages/product/product?id=${result}`
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/product';
</style>