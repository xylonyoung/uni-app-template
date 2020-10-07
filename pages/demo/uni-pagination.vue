<template>
  <view>
    <view
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20rpx;
      "
    >
      <uni-pagination
        v-show="listQuery.totalCount > 0"
        :total="listQuery.totalCount"
        :pageSize="listQuery.numItemsPerPage"
        :current="listQuery.current"
        @change="loadData"
      ></uni-pagination>
    </view>
  </view>
</template>

<script>
import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
export default {
  components: { uniPagination },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 5,
        current: null,
        totalCount: 0,
        numItemsPerPage: null,
        '@order': 'modifiedTime|desc',
      },
    }
  },
  onShow() {
    this.loadData()
  },
  methods: {
    async loadData(e) {
      let listQuery = this.listQuery
      if (e) {
        listQuery.page = e.current
      }
      console.log(this.$api)
      //load data
      await this.$api.pagination.get(listQuery).then(res => {
        console.log(res)
        const { data } = res
        const { paginator } = res
        if (data) {
          this.list = data
        }
        if (paginator) {
          listQuery.current = paginator.current
          listQuery.totalCount = paginator.totalCount
          listQuery.numItemsPerPage = paginator.numItemsPerPage
        } else {
          this.showEmpty = true
        }
      })
      this.listQuery = listQuery
    },
  },
}
</script>
