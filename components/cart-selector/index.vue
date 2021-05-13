<template>
  <u-popup v-model="showPopup" mode="bottom" @close="onClose">
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
          {{ $numberFormat($getValue(selectedDimension, '__metadata.price')) }}
        </view>
        <view class="product-stock" v-if="haStock">
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
export default {
  props: {
    value: { type: Boolean, default: false },
    product: { type: Object, default: () => ({}) },
    hideButton: { type: Boolean, default: false }
  },
  data() {
    return {
      showPopup: false,
      dimensionList: [],
      dimensionIndex: 0,
      quantity: 1
    }
  },
  computed: {
    ...mapGetters(['cart', 'stockHasLimit']),
    quantityInStock() {
      return this.selectedDimension ? this.selectedDimension.stock : 0
    },
    selectedDimension() {
      return this.dimensionList[this.dimensionIndex] ?? {}
    }
  },
  watch: {
    value: {
      handler(val) {
        this.showPopup = val
      },
      immediate: true
    },
    product: {
      handler(val) {
        if (!val.specifications) return
        this.dimensionList = [...val.specifications]
        const index = this.dimensionList.findIndex(
          (e) => e.id === val.dimensionId
        )
        if (index !== -1) {
          this.dimensionIndex = index
        }
      },
      immediate: true
    }
  },
  methods: {
    toPay() {
      const product = {
        ...this.product,
        quantity: this.quantity,
        dimensionId: this.selectedDimension.id
      }
      this.$store.dispatch('common/toPay', [product])
    },
    cartChange(cart) {
      this.$store.dispatch('common/setCart', cart)
      this.$store.dispatch('common/setBadge')
      this.onClose()
    },
    addToCart() {
      if (this.quantityInStock < 1) {
        uni.showToast({
          title: '库存不足~',
          icon: 'none'
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
    dimensionChange(index) {
      this.dimensionIndex = index
      this.$emit('change', index)
      if (this.hideButton) this.onClose()
    },
    onClose() {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang='scss' scoped>
.product {
  padding: 24rpx;
  display: flex;
  &-price {
    padding-left: 40rpx;
    color: $c-price;
    font-size: 40rpx;
    &::before {
      content: '£';
      padding-right: 4rpx;

      font-size: 24rpx;
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
    background-color: #ed3f14;
  }
  &-buy {
    background-color: #ff7900;
  }
}
</style>