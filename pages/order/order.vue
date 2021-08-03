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
          :v-model="tab.list"
          :api="tab.listApi"
          :query.sync="tab.listQuery"
          :load="curIndex === tabIndex"
          :height="height"
        >
          <view
            class="order"
            v-for="(order, orderIndex) in tab.list"
            :key="orderIndex"
            @click="navTo(order.id)"
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
          </view>
        </c-load-list>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
import orderMixin from '@/mixins/order'
export default {
  mixins: [orderMixin],
  data() {
    return {
      tabList: [],
      tabIndex: 0,
      showTabs: true,
      scrollTop: 0,
      height: 'calc(100vh - 80rpx)'
    }
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
    findTabIndex(status) {
      const result = this.tabList.findIndex((e) => e.status === status)
      this.tabIndex = result !== -1 ? result : 0
    },

    tabsChange(index) {
      if (index === this.currentIndex) return
      this.tabIndex = index
    },
    swiperChange(e) {
      this.tabIndex = e.detail.current
    },
    navTo(id) {
      uni.navigateTo({
        url: `/pages/order/detail?id=${id}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/product';
@import '@/styles/order';
.order-container {
  background-color: $c-background;
}
</style>
