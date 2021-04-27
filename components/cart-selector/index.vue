<template>
  <u-popup
    class="cart-selector-container"
    v-model="showDimension"
    mode="bottom"
    @close="popupClose"
  >
    <view class="product">
      <view class="product-cover">
        <u-image
          width="200rpx"
          height="200rpx"
          :src="$getImage(product.cover)"
        ></u-image>
      </view>
      <view>
        <view class="product-price">
          <text>￥</text>
          <text>{{ dimensionPrice }}</text>
        </view>
        <view class="product-stock">库存{{ inventoryQuantity }}件</view>
      </view>
    </view>

    <view class="dimension">
      <view>规格</view>
      <view>
        <u-tag
          class="dimension-tag"
          v-for="(item, index) in dimensionList"
          :key="index"
          :text="item.name"
          :type="index === dimensionIndex ? 'error' : 'info'"
          @click="dimensionChange(index)"
        />
      </view>
    </view>

    <u-gap height="40" v-if="hideButton"></u-gap>

    <view v-else>
      <view class="quantity">
        <view>购买数量</view>
        <u-number-box
          v-model="quantity"
          :min="1"
          :max="inventoryQuantity"
        ></u-number-box>
      </view>
      <view class="bottom">
        <view class="bottom-cart" @click="addToCart">加入购物车</view>
        <view class="bottom-buy" @click="toPay">立即购买</view>
      </view>
    </view>
  </u-popup>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    value: { type: Boolean, default: false },
    product: { type: Object, default: () => ({}) },
    hideButton: { type: Boolean, default: false },
  },
  data() {
    return {
      showDimension: false,
      dimensionList: [],
      dimensionIndex: 0,
      quantity: 1,
    }
  },
  computed: {
    ...mapGetters(['cart']),
    inventoryQuantity() {
      return this.selectedDimension ? this.selectedDimension.inventory : 0
    },
    selectedDimension() {
      return this.dimensionList[this.dimensionIndex] ?? {}
    },
    dimensionPrice() {
      return this.$numberFormat(this.selectedDimension.price)
    },
  },
  watch: {
    value: {
      handler(val) {
        this.showDimension = val
      },
      immediate: true,
    },
    product: {
      handler(val) {
      if(val.dimension)  this.dimensionList = [...val.dimension]
      },
      immediate: true,
    },
  },
  methods: {
    toPay() {
      const product = {
        ...this.product,
        quantity: this.quantity,
        dimension: this.selectedDimension.id,
      }
      this.$store.dispatch('store/toPay', [product])
    },
    cartChange(cart) {
      this.$store.dispatch('store/setCart', cart)
      this.$store.dispatch('store/setBadge')
      this.popupClose()
    },
    addToCart() {
      if (this.selectedDimension.remains < 1) {
        uni.showToast({
          title: '库存不足~',
          icon: 'none',
        })
        return
      }

      const product = {
        productId: this.product.id,
        dimension: this.selectedDimension.id,
        quantity: this.quantity,
      }
      const cart = [...this.cart]
      const index = cart.findIndex((e) => e.productId === product.productId)
      if (index !== -1) {
        cart[index] = product
      } else {
        cart.unshift(product)
      }
      this.cartChange(cart)
      uni.showToast({
        title: '加入成功~',
      })
    },
    dimensionChange(index) {
      this.dimensionIndex = index
      this.$emit('change', index)
    },
    popupClose() {
      this.$emit('input', false)
    },
  },
}
</script>
<style lang='scss'>
.product {
  padding: 30rpx;
  display: flex;
  &-price {
    padding-left: 40rpx;
    color: $c-price;
    font-weight: bold;
    text:last-child {
      font-size: 50rpx;
    }
  }
  &-stock {
    padding: 10rpx 40rpx;
    color: #999;
  }
}
.dimension {
  padding: 0 30rpx;
  view:first-child {
    margin-bottom: 20rpx;
  }
  u-tag + u-tag {
    margin-left: 20rpx;
  }
}
.quantity {
  display: flex;
  justify-content: space-between;
  padding: 30rpx;
}
.bottom {
  display: flex;
  align-items: center;
  color: #fff;
  text-align: center;
  view {
    width: 50%;
    padding: 20rpx;
  }
  &-cart {
    background-color: #ed3f14;
  }
  &-buy {
    background-color: #ff7900;
  }
}
</style>