<template>
  <view>
    <c-load-list
      ref="loadList"
      :list.sync="couponList"
      :list-api="listApi"
      :list-query.sync="listQuery"
      empty-mode="coupon"
    >
      <view class="coupon-wrapper">
        <view
          class="coupon"
          :class="hasCoupon(item) ? 'disable' : ''"
          v-for="(item, index) in couponList"
          :key="index"
        >
          <view class="coupon-top">
            <view class="coupon-top-detail">
              <view class="discount">
                {{ $numberFormat(item.discount) }}
              </view>
              <view class="reduction">
                <view>满减券</view>
                <view>满{{ $numberFormat(item.threshold) }}英镑可用</view>
              </view>
            </view>
            <u-button v-if="hasCoupon(item)" shape="circle" plain disabled>
              已领取
            </u-button>
            <u-button
              v-else
              type="warning"
              shape="circle"
              plain
              @click="receiveCoupon(item.id)"
            >
              立即领取
            </u-button>
          </view>

          <view class="coupon-bottom">
            <view>有效日期：领取{{ item.duringDay }}天内有效</view>
          </view>
        </view>
      </view>
    </c-load-list>
  </view>
</template>
<script>
import couponMixin from '@/mixins/coupon'
export default {
  mixins: [couponMixin],
  data() {
    return {
      listApi: '/api/coupons',
      listQuery: {
        '@filter': 'entity.getEnabled()'
      }
    }
  },
  created() {
    this.getUserCoupons()
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/coupon.scss';
</style>