<template>
  <view class="order-container">
    <u-tabs
      ref="uTabs"
      :list="tabList"
      :current="tabIndex"
      :is-scroll="false"
      @change="tabsChange"
    ></u-tabs>
    <swiper :style="{ height }" :current="tabIndex" @change="swiperChange">
      <swiper-item v-for="(tab, curIndex) in tabList" :key="curIndex">
        <c-load-list
          ref="loadList"
          :list.sync="tab.list"
          :list-api="tab.listApi"
          :list-query.sync="tab.listQuery"
          :auto="curIndex === tabIndex"
          :height="height"
        >
          <view
            class="products"
            v-for="(order, orderIndex) in tab.list"
            :key="orderIndex"
          >
            <view class="order-top">
              <text>{{ storeInfo.name }}</text>
              <text>
                {{ getOrderStatus(order.status) }}
              </text>
            </view>
            <view
              class="description"
              v-for="(item, index) in order.items"
              :key="index"
              @click="navTo(item)"
            >
              <u-image
                width="200rpx"
                height="200rpx"
                :src="
                  $getImage(
                    $getValue(
                      item,
                      '__metadata.specification.__metadata.product.__metadata.cover'
                    )
                  )
                "
              ></u-image>
              <view class="right">
                <view>
                  <view class="name">
                    {{
                      $getValue(
                        item,
                        '__metadata.specification.__metadata.product.__metadata.name'
                      )
                    }}
                  </view>
                  <view class="quantity">
                    <view>
                      {{
                        $getValue(
                          item,
                          '__metadata.specification.__metadata.name'
                        )
                      }}
                    </view>
                    <view>x{{ item.__metadata.quantity }}</view>
                  </view>
                </view>
                <view class="bottom">
                  <view class="price" style="color: #999">
                    <text>￥</text>
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
              <view class="date">
                {{ order.createdTime | timeFrom('yyyy-mm-dd hh:MM') }}
              </view>
              <view>
                <text>共{{ order.items.length }}件商品 实付金额：</text>
                <text class="price">
                  <text>￥</text>
                  <text>{{ $numberFormat(order.price) }}</text>
                </text>
              </view>
            </view>

            <view class="bottom-btn" v-if="order.status === '1'">
              <u-button
                type="info"
                size="mini"
                plain
                @click="toCancel(order.id, orderIndex)"
              >
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
            <!--   TODO
            <view class="bottom-btn" v-if="order.status > 3">
              <u-button type="info" size="mini" plain>申请售后</u-button>
            </view> -->
          </view>
        </c-load-list>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
import { mapGetters } from 'vuex'
import wechatPay from '@/utils/wechat-pay'
export default {
  data() {
    return {
      tabList: [],
      tabIndex: 0,
      showTabs: true,
      scrollTop: 0,
      height: 'calc(100vh - 80rpx)',
    }
  },
  computed: {
    ...mapGetters(['storeInfo', 'orderStatus']),
  },
  onLoad(option) {
    this.setTabList()
    this.findTabIndex(option.status)
  },
  // onPullDownRefresh() {
  //   this.$refs.loadList[this.tabIndex].loadData('refresh')
  // },
  methods: {
    setTabList() {
      const tabList = [
        {
          name: '全部',
        },
        {
          name: '待支付',
          status: '1',
        },
        {
          name: '待发货',
          status: '2',
        },
        {
          name: '待收货',
          status: '3',
        },
        {
          name: '待评价',
          status: '4',
        },
      ]
      this.tabList = tabList.map((e) => ({
        list: [],
        listApi: 'mockOrders',
        listQuery: {
          page: 1,
          limit: 5,
          '@order': 'modifiedTime|DESC',
          '@filter': e.status
            ? `entity.getStatus() == ${e.status}`
            : 'entity.getStatus() > 0',
        },
        ...e,
      }))
    },
    toCancel(id, orderIndex) {
      this.$api
        .post(`/api/orders/${id}/cancel-and-refund`, { gateway: 'balance' })
        .then(() => {
          this.tabList[this.tabIndex].list.splice(orderIndex, 1)
          uni.showToast({
            title: '订单取消成功~',
          })
        })
    },
    toPay(id) {
      wechatPay(id)
    },
    findTabIndex(status) {
      const result = this.tabList.findIndex((e) => e.status === status)
      this.tabIndex = result !== -1 ? result : 0
    },
    getOrderStatus(status) {
      const result = this.orderStatus.find((e) => e.value === status)
      return result ? result.label : '未知状态'
    },
    tabsChange(index) {
      if (index === this.currentIndex) return
      this.tabIndex = index
    },
    swiperChange(e) {
      this.tabIndex = e.detail.current
    },
    navTo(item) {
      const id = this.$getValue(
        item,
        '__metadata.specification.__metadata.product.id'
      )
      uni.navigateTo({
        url: `/pages/product/product?id=${id}`,
      })
    },
  },
}
</script>
<style lang="scss">
.products {
  margin-bottom: 30rpx;
}
.order-top,
.order-bottom {
  padding: 0 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.order-top {
  margin-bottom: 20rpx;
  padding-bottom: 10rpx;
  border-bottom: 1px solid $c-border;
}
.order-bottom {
  margin-top: 20rpx;
  padding-top: 10rpx;
  border-top: 1px solid $c-border;
  .date {
    color: $c-gray;
    font-size: 24rpx;
  }
  .price {
    color: $c-price;
    font-size: 24rpx;
    text:last-child {
      font-size: 40rpx;
      font-weight: bold;
    }
  }
}
.order-comment {
  padding-top: 20rpx;
  text {
    color: $c-gray;
  }
}
.bottom-btn {
  margin-top: 20rpx;
  display: flex;
  justify-content: flex-end;
  u-button + u-button {
    margin-left: 20rpx;
  }
}
</style>
