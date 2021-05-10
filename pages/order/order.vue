<template>
  <view class="order-container">
    <u-tabs
      ref="uTabs"
      active-color="#ff6900"
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
            class="order"
            v-for="(order, orderIndex) in tab.list"
            :key="orderIndex"
          >
            <view class="order-top">
              <text>
                {{ getOrderStatus(order.status) }}
              </text>
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
                        $getValue(
                          item,
                          '__metadata.specification.__metadata.name'
                        )
                      }}
                    </view>
                    <view>x{{ $getValue(item, '__metadata.quantity') }}</view>
                  </view>
                </view>
                <view class="product-row-detail-bottom">
                  <view
                    class="product-row-detail-bottom-price"
                    style="color: #999"
                  >
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
      height: 'calc(100vh - 80rpx)'
    }
  },
  computed: {
    ...mapGetters(['orderStatus'])
  },
  onLoad(option) {
    this.setTabList()
    this.findTabIndex(option.status)
  },
  methods: {
    setTabList() {
      const tabList = [
        {
          name: '全部'
        },
        {
          name: '待支付',
          status: '1'
        },
        {
          name: '待发货',
          status: '2'
        },
        {
          name: '待收货',
          status: '3'
        },
        {
          name: '待评价',
          status: '4'
        }
      ]
      this.tabList = tabList.map((e) => ({
        list: [],
        listApi: '/api/orders',
        listQuery: {
          page: 1,
          limit: 5,
          '@order': 'modifiedTime|DESC',
          '@filter': e.status
            ? `entity.getStatus() == ${e.status}`
            : 'entity.getStatus() > 0'
        },
        ...e
      }))
    },
    toCancel(id, orderIndex) {
      this.$api
        .post(`/api/orders/${id}/cancel-and-refund`, { gateway: 'balance' })
        .then(() => {
          this.tabList[this.tabIndex].list.splice(orderIndex, 1)
          uni.showToast({
            title: '订单取消成功~'
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
      const id = item.id
      uni.navigateTo({
        url: `/pages/product/product?id=${id}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/product';
.order-container {
  background-color: $c-background;
}

.order {
  margin-bottom: 24rpx;
  padding: 24rpx 0;
  background-color: #fff;
  &-top,
  &-bottom {
    padding: 0 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  &-top {
    margin-bottom: 24rpx;
    padding-bottom: 12rpx;
    border-bottom: 1px solid $c-border;
  }
  &-bottom {
    margin-top: 24rpx;
    padding-top: 12rpx;
    font-size: 24rpx;
    border-top: 1px solid $c-border;
    &-date {
      color: $c-gray;
    }
    &-price {
      color: $c-price;
      text:last-child {
        font-size: 40rpx;
        font-weight: bold;
      }
    }
  }
  &-comment {
    padding: 24rpx;
    text {
      color: $c-gray;
    }
  }
}

.product-row {
  padding: 0 24rpx;
}

.product-row + .product-row {
  margin-top: 24rpx;
}

.bottom-btn {
  margin: 24rpx 24rpx 0 0;
  display: flex;
  justify-content: flex-end;
  u-button + u-button {
    margin-left: 20rpx;
  }
}
</style>
