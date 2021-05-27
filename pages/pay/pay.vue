<template>
  <view class="pay-container">
    <view class="address">
      <u-cell-item value="选择地址" @click="chooseAddress">
        <u-icon slot="icon" name="map-fill" color="#ff6700" size="40"></u-icon>
        <view slot="title">
          <template v-if="address.phone">
            <view class="address-user">
              <text>{{ address.name }}</text>
              <text>{{ address.phone }}</text>
            </view>
            <view class="address-detail">
              {{ addressDetail }}
            </view>
          </template>
          <!-- <template v-if="address.telNumber">
            <view class="address-user">
              <text>{{ address.userName }}</text>
              <text>{{ address.telNumber }}</text>
            </view>
            <view class="address-detail">
              {{ addressDetail }}
            </view>
          </template> -->
          <view v-else>暂未设置收货地址</view>
        </view>
      </u-cell-item>
    </view>

    <view class="products">
      <view
        class="product-row"
        v-for="(item, index) in orderProducts"
        :key="index"
        @click="navTo(item.id)"
      >
        <u-image
          width="200rpx"
          height="200rpx"
          border-radius="8"
          mode="aspectFit"
          :src="item.cover"
        ></u-image>
        <view class="product-row-detail">
          <view>
            <view class="product-row-detail-name">
              {{ item.name }}
            </view>
            <view class="product-row-detail-quantity">
              <view>
                {{ dimensionName(item) }}
              </view>
              <view>x{{ item.quantity }}</view>
            </view>
          </view>
          <view class="product-row-detail-bottom">
            <view class="product-row-detail-bottom-price" style="color: #999">
              {{ dimensionPrice(item) }}
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
          :value="`￥ ${amount}`"
          :arrow="false"
        ></u-cell-item>
        <u-cell-item title="运费" value="包邮" :arrow="false"></u-cell-item>
        <!-- <u-cell-item
          title="优惠券"
          :value="aCoupon"
          @click="showCoupon = true"
        ></u-cell-item> -->
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
      <u-button type="error" @click="createOrder">支付</u-button>
    </view>

    <!-- <u-popup v-model="showCoupon" mode="bottom" closeable>
      <scroll-view scroll-y style="height: 70vh">
        <c-coupon @change="couponChange" v-model="couponList" />
      </scroll-view>
    </u-popup> -->

    <c-address
      v-model="showAddress"
      :regions="regionList"
      @confirm="addressConfirm"
    />
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import wechatPay from '@/utils/wechat-pay'
import dimension from '@/mixins/dimension'
export default {
  mixins: [dimension],
  data() {
    return {
      address: null,
      regionList: [],
      showAddress: false,
      comment: null,
      coupon: null,
      couponList: [],
      showCoupon: false
    }
  },
  computed: {
    ...mapGetters(['orderProducts', 'user']),
    amount() {
      const totalPrice = this.orderProducts.reduce((acc, cur) => {
        if (cur.specialPrice) {
          return acc + cur.specialPrice.price * cur.quantity
        } else {
          const item = this.findDimension(cur)
          return acc + item?.price * cur.quantity
        }
      }, 0)
      return this.$numberFormat(totalPrice)
    },
    addressDetail() {
        if (!this.address?.region) return ''
      const result = this.address.region.reduce((acc, cur) => {
        return acc + ' ' + cur.label
      }, '')
      return result + ' ' + this.address.detailInfo
      // return (
      //   this.address.provinceName +
      //   this.address.cityName +
      //   this.address.countyName +
      //   this.address.detailInfo
      // )
    },
    items() {
      return this.orderProducts.map((e) => ({
        quantity: e.quantity,
        specificationId: e.dimensionId,
        shippingAddress: this.addressDetail,
        shippingPhone: this.address.telNumber
      }))
    }
    // aCoupon() {
    //   let result
    //   if (this.coupon) {
    //     result = this.couponList.find((e) => e.id === this.coupon)
    //     return this.$getValue(result, 'coupon.__metadata.name')
    //   }
    //   result = this.couponList.length
    //   return result === 0 ? '无可用' : result + '张'
    // }
  },
  onLoad() {
    this.address = uni.getStorageSync('address') || {}
    this.getRegion()
  },
  methods: {
    getRegion() {
      this.$api.get('/api/regions').then((res) => {
        this.regionList = res.data
      })
    },
    navTo(id) {
      uni.navigateTo({
        url: `/pages/product/product?id=${id}`
      })
    },
    productPrice(item) {
      const { specialPrice } = item
      const result = specialPrice
        ? specialPrice.price
        : this.findDimension(item).price
      return this.$numberFormat(result)
    },
    couponChange(id) {
      this.coupon = id
      this.showCoupon = false
    },
    createOrder() {
      const data = {
        items: this.items
      }
      if (!this.addressDetail) {
        uni.showToast({
          title: '请选择地址',
          icon: 'none'
        })
        return
      }

      // if (this.coupon) data.userCoupon = this.coupon
      if (this.comment) data.comment = this.comment

      this.$api.post(`/api/orders`, data).then((res) => {
        const id = res.data.invoice.id
        if (id) {
          wechatPay(id).then(() => {
            this.$store.dispatch('common/setCart', [])
            uni.navigateBack({
              delta: 2
            })
          })
        }
      })
    },
    chooseAddress() {
      this.showAddress = true
      // uni.chooseAddress({
      //   success: (res) => {
      //     uni.setStorageSync('address', res)
      //     this.address = res
      //   }
      // })
    },
    addressConfirm(obj) {
      this.address = { ...obj }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/product.scss';
.pay-container {
  padding-bottom: 122rpx;
}
.address {
  margin-bottom: 32rpx;
  background-color: #fff;
  border-image: url('@/static/pay-stripe.png') 0 0 12 0 / 12rpx repeat;
  border-style: solid;
  &-user {
    margin-left: 12rpx;
    text:last-child {
      margin-left: 12rpx;
      color: $c-gray;
      font-size: 24rpx;
    }
  }
  &-detail {
    margin-left: 12rpx;
    font-size: 24rpx;
  }
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
