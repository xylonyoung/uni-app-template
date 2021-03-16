<template>
  <view>
    <view class="search">
      <u-icon name="list-dot" size="50"></u-icon>
      <view class="search-bar">
        <u-search placeholder="请输入搜索的商品" v-model="keyword"></u-search>
      </view>
    </view>
    <u-tabs
      class="tabs"
      ref="uTabs"
      :list="tabList"
      :current="tabIndex"
      :is-scroll="false"
      @change="tabsChange"
      duration="0.1"
      v-show="showTabs"
    ></u-tabs>
    <swiper
      class="swiper"
      :style="'height:' + height"
      :current="tabIndex"
      @change="swiperChange"
    >
      <swiper-item v-for="(tab, curIndex) in tabList" :key="curIndex">
        <c-load-list
          ref="loadList"
          :list.sync="tab.list"
          :list-api="tab.listApi"
          :list-query.sync="tab.listQuery"
          @scroll="scroll"
          :auto="curIndex === tabIndex"
          :v-show="curIndex === tabIndex"
          :padding-top="paddingTop"
          :height="height"
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
    return {
      tabList: [],
      tabIndex: 0,
      height: '',
      showTabs: true,
      scrollTop: 0,
      paddingTop: '80rpx'
    }
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
      },
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
    scroll(e) {
      this.showTabs = e.detail.scrollTop - this.scrollTop < 0
      if (this.showTabs) {
        this.paddingTop = '80rpx'
      } else {
        this.paddingTop = '0rpx'
      }
      this.scrollTop = e.detail.scrollTop
    },

    tabsChange(index) {
      if (index === this.currentIndex) return
      this.tabIndex = index
    },
    swiperChange(e) {
      this.tabIndex = e.detail.current
    },
    calcHeight() {
      this.height = `${uni.getSystemInfoSync().windowHeight - 53}px`
    }
  }
}
</script>
<style lang="scss">
.search {
  position: sticky;
  width: 100%;
  top: var(--window-top);
  z-index: 999;
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $t-border-color;
  .search-bar {
    width: 90%;
  }
}
.tabs {
  position: fixed;
  width: 100%;
  top: calc(--window-top + 53px);
  z-index: 999;
}
.person {
  text-align: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}
</style>
