<template>
  <u-popup
    class="popup"
    v-model="showDimension"
    mode="bottom"
    @close="popupClose"
  >
    <view class="product-detail">
      <view class="image">
        <u-image
          width="200rpx"
          height="200rpx"
          :src="$getImage(product.cover)"
        ></u-image>
      </view>
      <view>
        <view class="price">
          <text>￥</text>
          <text>{{ dimensionPrice }}</text>
        </view>
        <view class="stock">库存{{ inventoryQuantity }}件</view>
      </view>
    </view>
    <view class="dimension">
      <view>规格</view>
      <view>
        <u-tag
          class="tag"
          v-for="(item, index) in dimensionList"
          :key="index"
          :text="item.__metadata.name"
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
        <view class="cart" @click="addToCart">加入购物车</view>
        <!-- TODO -->
        <view class="buy" @click="toPay">立即购买</view>
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
    ...mapGetters(['cart', 'storeInfo']),
    inventoryQuantity() {
      return this.selectedDimension ? this.selectedDimension.remains : 0
    },
    selectedDimension() {
      return this.dimensionList[this.dimensionIndex] ?? {}
    },
    dimensionPrice() {
      return this.selectedDimension.__metadata
        ? this.$numberFormat(this.selectedDimension.__metadata.price)
        : 0
    },
  },
  watch: {
    value: {
      handler(val) {
        this.showDimension = val
      },
      immediate: true,
    },
    product(val) {
      // reset data
      if (val.specificationId) {
        this.dimensionIndex = val.specifications.findIndex(
          (e) => e.id === val.specificationId
        )
      } else {
        this.dimensionIndex = 0
      }
      this.dimensionList = [...val.specifications]
      this.quantity = 1
      this.getRemains()
    },
  },
  methods: {
    toPay() {
      const product = {
        ...this.product,
        quantity: this.quantity,
        specificationId: this.selectedDimension.id,
      }
      this.$store.dispatch('store/toPay', [product])
    },
    getRemains() {
      this.dimensionList.forEach((e, index) => {
        e.remains ??
          this.$api
            .get(`/api/stocks/specifications/${e.id}/remains`)
            .then((res) => {
              const { remains } = res.data.find(
                (i) => i.store.id === this.storeInfo.id
              )
              this.$set(this.dimensionList[index], 'remains', remains)
            })
      })
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
        specificationId: this.selectedDimension.id,
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
.cart {
  background-color: #ed3f14;
}
.buy {
  background-color: #ff7900;
}
.product-detail {
  padding: 30rpx;
  display: flex;
  .price {
    padding-left: 40rpx;
    color: #fa3534;
    font-weight: bold;
    text:last-child {
      font-size: 50rpx;
    }
  }
  .stock {
    padding: 10rpx 40rpx;
    color: #999;
  }
}
.dimension {
  padding: 0 30rpx;
  view:first-child {
    margin-bottom: 20rpx;
  }
  .tag + .tag {
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
}
.delete {
  padding: 20rpx;
  text-align: center;
}
</style>