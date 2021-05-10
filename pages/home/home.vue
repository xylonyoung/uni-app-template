<template>
  <view class="home-container">
    <u-swiper :list="swiperList" height="375"></u-swiper>

    <u-grid :col="4">
      <u-grid-item
        v-for="(item, index) in categoryList"
        :key="index"
        @click="navToCategory(index)"
      >
        <u-image width="80" height="80" :src="$getImage(item.icon)"></u-image>
        <view>{{ item.name }}</view>
      </u-grid-item>
      <u-grid-item @click="navToCategory(-1)">
        <u-image width="80" height="80" src="/static/more.png"></u-image>
        <view>更多</view>
      </u-grid-item>
    </u-grid>

    <view class="coupon">
      <view class="coupon-title">优惠券</view>
      <scroll-view scroll-x class="coupon-scroll">
        <u-empty mode="coupon" v-if="couponList.length === 0"></u-empty>
        <template v-else>
          <view
            class="coupon-scroll-box"
            v-for="(item, index) in couponList"
            :key="index"
            @click="getCoupon(item.id)"
          >
            <u-image
              class="coupon-scroll-box-image"
              width="320"
              height="160"
              mode="aspectFit"
              :src="$getImage(item.image)"
            ></u-image>
            <view class="coupon-scroll-box-get">立即领取</view>
          </view>
        </template>
      </scroll-view>
    </view>

    <c-product-list :product-list="productList" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [],
      couponList: [],
      productList: [],
      categoryList: []
    }
  },
  async onLoad() {
    this.$store.dispatch('common/setBadge')
    await this.$store.dispatch('user/wechatLogin')
    this.getData()
  },
  methods: {
    getCoupon(id) {
      this.$api.post('/api/user-coupons', { coupon: id }).then((res) => {
        uni.showToast({
          title: '领取成功',
          duration: 2000
        })
      })
    },
    navToProduct(id) {
      uni.navigateTo({
        url: `/pages/product/product?id=${id}`
      })
    },
    navToCategory(index) {
      if (index === -1) {
        uni.switchTab({
          url: '/pages/category/category'
        })
      } else {
        const result = this.categoryList[index]?.children.map((e) => e.id)
        uni.navigateTo({
          url: `/pages/product/list?category=${JSON.stringify(result)}`
        })
      }
    },
    getData() {
      this.$api.get('/api/album/by-title/home-swiper').then((res) => {
        this.swiperList = res.data?.pictures.map((e) =>
          this.$getImage(e.__toString)
        )
      })

      this.$api
        .get('/api/coupons', { '@filter': 'entity.getEnabled()' })
        .then((res) => {
          this.couponList = res.data
        })

      this.$store.dispatch('common/getCategory').then((res) => {
        this.categoryList = res.data.slice(0, 7)
      })

      this.$api.get('/api/products').then((res) => {
        this.productList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  background-color: $c-background;
}

.coupon {
  margin-top: 24rpx;
  padding: 24rpx;
  background-color: #fff;
  &-title {
    font-size: 40rpx;
    font-weight: bold;
  }
  &-scroll {
    height: 164rpx;
    margin-top: 24rpx;
    display: flex;
    &-box + &-box {
      margin-left: 24rpx;
    }
    &-box {
      display: flex;
      &-image{
        border: 1px solid $c-gray;
        border-right: none;
      }
      &-get {
        width: 48rpx;
        padding: 0 8 rpx;
        color: $c-gray;
        text-align: center;
        border: 1px dashed $c-gray;
      }
    }
  }
}
</style>

