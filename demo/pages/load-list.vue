<template>
  <c-load-list
    ref="loadList"
    v-model="list"
    :api="listApi"
    :query.sync="listQuery"
  >
    <view v-for="(item, index) in list" :key="index" class="person">
      <u-avatar :src="item.cover"></u-avatar>
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
      listApi: 'mock/products',
      listQuery: {
        page: 1,
        limit: 10,
        '@order': 'createdTime|DESC'
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
