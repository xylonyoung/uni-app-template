<template>
  <view>
    <u-subsection
      :list="tabList"
      :current="tabIndex"
      @change="sectionChange"
    ></u-subsection>
    <swiper :style="{ height }" :current="tabIndex" @change="swiperChange">
      <swiper-item v-for="(tab, curIndex) in tabList" :key="curIndex">
        <c-load-list
          ref="loadList"
          :list.sync="tab.list"
          :list-api="tab.listApi"
          :list-query.sync="tab.listQuery"
          :auto-load="curIndex === tabIndex"
          :height="height"
          empty-mode="coupon"
        >
          <view class="coupon-wrapper">
            <view
              class="coupon"
              :class="tabIndex ? 'disable' : ''"
              v-for="(item, index) in tab.list"
              :key="index"
            >
              <view class="coupon-top">
                <view class="coupon-top-detail">
                  <view class="discount">
                    {{
                      $numberFormat(
                        $getValue(item, 'coupon.__metadata.discount')
                      )
                    }}
                  </view>
                  <view class="reduction">
                    <view>满减券</view>
                    <view>
                      满{{
                        $numberFormat(
                          $getValue(item, 'coupon.__metadata.threshold')
                        )
                      }}英镑可用
                    </view>
                  </view>
                </view>
              </view>
              <view class="coupon-bottom">
                <view>
                  {{
                    $u.timeFormat(item.expiredTime, 'yyyy/mm/dd/ MM:ss')
                  }}前可使用
                </view>
              </view>
            </view>
          </view>
        </c-load-list>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
export default {
  data() {
    return {
      tabList: [],
      tabIndex: 0,
      height: 'calc(100vh - 75rpx)'
    }
  },
  created() {
    this.setTabList()
  },
  methods: {
    setTabList() {
      const tabList = [
        {
          name: '未使用',
          filter: `entity.getIsUsed() == false && entity.getExpiredTime() > datetime.get('${new Date().toISOString()}')`
        },
        {
          name: '已使用',
          filter: 'entity.getIsUsed()'
        },
        {
          name: '已过期',
          filter: `entity.getIsUsed() == false && entity.getExpiredTime() <= datetime.get('${new Date().toISOString()}')`
        }
      ]
      this.tabList = tabList.map((e) => ({
        list: [],
        listApi: '/api/user-coupons',
        listQuery: {
          page: 1,
          limit: 5,
          '@order': 'modifiedTime|DESC',
          '@filter': e.filter
        },
        ...e
      }))
    },
    swiperChange(e) {
      this.tabIndex = e.detail.current
    },
    sectionChange(index) {
      this.tabIndex = index
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/coupon.scss';
</style>
