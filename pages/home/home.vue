<template>
  <view>
    <u-swiper :list="swiperList" height="375"></u-swiper>

    <u-grid :col="4">
      <u-grid-item
        v-for="(item, index) in menuList"
        :key="index"
        @click="navToCategory(item.name)"
      >
        <u-image width="80" height="80" :src="item.icon"></u-image>
        <view>{{ item.name }}</view>
      </u-grid-item>
    </u-grid>

    <view class="coupon">
      <view class="coupon-title">优惠券</view>
      <scroll-view scroll-x class="coupon-scroll">
        <view class="coupon-scroll-image">
          <u-image
            width="320"
            mode="widthFix"
            src="/static/home/coupon.png"
            v-for="(item, index) in 3"
            :key="index"
          ></u-image>
        </view>
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
      menuList: [
        { name: '母婴用品', icon: '/static/home/1.png' },
        { name: '潮流服装', icon: '/static/home/2.png' },
        { name: '护肤美妆', icon: '/static/home/3.png' },
        { name: '居家用品', icon: '/static/home/4.png' },
        { name: '食品饮料', icon: '/static/home/5.png' },
        { name: '家用电器', icon: '/static/home/6.png' },
        { name: '热销商品', icon: '/static/home/7.png' },
        { name: '更多', icon: '/static/home/8.png' }
      ],
      productList: [],
      categoryList: []
    }
  },
  async onLoad() {
    this.$store.dispatch('store/setBadge')
    await this.$store.dispatch('user/wechatLogin')
    this.getData()
  },
  methods: {
    navToProduct(id) {
      uni.navigateTo({
        url: `/pages/product/product?id=${id}`
      })
    },
    navToCategory(name) {
      if (name === '更多') {
        uni.switchTab({
          url: '/pages/category/category'
        })
      } else {
        const item = this.categoryList.find((e) => e.name === name)
        const arr = item.children.map((e) => e.id)
        uni.navigateTo({
          url: `/pages/product/list?category=${JSON.stringify(arr)}`
        })
      }
    },
    getData() {
      this.$api.get('/api/album/by-title/home-swiper').then((res) => {
        this.swiperList = res.data?.pictures.map((e) =>
          this.$getImage(e.__toString)
        )
      })

      this.$api.get('/api/products').then((res) => {
        this.productList = res.data
      })

      this.$store.dispatch('store/getCategory').then((res) => {
        this.categoryList = res.data
      })
    }
  }
}
</script>

<style lang="scss">
page {
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
    height: 160rpx;
    &-image {
      margin-top: 24rpx;
      display: flex;
      u-image + u-image {
        margin-left: 24rpx;
      }
    }
  }
}
</style>

