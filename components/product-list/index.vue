<template>
  <view class="product">
    <view
      class="product-item"
      v-for="(item, index) in productList"
      :key="index"
      @click="navTo(item.id)"
    >
      <u-image
        width="330rpx"
        height="330rpx"
        border-radius="16"
        mode="aspectFit"
        :src="$getImage(item.cover)"
      ></u-image>
      <view class="product-item-name">{{ item.name }}</view>
      <view class="product-item-bottom">
        <view class="product-item-bottom-price">
          {{ $numberFormat(item.price, 0) }}
        </view>
        <view class="product-item-bottom-sold">
          已售{{ $numberFormat(item.sales) }}件
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
    navTo(id) {
      uni.navigateTo({
        url: `/pages/product/product?id=${id}`
      })
    }
  }
}
</script>
<style lang='scss'>
@import '@/styles/product';
</style>