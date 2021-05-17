<template>
  <view>
    <u-empty v-if="productList.length === 0" margin-top="32"></u-empty>
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
            已售{{ $numberFormat(item.sales) }}件
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    productList: { type: Array, required: true }
  },
  methods: {
    productPrice(item) {
      const { specialPrice } = item
      const result = specialPrice ? specialPrice.price : item.price
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