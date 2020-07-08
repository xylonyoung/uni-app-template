<template>
  <view>
    <view style="display:flex;justify-content:center;align-items:center;margin:20rpx">
      <uni-pagination
				v-show="totalCount>0"
        :total="totalCount"
        :pageSize="numItemsPerPage"
        :current="current"
        @change="getData"
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
        '@order': 'modifiedTime|desc'
      },
      current: null,
      totalCount: 0,
      numItemsPerPage: null
    }
  },
  onShow() {
    this.getData()
  },
  methods: {
    getData(e) {
      let listQuery = this.listQuery
      if (e) {
        listQuery.page = e.current
      }
      getOrders(listQuery).then(res => {
				if(res.data.paginator){
					this.current = res.paginator.current
					this.totalCount = res.paginator.totalCount
					this.numItemsPerPage = res.paginator.numItemsPerPage
				}
      })
    }
  }
}
</script>

