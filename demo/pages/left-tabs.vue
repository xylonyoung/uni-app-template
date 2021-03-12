<template>
  <view>
    <view style="padding: 20rpx">
      <u-search placeholder="课程" shape="square" v-model="keyword"></u-search>
    </view>

    <c-left-tabs
      ref="leftTabs"
      :tab-list="tabList"
      :tab-index.sync="tabIndex"
      :height="height"
    >
      <view v-for="(tab, curIndex) in tabList" :key="curIndex">
        <c-load-list
          ref="loadList"
          :list.sync="tab.list"
          :list-api="tab.listApi"
          :list-query.sync="tab.listQuery"
          :auto="curIndex === tabIndex"
          :height="height"
          v-show="curIndex === tabIndex"
        >
          <view v-for="(item, index) in tab.list" :key="index" class="person">
            <u-avatar :src="item.avatar"></u-avatar>
            <view>{{ item.name }}</view>
            <view>{{ index }}</view>
          </view>
        </c-load-list>
      </view>
    </c-left-tabs>
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
    console.log(this.heightFix)
  },
  methods: {
    calcHeight() {
      this.height = `${uni.getSystemInfoSync().windowHeight - 52}px`
      // below is use custom navigationBar
      // const { screenHeight, safeArea } = uni.getSystemInfoSync()
      // this.heightFix = screenHeight - safeArea.top - navigationBarHeight
    }
  }
}
</script>
<style lang='scss' scoped>
.person {
  text-align: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}
</style>