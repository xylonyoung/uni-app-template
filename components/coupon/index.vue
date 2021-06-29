<template>
  <view class="coupon-container">
    <view class="coupon" :class="disable ? 'disable' : ''">
      <view>
        <view class="discount">
          {{ $numberFormat(coupon.discount) }}
        </view>
        <view class="reduction">
          满{{ $numberFormat(coupon.threshold) }}英镑可用
        </view>
      </view>
      <view class="receive" v-if="disable">
        已
        <br />
        经
        <br />
        领
        <br />
        取
      </view>
      <view class="receive" v-else>
        立
        <br />
        即
        <br />
        领
        <br />
        取
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    coupon: { type: Object, default: () => ({}) },
    disable: { type: Boolean, default: false }
  }
}
</script>
<style lang='scss' scoped>
.coupon-container {
  .disable {
    background: radial-gradient(circle at right top, transparent 12rpx, #eee 0)
        top left / 260rpx 51% no-repeat,
      radial-gradient(circle at right bottom, transparent 12rpx, #eee 0) bottom
        left / 260rpx 51% no-repeat,
      radial-gradient(circle at left top, transparent 12rpx, #eee 0) top right /
        60rpx 51% no-repeat,
      radial-gradient(circle at left bottom, transparent 12rpx, #eee 0) bottom
        right / 60rpx 51% no-repeat;
    color: $c-font;
  }
}

.coupon {
  width: 320rpx;
  height: 160rpx;
  position: relative;
  background: radial-gradient(circle at right top, transparent 12rpx, #ff6900 0)
      top left / 260rpx 51% no-repeat,
    radial-gradient(circle at right bottom, transparent 12rpx, #ff6900 0) bottom
      left / 260rpx 51% no-repeat,
    radial-gradient(circle at left top, transparent 12rpx, #eee 0) top right /
      60rpx 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 12rpx, #eee 0) bottom
      right / 60rpx 51% no-repeat;
  filter: drop-shadow(4rpx 4rpx 4rpx rgba(0, 0, 0, 0.3));
  color: #fff;

  &::before {
    content: '';
    height: 100rpx;
    border: 4rpx dashed #fff;
    position: absolute;
    left: 258rpx;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  &::after {
    content: '';
    position: absolute;
    width: 5rpx;
    height: 100%;
    top: 0;
    right: -5rpx;
    background-image: linear-gradient(
        to bottom,
        #eee 5rpx,
        transparent 5rpx,
        transparent
      ),
      radial-gradient(10rpx circle at 5rpx 10rpx, transparent 5rpx, #eee 5rpx);
    background-size: 5rpx 15rpx;
  }

  .discount,
  .reduction {
    width: 260rpx;
    display: flex;
    justify-content: center;
  }

  .discount {
    height: 100rpx;
    padding-top: 16rpx;
    font-size: 60rpx;
    &::before {
      content: '£';
      padding: 36rpx 4rpx 0;
      font-size: 24rpx;
    }
  }

  .receive {
    position: absolute;
    top: 0;
    right: 10rpx;
    color: #000;
  }
}
</style>