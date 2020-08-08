<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area" v-for="(item, index) in list" :key="index">
      <text class="title">{{ item }}</text>
    </view>
    <u-loadmore :status="status" />
    <u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: 0,
      status: 'loading',
      query: {
        page: 1,
        limit: 10,
        '@order': 'modifiedTime|desc',
      },
      list: [],
    }
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
  //下拉刷新
  onPullDownRefresh() {
    this.loadData('refresh')
  },
  //加载更多
  onReachBottom() {
    if (this.status === 'loadmore') {
      this.loadData()
    }
  },
  onLoad() {
    this.loadData()
  },
  methods: {
    async loadData(type) {
      function getData(query) {
        return new Promise(resolve => {
          let res = {}
          res.data = []
          for (let i = 0; i < 20; i++) {
            res.data.push('Hello')
          }
          res.paginator = { next: ++query.page }
          if (query.page === 3) {
            res.paginator.current = 3
            res.paginator.endPage = 3
          }
          console.log(query, res)
          setTimeout(() => {
            resolve(res)
          }, 1000)
        })
      }

      this.status = 'loading'
      if (type === 'refresh') {
        this.query.page = 1
        this.list = []
      }
      let list, currentPage, endPage
      await getData(this.query).then(res => {
        list = this.getProperty(res, 'data') || []
        const paginator = res.paginator
        if (paginator) {
          this.query.page = paginator.next
          currentPage = paginator.current
          endPage = paginator.endPage
        }
      })

      this.list = this.list.concat(list)
      //判断是否还有下一页
      this.status =
        endPage - currentPage === 0 || this.list.length === 0
          ? 'nomore'
          : 'loadmore'
      uni.stopPullDownRefresh()
    },
    navTo(link) {
      uni.navigateTo({
        url: `../${link}`,
      })
    },
  },
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
