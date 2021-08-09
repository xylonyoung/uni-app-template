<template>
  <view class="order-detail-container">
    <c-address v-model="order" disabled />

    <view class="order">
      <view class="order-top">
        <view>
          {{ getOrderStatus(order.status) }}
        </view>
        <view v-if="order.status > 2" class="order-top-shipping">
          <view>物流公司：{{ order.shippingCompany }}</view>
          <view>物流单号：{{ order.shippingNo }}</view>
        </view>
      </view>
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
          :src="
            $getImage(
              $getValue(
                item,
                '__metadata.specification.__metadata.product.__metadata.cover'
              )
            )
          "
        ></u-image>
        <view class="product-row-detail">
          <view>
            <view class="product-row-detail-name">
              {{
                $getValue(
                  item,
                  '__metadata.specification.__metadata.product.__metadata.name'
                )
              }}
            </view>
            <view class="product-row-detail-quantity">
              <view>
                {{
                  $getValue(item, '__metadata.specification.__metadata.name')
                }}
              </view>
              <view>x{{ $getValue(item, '__metadata.quantity') }}</view>
            </view>
          </view>
          <view class="product-row-detail-bottom">
            <view class="product-row-detail-bottom-price" style="color: #999">
              {{ $numberFormat($getValue(item, '__metadata.price')) }}
            </view>
          </view>
        </view>
      </view>

      <view class="order-comment">
        备注：
        <text>{{ order.comment ? order.comment : '' }}</text>
      </view>

      <view class="order-bottom">
        <view class="order-bottom-date">
          {{ order.createdTime | date('yyyy-mm-dd hh:MM') }}
        </view>
        <view>
          <text>共{{ order.items.length }}件商品 实付金额：</text>
          <text class="order-bottom-price">
            <text>{{ $numberFormat(order.price) }}</text>
          </text>
        </view>
      </view>

      <view class="bottom-btn" v-if="order.status === '1'">
        <u-button type="info" size="mini" plain @click="toCancel(order.id)">
          取消订单
        </u-button>
        <u-button
          type="error"
          size="mini"
          plain
          @click="toPay(order.invoice.id)"
        >
          立即付款
        </u-button>
      </view>
      <view class="bottom-btn" v-else-if="order.status === '3'">
        <u-button type="success" size="mini" @click="confirmDelivery(order.id)">
          确定收货
        </u-button>
      </view>
      <!--   TODO
            <view class="bottom-btn" v-if="order.status > 3">
              <u-button type="info" size="mini" plain>申请售后</u-button>
            </view> -->
    </view>
  </view>
</template>
<script>
import wechatPay from '@/utils/wechat-pay'
import orderMixin from '@/mixins/order'
export default {
  mixins: [orderMixin],
  data() {
    return {
      address: {},
      order: {}
    }
  },
  onLoad(option) {
    this.getOrder(option.id)
  },
  methods: {
    toPay(id) {
      wechatPay(id).then(() => {
        this.getOrder(id)
      })
    },
    confirmDelivery(id) {
      this.$request.put(`/api/orders/${id}/confirm`).then(() => {
        uni.showToast({
          title: '已确定收货'
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          })
        }, 999)
      })
    },
    toCancel(id) {
      // this.$request
      //   .post(`/api/orders/${id}/cancel-and-refund`, { gateway: 'balance' })
      //   .then(() => {
      //     uni.showToast({
      //       title: '订单取消成功~'
      //     })
      //   })
      this.$request.put(`/api/orders/${id}/cancel`).then(() => {
        uni.showToast({
          title: '订单取消成功~'
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          })
        }, 999)
      })
    },
    getOrder(id) {
      this.$request.get('/api/orders/' + id).then((res) => {
        this.order = res.data
      })
    },
    navTo(item) {
      uni.navigateTo({
        url: `/pages/product/product?id=${item?.__metadata?.specification?.__metadata?.product?.id}`
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/product';
@import '@/styles/order';
.order-detail-container {
  background-color: $c-background;
  min-height: 100vh;
}
</style>