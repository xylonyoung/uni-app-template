<template>
  <view class="cart-bar-container">
    <view class="left">
      <navigator class="item" url="/pages/home/home" open-type="switchTab">
        <u-icon name="home" :size="40"></u-icon>
        <view>店铺</view>
      </navigator>
      <view class="item">
        <u-icon name="server-fill" :size="40"></u-icon>
        <view>客服</view>
      </view>
      <navigator class="item car" url="/pages/cart/cart" open-type="switchTab">
        <u-badge
          class="car-num"
          :count="cartBadge"
          type="error"
          :offset="[-3, -6]"
        ></u-badge>
        <u-icon name="shopping-cart" :size="40"></u-icon>
        <view>购物车</view>
      </navigator>
    </view>
    <view class="right">
      <view class="cart" @click="userClick">加入购物车</view>
      <view class="buy" @click="userClick">立即购买</view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      cartBadge: 0,
    }
  },
  computed: {
    ...mapGetters(['cart']),
  },
  watch: {
    cart: {
      handler(val) {
        this.cartBadge = val.length
      },
      immediate: true,
    },
  },
  methods: {
    userClick() {
      this.$emit('buy')
    },
  },
}
</script>

<style lang="scss">
.cart {
  background-color: #ed3f14;
}
.buy {
  background-color: #ff7900;
}
.cart-bar-container {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 2rpx #f2f2f2;
  background-color: #ffffff;
  padding: 16rpx 0;
}
.left {
  display: flex;
  font-size: 20rpx;
  .item {
    margin: 0 30rpx;
    &.car {
      text-align: center;
      position: relative;
      .car-num {
        position: absolute;
        top: -10rpx;
        right: -10rpx;
      }
    }
  }
}
.right {
  margin-right: 30rpx;
  display: flex;
  align-items: center;
  // border-radius: 100rpx;
  overflow: hidden;
  color: #fff;
  font-size: 28rpx;
  text-align: center;
  view {
    width: 25vw;
    padding: 20rpx 0;
  }
}
</style>
