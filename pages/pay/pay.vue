<template>
  <view class="pay-container">
    <c-address v-model="address" choose />

    <view class="products">
      <view
        class="product-row"
        v-for="(item, index) in orderProducts"
        :key="index"
      >
        <u-image
          width="200rpx"
          height="200rpx"
          border-radius="8"
          mode="aspectFit"
          :src="$getImage(item.cover)"
        ></u-image>
        <view class="product-row-detail">
          <view>
            <view class="product-row-detail-name">
              {{ item.name }}
            </view>
            <view class="product-row-detail-quantity">
              <view>
                {{ getDimensionName(item) }}
              </view>
              <view>x{{ item.quantity }}</view>
            </view>
          </view>
          <view class="product-row-detail-bottom">
            <view class="product-row-detail-bottom-price" style="color: #999">
              {{ getDimensionPrice(item) }}
            </view>
          </view>
        </view>
      </view>

      <u-form-item label="订单备注" label-width="200">
        <u-input v-model="comment" />
      </u-form-item>
    </view>

    <view class="order">
      <u-cell-group>
        <u-cell-item
          title="商品总价"
          :value="`￥ ${productsAmount}`"
          :arrow="false"
        ></u-cell-item>
        <u-cell-item
          title="运费"
          :value="shippingPrice"
          :arrow="false"
        ></u-cell-item>
        <u-cell-item
          title="优惠券"
          :value="couponName"
          @click="showCoupon = true"
        ></u-cell-item>
        <u-radio-group v-model="payType">
          <u-cell-item title="微信支付" :arrow="false">
            <u-radio slot="right-icon" name="wechat"></u-radio>
          </u-cell-item>
          <u-cell-item title="线下支付" :arrow="false">
            <u-radio slot="right-icon" name="offline"></u-radio>
          </u-cell-item>
        </u-radio-group>
      </u-cell-group>
    </view>

    <view class="bottom">
      <view class="bottom-box">
        <view>
          <text class="bottom-box-total">共{{ orderProducts.length }}件，</text>
          合计:
          <text class="bottom-box-price">
            {{ amount }}
          </text>
        </view>
      </view>
      <u-button
        type="error"
        @click="createOrder"
        :loading="loading"
        :disabled="loading"
      >
        支付
      </u-button>
    </view>

    <u-popup v-model="showCoupon" mode="bottom" closeable>
      <scroll-view scroll-y style="height: 70vh">
        <coupon @change="couponChange" />
      </scroll-view>
    </u-popup>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import wechatPay from '@/utils/wechat-pay'
import dimension from '@/mixins/dimension'
import Coupon from './coupon.vue'
export default {
  mixins: [dimension],
  components: { Coupon },
  data() {
    return {
      address: {},
      comment: null,
      coupon: null,
      couponList: [],
      showCoupon: false,
      payType: 'wechat',
      loading: false
    }
  },
  computed: {
    ...mapGetters(['cart', 'orderProducts', 'user']),
    productsAmount() {
      const result = this.orderProducts.reduce((acc, cur) => {
        const item = this.findDimension(cur)
        return acc + item?.__metadata?.price * cur.quantity
      }, 0)
      return this.$numberFormat(result)
    },
    shippingPrice() {
      const region = this.address?.region
      return region?.shippingPrice ?? 0
    },
    totalPrice() {
      return Number(this.productsAmount) + Number(this.shippingPrice)
    },
    amount() {
      let aCoupon = 0
      if (this.coupon) aCoupon = this.coupon?.coupon?.__metadata?.discount

      return this.$numberFormat(this.totalPrice - aCoupon)
    },
    couponName() {
      if (!this.coupon) {
        return '查看优惠劵'
      }
      return this.coupon?.coupon?.__toString
    }
  },
  methods: {
    couponChange(coupon) {
      if (Number(coupon?.coupon?.__metadata?.threshold) > this.totalPrice) {
        uni.showToast({
          title: '未满足使用条件',
          icon: false
        })
        return
      }

      this.coupon = coupon
      this.showCoupon = false
    },
    getItems() {
      return this.orderProducts.map((e) => ({
        quantity: e.quantity,
        specification: e.dimensionId
      }))
    },
    async createOrder() {
      if (!this.address.telNumber) {
        uni.showToast({
          title: '请选择收货地址',
          icon: 'none'
        })
        return
      }

      this.loading = true

      const data = {
        items: this.getItems(),
        address: this.address.detailInfo,
        phone: this.address.telNumber,
        name: this.address.userName,
        region: this.address.region.id
      }
      if (this.coupon) data.userCoupon = this.coupon.id
      if (this.payType === 'offline') data.isOfflinePay = true
      if (this.comment) data.comment = this.comment

      const res = await this.$api.post(`/api/orders`, data)
      const id = res?.data?.invoice?.id
      if (id && this.payType === 'wechat') await wechatPay(id)

      // reset cart
      const cart = this.cart.filter(
        (e) => !this.orderProducts.some((i) => i.cart && i.id === e.id)
      )
      this.$store.dispatch('common/setCart', cart)

      uni.redirectTo({
        url: '/pages/order/detail?id=' + res.data.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/product.scss';
.pay-container {
  padding-bottom: 122rpx;
}

.products {
  padding: 24rpx;
  .product-row + .product-row {
    padding-top: 32rpx;
  }
}

.order {
  margin: 32rpx 0;
}

.bottom {
  margin: 0 32rpx 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  &-box {
    font-size: 24rpx;
    &-total {
      color: $c-gray;
    }
    &-price {
      color: $c-price;
      font-size: 40rpx;
      &::before {
        content: '￥';
        padding-right: 4rpx;
        font-size: 24rpx;
      }
    }
  }
}
</style>
