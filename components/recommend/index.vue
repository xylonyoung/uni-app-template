<template>
  <view class="recommend-container">
    <view class="title">
      <u-icon name="thumb-up-fill" color="#ff6900"></u-icon>
      为你推荐
    </view>

    <view class="product">
      <view
        class="product-item"
        v-for="(item, index) in recommendList"
        :key="index"
        @click="navTo(item.id)"
      >
        <u-image
          width="330rpx"
          height="330rpx"
          border-radius="16"
          :src="item.cover"
        ></u-image>
        <view class="product-item-name">{{ item.name }}</view>
        <view class="product-item-bottom">
          <view class="product-item-bottom-price">
            <text>￥</text>
            {{ $numberFormat(item.price, 0) }}
          </view>
          <view class="product-item-bottom-sold">
            已售{{ $numberFormat(item.sold) }}件
          </view>
        </view>
      </view>
    </view>
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
        url: `/pages/product/product?id=${id}`,
      })
    },
    getRecommend() {
      const params = {
        page: 1,
        limit: 4,
        '@order': 'modifiedTime|DESC',
        '@filter': 'entity.getIsRecommended()',
      }
      this.$api.get('mockProducts', params).then((res) => {
        this.recommendList = res.data
      })
    },
  },
}
</script>
<style lang='scss'>
@import '@/styles/product';
.recommend-container {
  padding: 30rpx 0;
}
.title {
  margin-bottom: 30rpx;
  text-align: center;
  font-size: 30rpx;
  font-weight: bold;
}
</style>