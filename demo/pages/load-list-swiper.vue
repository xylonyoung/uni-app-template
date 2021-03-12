<template>
  <view>
    <u-tabs
      class="tab-top"
      ref="uTabs"
      :list="tabList"
      :current="tabIndex"
      @change="tabsChange"
    ></u-tabs>
    <swiper
      :style="{ height: height }"
      :current="tabIndex"
      @change="swiperChange"
    >
      <swiper-item v-for="(tab, curIndex) in tabList" :key="curIndex">
        <c-load-list
          ref="loadList"
          :list.sync="tab.list"
          :list-api="tab.listApi"
          :list-query.sync="tab.listQuery"
          padding-top="80"
          :auto="curIndex === tabIndex"
        >
          <view v-for="(item, index) in tab.list" :key="index" class="person">
            <u-avatar :src="item.avatar"></u-avatar>
            <view>{{ item.name }}</view>
            <view>{{ index }}</view>
          </view>
        </c-load-list>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
export default {
  data() {
    return { tabList: [], tabIndex: 0, height: '' }
  },
  onLoad() {
    this.calcHeight()
    const tabList = [
      {
        name: '全部'
      },
      {
        name: '好人'
      },
      {
        name: '坏人'
      },
      {
        name: '不是人'
      }
    ]
    this.tabList = tabList.map(e => {
      return {
        name: e.name,
        list: [],
        listApi: 'list',
        listQuery: {
          page: 1,
          limit: 10,
          '@order': 'createdTime | desc'
        }
      }
    })
  },
  onPullDownRefresh() {
    this.$refs.loadList[this.tabIndex].loadData('refresh')
  },
  methods: {
    tabsChange(index) {
      if (index === this.currentIndex) return
      this.tabIndex = index
    },
    swiperChange(e) {
      this.tabIndex = e.detail.current
    },
    calcHeight() {
      this.height = `${uni.getSystemInfoSync().windowHeight}px`
    }
  }
}
</script>
<style lang="scss">
.tab-top {
  position: fixed;
  width: 100%;
  top: var(--window-top);
  z-index: 999;
}
.person {
  text-align: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}
</style>
