<template>
  <view class="pay-container">
    <view class="shipping">
      <text class="type">配送方式</text>
      <u-radio-group v-model="shippingType">
        <u-radio shape="circle" name="self">自提</u-radio>
        <u-radio shape="circle" name="express">快递</u-radio>
      </u-radio-group>
    </view>

    <view class="address" v-if="shippingType === 'express'">
      <u-cell-group>
        <u-cell-item value="选择地址" @click="chooseAddress">
          <u-icon
            slot="icon"
            name="map-fill"
            color="#ff6700"
            size="40"
          ></u-icon>
          <view slot="title">
            <template v-if="address.telNumber">
              <view class="user-name">
                <text>{{ address.userName }}</text>
                <text>{{ address.telNumber }}</text>
              </view>
              <view class="detail-info">
                {{ addressDetail }}
              </view>
            </template>
            <view v-else>暂未设置收货地址</view>
          </view>
        </u-cell-item>
      </u-cell-group>
    </view>

    <view class="products">
      <view
        class="product-row"
        v-for="(item, index) in order.items"
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
                {{ item.dimension.name }}
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

    <view class="order-detail">
      <u-cell-group>
        <u-cell-item :arrow="false">
          <view slot="title">
            <text style="margin-right: 40rpx">余额支付</text>
            <u-checkbox v-model="paidBalance" shape="circle">
              <text>可用余额：</text>
              <text style="color: #fa3534">
                {{
                  $numberFormat(
                    $getValue(this.member, 'user.__metadata.balance.amount')
                  )
                }}
              </text>
            </u-checkbox>
          </view>
        </u-cell-item>
        <u-cell-item
          :title="member.level.__toString"
          :value="
            $numberFormat(
              $getValue(member, 'level.__metadata.defaultDiscount') * 10
            ) + '折优惠'
          "
          :arrow="false"
        ></u-cell-item>
        <u-cell-item
          title="商品总价"
          :value="`￥${$numberFormat(actualPrice)}`"
          :arrow="false"
        ></u-cell-item>
        <u-cell-item title="运费" value="包邮" :arrow="false"></u-cell-item>
        <u-cell-item title="优惠券" value="无可用"></u-cell-item>
      </u-cell-group>
    </view>

    <view class="bottom-bar">
      <view class="right">
        <view class="price-box">
          <view>
            <text class="total">共{{ orderProducts.length }}件，</text>
            合计:
            <text class="price">
              ￥
              <text>{{ $numberFormat(actualPrice) }}</text>
            </text>
          </view>
        </view>
        <u-button type="error" @click="createOrder">支付</u-button>
      </view>
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
      shippingType: 'self',
      comment: null,
      actualPrice: null,
      paidBalance: true,
      userBalance: null,
    }
  },
  computed: {
    ...mapGetters(['orderProducts', 'storeInfo', 'member']),
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
        specification: e.specificationId,
      }))
    },
  },
  onLoad() {
    this.address = uni.getStorageSync('address')
    this.getCalculatePricesAndBalance()
  },
  methods: {
    getCalculatePricesAndBalance() {
      const data = {
        member: this.member.id,
        store: this.storeInfo.id,
        items: this.items,
      }
      this.$api.post('/api/orders/calculate-prices', data).then((res) => {
        this.actualPrice = res.data.actualPrice
      })
      this.$api.get('/api/balances').then((res) => {
        this.userBalance = res.data
      })
    },
    createOrder() {
      const data = {
        phone: this.member.phone,
        shippingType: this.shippingType,
        store: this.storeInfo.id,
        items: this.items,
        source: 'onLine',
      }
      if (this.shippingType === 'express') {
        if (!this.addressDetail) {
          uni.showToast({
            title: '请选择地址',
            icon: 'none',
          })
          return
        }
        data.address = this.addressDetail
      }

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
              delta: 2,
            })
          })
        }
      })
    },
    findSpecification(item) {
      return (
        item.specifications.find((e) => e.id === item.specificationId) ?? {}
      )
    },
    chooseAddress() {
      uni.chooseAddress({
        success: (res) => {
          uni.setStorageSync('address', res)
          this.address = res
        },
      })
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/product.scss';

.pay-container {
  padding-bottom: 122rpx;
}
.shipping {
  padding: 20rpx;
  display: flex;
  align-items: center;
  background-color: #fff;
  .type {
    margin-right: 40rpx;
  }
}
.address {
  margin-bottom: 30rpx;
  background-color: #fff;
  border-image: url('@/static/pay-stripe.png') 0 0 10 0 / 10rpx repeat;
  border-style: solid;
  .user-name {
    text:last-child {
      margin-left: 10rpx;
      color: $c-gray;
      font-size: 24rpx;
    }
  }
  .detail-info {
    font-size: 24rpx;
  }
}
.order-detail {
  margin: 30rpx 0;
}
.bottom-bar {
  justify-content: flex-end;
}
</style>
