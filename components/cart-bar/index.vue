<template>
  <view class="cart-bar-container">
    <view class="left">
      <!-- <navigator class="left-item" url="/pages/home/home" open-type="switchTab">
        <u-icon name="home" :size="40"></u-icon>
        <view>首页</view>
      </navigator> -->

      <view
        v-if="isFavor"
        class="left-item"
        @click="
          () => {
            $store.dispatch('favorite/removeFromFavorites', product.id)
          }
        "
      >
        <u-icon name="star-fill" :size="40" color="#ff7900"></u-icon>
        <view>已收藏</view>
      </view>

      <view
        v-else
        class="left-item"
        @click="
          () => {
            $store.dispatch('favorite/addToFavorites', product.id)
          }
        "
      >
        <u-icon name="star" :size="40"></u-icon>
        <view>收藏</view>
      </view>

      <navigator
        class="left-item left-cart"
        url="/pages/cart/cart"
        open-type="switchTab"
      >
        <u-badge :count="cartBadge" type="error" :offset="[-4, 20]"></u-badge>
        <u-icon name="shopping-cart" :size="40"></u-icon>
        <view>购物车</view>
      </navigator>

      <button open-type="contact" class="reset-button">
        <view class="left-item">
          <u-icon name="server-fill" :size="40"></u-icon>
          <view>客服</view>
        </view>
      </button>
    </view>

    <view class="right">
      <view class="right-cart" @click="userClick">加入购物车</view>
      <view class="right-buy" @click="userClick">立即购买</view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    product: { type: Object, required: true }
  },
  data() {
    return {
      cartBadge: 0
    }
  },
  computed: {
    ...mapGetters(['cart', 'favorites']),
    isFavor() {
      return this.favorites.some((e) => e === this.product.id)
    }
  },
  watch: {
    cart: {
      handler(val) {
        this.cartBadge = val.length
      },
      immediate: true
    }
  },
  methods: {
    userClick() {
      this.$emit('buy')
    }
  }
}
</script>

<style lang="scss" scoped>
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
  width: 50%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  &-item {
    font-size: 24rpx;
    text-align: center;
  }
  &-cart {
    position: relative;
  }
}

.right {
  margin-right: 32rpx;
  display: flex;
  align-items: center;
  // border-radius: 100rpx;
  overflow: hidden;
  color: #fff;
  font-size: 28rpx;
  text-align: center;
  view {
    width: 25vw;
    padding: 24rpx 0;
  }
  &-cart {
    background-image: linear-gradient(90deg, #fdcf00, #fd9b00);
  }
  &-buy {
    background-image: linear-gradient(90deg, #ff7310, #fe3f00);
  }
}
</style>
