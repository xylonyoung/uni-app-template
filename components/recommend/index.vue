<template>
  <view class="recommend-container">
    <view class="title">
      <u-icon name="thumb-up-fill" color="#ff6700"></u-icon>
      为你推荐
    </view>
    <view class="products">
      <view
        class="products-item"
        v-for="(item, index) in recommendList"
        :key="index"
        @click="navTo(item.id)"
      >
        <u-image
          width="100%"
          height="300rpx"
          :src="$getImage(item.cover)"
        ></u-image>
        <view class="products-item-detail">
          <view class="name">
            {{ item.name }}
          </view>
          <view class="products-item-detail-bottom">
            <text class="products-item-detail-bottom-price">
              <text>￥</text>
              {{ $numberFormat(item.price) }}
            </text>
            <text class="products-item-detail-bottom-sold">
              {{ $numberFormat(item.sold) }}人付款
            </text>
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
      this.$api.get('list', params).then((res) => {
        this.recommendList = res.data
      })
    },
  },
}
</script>
<style lang='scss'>
.recommend-container {
  padding: 30rpx 20rpx;
}
.title {
  margin-bottom: 30rpx;
  text-align: center;
  font-size: 30rpx;
  font-weight: bold;
}
.products {
  display: grid;
  grid-template-columns: 1fr 1fr;
  &-item {
    margin: 0 10rpx 20rpx;
    border-radius: 20rpx;
    overflow: hidden;
    background-color: #fff;
    &-detail {
      padding: 20rpx;
      &-name {
        margin-bottom: 10rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &-bottom {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        &-price {
          color: #fa3534;
          font-size: 40rpx;
          text {
            font-size: 24rpx;
          }
        }
        &-sold {
          color: $t-gray;
        }
      }
    }
  }
}
</style>