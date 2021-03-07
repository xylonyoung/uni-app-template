<template>
  <c-load-list
    :list-api="listApi"
    v-slot="{ list }"
    :list-query.sync="listQuery"
    ref="loadList"
  >
    <view v-for="(item, index) in list" :key="index" class="header">
      <u-avatar :src="item.avatar"></u-avatar>
      <view>{{ item.name }}</view>
      <view>{{ index }}</view>
    </view>
  </c-load-list>
</template>
<script>
export default {
  data() {
    return {
      listApi: 'list',
      listQuery: {
        page: 1,
        limit: 10,
        '@order': 'createdTime | desc'
      }
    }
  },
  onPullDownRefresh() {
    this.$refs.loadList.loadData('refresh')
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
