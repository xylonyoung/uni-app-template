<template>
  <view class="coupon-container">
    <view
      class="coupon-image"
      v-for="(item, index) in 8"
      :key="index"
      @click="selectConfirm(item.id)"
    >
      <u-image mode="widthFix" src="/static/home/coupon.png"></u-image>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    selectConfirm(id) {
      this.$emit('change', id)
    }
  }
}
</script>
<style lang='scss' scoped>
.coupon-container {
  width: 100%;
  padding: 32rpx 15%;
  .coupon-image {
    width: 100%;
  }
  .coupon-image + .coupon-image {
    padding-top: 32rpx;
  }
}
</style>