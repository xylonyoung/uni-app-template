<template>
  <view>
    <view v-if="empty" style="padding-top: 40rpx">
      <u-empty :mode="emptyMode"></u-empty>
    </view>
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
    showEmpty: { type: Boolean, default: true },
    emptyMode: { type: String, default: 'data' }
  },
  computed: {
    empty() {
      return this.showEmpty && this.productList.length === 0
    }
  },
  methods: {
    productPrice(item) {
      return this.$numberFormat(item?.specifications?.[0]?.__metadata?.price)
    },
    navTo(id) {
      uni.navigateTo({
        url: `/pages/product/product?id=${id}`
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/product';
</style>