<template>
  <view>
    <!-- slot page -->
    <slot :list="list"></slot>
    <!-- data is empty -->
    <u-empty v-if="showEmpty"></u-empty>
    <!-- load more data -->
    <u-loadmore v-else :status="status" margin-top="20" />
    <!-- back to top -->
    <u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
// pages.json "style" need to setup "enablePullDownRefresh": true
export default {
  props: {
    listApi: { type: String, default: '' },
    listQuery: {
      type: Object,
      default: () => ({ page: 1, limit: 10 })
    }
  },
  data() {
    return {
      scrollTop: 0,
      status: 'loading',
      showEmpty: false,
      list: []
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData(type) {
      let currentPage,
        endPage,
        list,
        listQuery = this.listQuery

      if (type === 'refresh') {
        listQuery.page = 1
        this.showEmpty = false
        this.status = 'loading'
      }

      if (this.status === 'nomore') {
        return
      } else {
        this.status = 'loading'
      }

      let res = await this.$api.get(this.listApi, listQuery)
      list = res.data
      const { paginator } = res
      if (paginator) {
        listQuery.page = paginator.next
        currentPage = paginator.current
        endPage = paginator.endPage
      } else {
        this.showEmpty = true
      }
      //have next page or not?
      this.status =
        endPage - currentPage === 0 || list.length === 0 ? 'nomore' : 'loadmore'
      //update data & interaction
      this.list = type === 'refresh' ? list : this.list.concat(list)
      this.$emit('update:listQuery', listQuery)
      uni.stopPullDownRefresh()
    }
  }
}
</script>

<style lang="scss"></style>
