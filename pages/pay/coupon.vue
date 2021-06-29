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
        <view class="coupon" v-for="(item, index) in couponList" :key="index">
          <view class="coupon-top">
            <view class="coupon-top-detail">
              <view class="discount">
                {{
                  $numberFormat($getValue(item, 'coupon.__metadata.discount'))
                }}
              </view>
              <view class="reduction">
                <view>满减券</view>
                <view>
                  满{{
                    $numberFormat(
                      $getValue(item, 'coupon.__metadata.threshold')
                    )
                  }}英镑可用
                </view>
              </view>
            </view>
            <u-button
              type="warning"
              shape="circle"
              plain
              @click="useCoupon(item)"
            >
              立即使用
            </u-button>
          </view>

          <view class="coupon-bottom">
            <view>
              {{ $u.timeFormat(item.expiredTime, 'yyyy/mm/dd/ MM:ss') }}前可使用
            </view>
          </view>
        </view>

        <view class="not-use">
          <u-button @click="useCoupon(null)">不使用优惠券</u-button>
        </view>
      </view>
    </c-load-list>
  </view>
</template>
<script>
export default {
  data() {
    return {
      couponList: [],
      listApi: '/api/user-coupons',
      listQuery: {
        '@filter': `entity.getIsUsed() == false && entity.getExpiredTime() > datetime.get('${new Date().toISOString()}')`
      }
    }
  },
  methods: {
    useCoupon(coupon) {
      this.$emit('change', coupon?.coupon?.__metadata)
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/coupon.scss';
.not-use {
  margin-top: 40rpx;
}
</style>