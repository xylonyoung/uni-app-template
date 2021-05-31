<template>
  <view class="recommend-container">
    <view class="title">精选推荐</view>

    <c-product-list :product-list="recommendList" />
  </view>
</template>
<script>
export default {
  data() {
    return { recommendList: [] }
  },
  created() {
    this.getRecommend()
  },
  methods: {
    navTo(id) {
      uni.navigateTo({
        url: `/pages/product/product?id=${id}`
      })
    },
    getRecommend() {
      const params = {
        '@filter': 'isHot = true',
        '@order': 'listOrder|ASC'
      }
      this.$api.get('/api/products', params).then((res) => {
        this.recommendList = res.data
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/product';
.recommend-container {
  padding: 24rpx 0;
}

.title {
  color: $c-theme;
  text-align: center;
  font-size: 32rpx;
  font-weight: bold;
}
</style>