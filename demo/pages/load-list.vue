<template>
  <c-load-list
    ref="loadList"
    :list.sync="list"
    :list-api="listApi"
    :list-query.sync="listQuery"
  >
    <view v-for="(item, index) in list" :key="index" class="person">
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
      list: [],
      listApi: 'list',
      listQuery: {
        page: 1,
        limit: 10,
        '@order': 'createdTime | desc'
      }
    }
  }
}
</script>
<style lang="scss">
.person {
  text-align: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}
</style>
