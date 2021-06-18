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
        <u-image mode="widthFix" :src="$getImage(item.image)"></u-image>
      </view>
      <view class="not-use" v-if="usable">
        <u-button @click="notUse">不使用优惠券</u-button>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    type: { type: String, default: 'use' },
    value: { type: Array, default: () => [] },
    usable: { type: Boolean, default: false }
  },
  data() {
    return { couponList: [], empty: false }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      let res
      if (this.type === 'get') {
        res = await this.$api.get('/api/coupons', {
          '@filter': 'entity.getEnabled()'
        })
      } else {
        res = await this.$api.get('/api/user-coupons', {
          '@filter': 'entity.getIsUsed() == false'
        })
      }
      const result = res.data.map((e) => {
        if (e.image) return e
        return { ...e, image: e.coupon?.__metadata?.image }
      })
      this.couponList = result
      this.$emit('input', result)
      if (result.length === 0) this.empty = true
    },
    selectConfirm(id) {
      if (this.type === 'get') {
        this.$api.post('/api/user-coupons', { coupon: id }).then((res) => {
          uni.showToast({
            title: '领取成功',
            duration: 2000
          })
        })
      } else {
        this.$emit('change', id)
      }
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