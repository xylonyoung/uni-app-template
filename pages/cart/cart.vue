<template>
  <view class="cart-container">
    <view class="top" v-if="!isEmpty">
      <view></view>
      <view @click="showDelete = !showDelete">
        {{ showDelete ? '完成' : '管理' }}
      </view>
    </view>

    <view class="empty" v-if="isEmpty">
      <u-empty mode="car"></u-empty>
      <c-recommend />
    </view>

    <view class="cart-product" v-for="(item, index) in products" :key="index">
      <u-checkbox
        shape="circle"
        active-color="#ff6900"
        :value="item.checked"
        :name="index"
        :disabled="outOfStock(item)"
        @change="checkboxChange"
      ></u-checkbox>
      <view class="product-row" @click="navTo(item.id)">
        <u-image
          width="200rpx"
          height="200rpx"
          border-radius="8"
          mode="aspectFit"
          :src="$getImage(item.cover)"
        ></u-image>
        <view class="product-row-detail">
          <view>
            <view class="product-row-detail-name">{{ item.name }}</view>
            <u-tag
              :text="dimensionName(item)"
              type="info"
              @click.native.stop="toShowCartSelector(item, index)"
            />
          </view>
          <view class="product-row-detail-bottom">
            <view class="product-row-detail-bottom-price">
              {{ dimensionPrice(item) }}
            </view>
            <!-- component can reactive now! -->
            <u-number-box
              v-model="products[index].quantity"
              min="1"
              :max="stockHasLimit ? findDimension(item).stock : 999"
              @click.native.stop
            ></u-number-box>
          </view>
        </view>
      </view>
    </view>

    <view class="bottom">
      <view>
        <u-checkbox
          v-model="checkAll"
          @change="checkedAll"
          shape="circle"
          active-color="#ff6900"
        >
          全选
        </u-checkbox>
        <!-- <view v-if="discount">
          {{ member.level.__toString + '：' + $numberFormat(discount * 10) }}折
        </view> -->
      </view>
      <view class="bottom-right" v-if="showDelete">
        <u-button type="error" plain @click="deleteFromCart">删除</u-button>
      </view>
      <view class="bottom-right" v-else>
        <view class="bottom-right-price-box">
          <view>
            合计:
            <text class="bottom-right-price-box-price">
              <text>{{ amount }}</text>
            </text>
          </view>
          <view class="bottom-right-price-box-freight">含运费</view>
        </view>
        <u-button type="error" @click="toPay">结算</u-button>
      </view>
    </view>

    <c-cart-selector
      v-model="showCartSelector"
      :product.sync="product"
      hide-button
      @change="cartSelectorChange"
    />
  </view>
</template>
<script>
import { mapGetters } from 'vuex'
import dimension from '@/mixins/dimension'
export default {
  mixins: [dimension],
  data() {
    return {
      checkAll: false,
      isEmpty: false,
      showDelete: false,
      showCartSelector: false,
      products: [],
      product: {},
      productIndex: 0,
      checkList: [],
      showLoading: false
    }
  },
  computed: {
    ...mapGetters(['cart', 'stockHasLimit']),
    amount() {
      const totalPrice = this.products.reduce((acc, cur) => {
        if (!cur.checked) return acc
        const item = this.findDimension(cur)
        return acc + item?.__metadata?.price * cur.quantity
      }, 0)
      return this.$numberFormat(totalPrice * this.discount)
    },
    discount() {
      const defaultDiscount = 1
      return defaultDiscount ? defaultDiscount : 1
    }
  },
  watch: {
    products: {
      handler(val) {
        this.isEmpty = val.length === 0
        this.checkAll = this.isEmpty ? false : val.every((e) => e.checked)
      },
      deep: true
    },
    product: {
      handler(val) {
        this.products.splice(this.productIndex, 1, { ...val })
      },
      deep: true
    }
  },
  onShow() {
    this.getProducts()
    this.$store.dispatch('common/setBadge')
  },
  methods: {
    navTo(id) {
      uni.navigateTo({
        url: `/pages/product/product?id=${id}`
      })
    },
    outOfStock(item) {
      if (!this.stockHasLimit) {
        return false
      } else {
        return this.findDimension(item)?.stock <= 0
      }
    },
    toPay() {
      const products = this.products.filter((e) => e.checked)
      if (!products.length) {
        uni.showToast({
          title: '请选商品~',
          icon: 'none'
        })
        return
      }
      this.$store.dispatch('common/toPay', products)
    },
    deleteFromCart() {
      this.products = this.products.filter((e) => !e.checked)
      const cart = this.cart.filter((e) =>
        this.products.some((i) => i.id === e.productId)
      )
      this.cartChange(cart)
      this.showDelete = false
      uni.showToast({
        title: '删除成功~'
      })
    },
    cartChange(cart) {
      this.$store.dispatch('common/setCart', cart)
      this.$store.dispatch('common/setBadge')
    },
    toShowCartSelector(item, index) {
      this.product = { ...item }
      this.productIndex = index
      this.showCartSelector = true
    },
    async getProducts() {
      uni.showLoading()
      const productsId = []
      const cart = this.cart.map((e) => {
        productsId.push(e.productId)
        return { ...e, checked: false }
      })
      const res = await this.$api.get('/api/products', {
        '@filter': `entity.getId() in [${productsId}]`
      })

      const products = []
      cart.forEach((e) => {
        const result = res.data.find((i) => i.id === e.productId)
        if (result) {
          products.push({ ...result, ...e })
        }
      })
      this.products = products
      uni.hideLoading()

      // remove inexistent products
      if (this.cart.length > products.length) {
        const aCart = this.cart.filter((e) =>
          products.some((i) => i.id === e.productId)
        )
        this.cartChange(aCart)
      }
    },
    checkboxChange(event) {
      this.products[event.name].checked = event.value
    },
    checkedAll(event) {
      if (event.value) {
        this.products.forEach((e) => {
          if (e.quantity > 0 && !this.outOfStock(e)) e.checked = true
        })
      } else {
        this.products.forEach((e) => {
          e.checked = false
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/product';
.cart-container {
  min-height: 100vh;
  background-color: $c-background;
}

.cart-container {
  padding-bottom: 124rpx;
}
.top {
  position: sticky;
  top: 0;
  z-index: 99;
  padding: 24rpx;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}
.empty {
  padding-top: 80rpx;
}
.cart-product {
  margin: 24rpx 0;
  padding: 24rpx;
  display: grid;
  grid-template-columns: 10% 90%;
  place-items: center;
  background-color: #fff;
}
.bottom {
  position: fixed;
  bottom: 0;
  z-index: 99;
  width: 100%;
  padding: 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $c-border;
  background-color: #fff;
  &-right {
    display: flex;
    align-items: flex-end;
    &-price-box {
      margin-right: 24rpx;
      &-freight {
        color: $c-gray;
        font-size: 20rpx;
      }
      &-price {
        color: $c-price;
        text {
          padding-left: 4rpx;
          font-size: 40rpx;
          font-weight: bold;
          &::before {
            content: '£';
            padding-right: 4rpx;
            font-size: 24rpx;
          }
        }
      }
    }
  }
}
</style>