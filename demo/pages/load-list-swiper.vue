<template>
  <view>
    <c-load-list-swiper
      ref="swiper"
      v-slot="{ list }"
      :tabs.sync="tabs"
      :tabIndex.sync="tabIndex"
    >
      <view v-for="(item, index) in list" :key="index" class="header">
        <u-avatar :src="item.avatar"></u-avatar>
        <view>{{ item.name }}</view>
        <view>{{ index }}</view>
      </view>
    </c-load-list-swiper>
  </view>
</template>
<script>
export default {
  data() {
    return {
      tabs: [],
      tabIndex: 0
    }
  },
  onPullDownRefresh() {
    this.$refs.swiper.onRefresh()
  },
  onLoad() {
    const tabs = [
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
    this.tabs = tabs.map(e => {
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
  }
}
</script>
<style lang="scss">
.header {
  text-align: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}
</style>
