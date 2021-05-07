<template>
  <view class="pay-container">
    <view class="address">
      <u-cell-item value="选择地址" @click="chooseAddress">
        <u-icon slot="icon" name="map-fill" color="#ff6700" size="40"></u-icon>
        <view slot="title">
          <template v-if="address.telNumber">
            <view class="address-user">
              <text>{{ address.userName }}</text>
              <text>{{ address.telNumber }}</text>
            </view>
            <view class="address-detail">
              {{ addressDetail }}
            </view>
          </template>
          <view v-else>暂未设置收货地址</view>
        </view>
      </u-cell-item>
    </view>

    <view class="products">
      <view
        class="product-row"
        v-for="(item, index) in orderProducts"
        :key="index"
        @click="navTo(item)"
      >
        <u-image
          width="200rpx"
          height="200rpx"
          border-radius="8"
          :src="$getImage(item.cover)"
        ></u-image>
        <view class="product-row-detail">
          <view>
            <view class="product-row-detail-name">
              {{ item.name }}
            </view>
            <view class="product-row-detail-quantity">
              <view>
                {{ findDimensionName(item) }}
              </view>
              <view>x{{ item.quantity }}</view>
            </view>
          </view>
          <view class="product-row-detail-bottom">
            <view class="product-row-detail-bottom-price" style="color: #999">
              {{ $numberFormat(item.price) }}
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
          :value="`￥${amount}`"
          :arrow="false"
        ></u-cell-item>
        <u-cell-item title="运费" value="包邮" :arrow="false"></u-cell-item>
        <u-cell-item title="优惠券" value="无可用"></u-cell-item>
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
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import wechatPay from '@/utils/wechat-pay'
export default {
  data() {
    return {
      address: null,
      comment: null
    }
  },
  computed: {
    ...mapGetters(['orderProducts', 'user']),
    amount() {
      const totalPrice = this.orderProducts.reduce((acc, cur) => {
        const item = this.findDimension(cur)
        return acc + item?.__metadata?.price * cur.quantity
      }, 0)
      return this.$numberFormat(totalPrice)
    },
    addressDetail() {
      if (!this.address) return ''
      return (
        this.address.provinceName +
        this.address.cityName +
        this.address.countyName +
        this.address.detailInfo
      )
    },
    items() {
      return this.orderProducts.map((e) => ({
        quantity: e.quantity,
        specification: e.specificationId
      }))
    }
  },
  onLoad() {
    this.address = uni.getStorageSync('address')
  },
  methods: {
    createOrder() {
      const data = {
        phone: this.member.phone,
        items: this.items,
        source: 'onLine'
      }
      if (!this.addressDetail) {
        uni.showToast({
          title: '请选择地址',
          icon: 'none'
        })
        return
      }
      data.address = this.addressDetail

      if (this.comment) data.comment = this.comment

      if (this.paidBalance && this.userBalance) {
        const balance = Number(this.userBalance.amount)
        data.paidBalance =
          this.actualPrice > balance ? balance : this.actualPrice
      }

      this.$api.post(`/api/orders`, data).then((res) => {
        const id = res.data.invoice.id
        if (id) {
          wechatPay(id).then(() => {
            this.$store.dispatch('store/setCart', [])
            uni.navigateBack({
              delta: 2
            })
          })
        }
      })
    },
    findDimension(item) {
      return item.specifications.find((e) => e.id === item.dimensionId) ?? {}
    },
    findDimensionName(item) {
      return this.findDimension(item)?.__metadata?.name
    },
    chooseAddress() {
      uni.chooseAddress({
        success: (res) => {
          uni.setStorageSync('address', res)
          this.address = res
        }
      })
    }
  }
}
</script>

<style lang="scss">
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
        font-size: 24rpx;
      }
    }
  }
}
</style>
