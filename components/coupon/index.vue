<template>
  <view class="coupon-container">
    <u-empty mode="coupon" v-if="empty"></u-empty>
    <view>
      <view
        class="coupon-image"
        v-for="(item, index) in couponList"
        :key="index"
        @click="selectConfirm(item.id)"
      >
        <u-image
          mode="widthFix"
          :src="$getImage($getValue(item, 'coupon.__metadata.image'))"
        ></u-image>
      </view>
      <view class="not-use" v-if="use">
        <u-button @click="notUse">不使用优惠券</u-button>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    value: { type: Array, default: () => [] },
    use: { type: Boolean, default: true }
  },
  data() {
    return { couponList: [], empty: false }
  },
  created() {
    this.$api
      .get('/api/user-coupons', { '@filter': 'entity.getIsUsed() == false' })
      .then((res) => {
        this.couponList = res.data
        this.$emit('input', res.data)
        if (res.data.length === 0) this.empty = true
      })
  },
  methods: {
    selectConfirm(id) {
      this.$emit('change', id)
    },
    notUse() {
      this.$emit('change', null)
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
  .not-use {
    margin: 24rpx;
  }
}
</style>