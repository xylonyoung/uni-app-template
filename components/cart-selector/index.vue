<template>
  <u-popup v-model="showPopup" mode="bottom" @close="onClose">
    <view class="product">
      <view class="product-cover">
        <u-image width="200rpx" height="200rpx" :src="dimensionCover"></u-image>
      </view>
      <view>
        <view class="product-price">
          <text>{{ dimensionPrice }}</text>
          <text>{{ dimensionMarketPrice }}</text>
        </view>
        <view class="product-stock" v-if="stockHasLimit">
          库存{{ quantityInStock }}件
        </view>
      </view>
    </view>

    <view class="dimension">
      <view>规格</view>
      <view>
        <u-tag
          class="dimension-tag"
          v-for="(item, index) in dimensionList"
          :key="index"
          :text="$getValue(item, '__metadata.name')"
          :type="dimensionTag(item.id)"
          @click="dimensionChange(item.id)"
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
          :max="stockHasLimit ? quantityInStock : 999"
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
import dimension from '@/mixins/dimension'
import { stockHasLimit } from '@/config'
export default {
  mixins: [dimension],
  props: {
    value: { type: Boolean, default: false },
    product: { type: Object, default: () => ({}) },
    hideButton: { type: Boolean, default: false }
  },
  data() {
    return {
      stockHasLimit,
      showPopup: false,
      quantity: 1
    }
  },
  computed: {
    ...mapGetters(['cart']),
    quantityInStock() {
      return this.selectedDimension?.remains ?? 0
    },
    dimensionList() {
      return this.product?.specifications ?? []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.showPopup = val
      },
      immediate: true
    }
  },
  methods: {
    withoutDimension() {
      const result = this.dimensionList.length === 0
      if (result) {
        uni.showToast({
          title: '暂无规格~',
          icon: 'error'
        })
      }
      return result
    },
    dimensionTag(id) {
      return id === this.selectedDimension?.id ? 'error' : 'info'
    },
    toPay() {
      if (this.withoutDimension()) return
      const product = {
        ...this.product,
        quantity: this.quantity,
        dimensionId: this.selectedDimension.id
      }
      this.$store.dispatch('order/toPay', [product])
    },
    addToCart() {
      if (this.withoutDimension()) return
      if (this.stockHasLimit && this.quantityInStock < 1) {
        uni.showToast({
          title: '库存不足~',
          icon: 'error'
        })
        return
      }

      const product = {
        productId: this.product.id,
        dimensionId: this.selectedDimension.id,
        quantity: this.quantity
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
        title: '加入成功~'
      })
    },
    cartChange(cart) {
      this.$store.dispatch('cart/setCart', cart)
      this.$store.dispatch('cart/setBadge')
      this.onClose()
    },
    dimensionChange(id) {
      const product = { ...this.product, dimensionId: id }
      this.$emit('update:product', product)
      if (this.hideButton) this.onClose()
    },
    onClose() {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang='scss' scoped>
@mixin symbol {
  &::before {
    content: '￥';
    padding-right: 4rpx;
    font-size: 24rpx;
  }
}
.product {
  padding: 24rpx;
  display: flex;
  &-price {
    padding-left: 40rpx;
    text:first-child {
      color: $c-price;
      font-size: 40rpx;
      @include symbol;
    }
    text:last-child {
      margin-left: 16rpx;
      color: $c-gray;
      text-decoration: line-through;
      @include symbol;
    }
  }
  &-stock {
    padding: 12rpx 40rpx;
    color: #999;
  }
}

.dimension {
  padding: 0 32rpx;
  view:first-child {
    margin-bottom: 24rpx;
  }
  u-tag + u-tag {
    margin-left: 24rpx;
  }
}

.quantity {
  display: flex;
  justify-content: space-between;
  padding: 32rpx;
}

.bottom {
  display: flex;
  align-items: center;
  color: #fff;
  text-align: center;
  view {
    width: 50%;
    padding: 24rpx;
  }
  &-cart {
    background-image: linear-gradient(90deg, #fdcf00, #fd9b00);
  }
  &-buy {
    background-image: linear-gradient(90deg, #ff7310, #fe3f00);
  }
}
</style>