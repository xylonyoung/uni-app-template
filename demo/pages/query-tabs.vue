<template>
  <view>
    <c-query-tabs :list="tabList" :current="tabIndex" @change="queryChange" />
    <c-load-list
      ref="loadList"
      :list.sync="list"
      :list-api="listApi"
      :list-query.sync="listQuery"
      :reload.sync="reloadList"
      :height="height"
    >
      <view v-for="(item, index) in list" :key="index" class="person">
        <u-avatar :src="item.avatar"></u-avatar>
        <view>{{ item.name }}</view>
        <view>{{ index }}</view>
      </view>
    </c-load-list>
  </view>
</template>
<script>
export default {
  data() {
    return {
      tabList: [
        {
          name: '综合',
        },
        {
          name: '销量',
          query: { '@order': 'sales|DESC' },
        },
        {
          name: '新品',
          query: { '@order': 'createdTime|DESC' },
        },
        {
          name: '价格',
          order: 'price',
        },
      ],
      tabIndex: 0,
      list: [],
      listApi: 'mockProducts',
      listQuery: {
        page: 1,
        limit: 10,
        '@order': 'createdTime|DESC',
      },
      reloadList: false,
      height:'calc(100vh - 80rpx)'
    }
  },
  methods: {
    queryChange(e) {
      if (this.reloadList) this.reloadList = false
      this.listQuery = { ...this.defaultQuery, ...e }
      if (this.searchData) {
        this.listQuery[
          '@filter'
        ] = `entity.getName() matches '/${this.searchData}/'`
      }
      this.$u.debounce(() => {
        this.reloadList = true
      }, 333)
    },
  },
}
</script>
<style lang="scss">
.person {
  text-align: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}
</style>
