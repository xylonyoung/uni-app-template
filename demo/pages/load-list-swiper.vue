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
      v-show="showTabs"
    ></u-tabs>
    <swiper
      class="swiper"
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
          :auto-load="curIndex === tabIndex"
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
      height: 'calc(100vh - 93px)',
      showTabs: true,
      scrollTop: 0
    }
  },
  onLoad() {
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
        listApi: 'mockProducts',
        listQuery: {
          page: 1,
          limit: 10,
          '@order': 'createdTime|DESC'
        }
      }
    })
  },
  methods: {
    tabsChange(index) {
      if (index === this.currentIndex) return
      this.tabIndex = index
    },
    swiperChange(e) {
      this.tabIndex = e.detail.current
    }
  }
}
</script>
<style lang="scss">
.search {
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $c-border;
  .search-bar {
    width: 90%;
  }
}
.person {
  text-align: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}
</style>
