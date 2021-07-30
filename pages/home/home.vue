<template>
  <view class="home-container">
    <u-swiper :list="swiperList" height="375" @click="swiperClick"></u-swiper>

    <view class="search-wrapper">
      <view class="search" @click="navTo('product/list')">
        <u-icon name="search"></u-icon>
        搜索
      </view>
    </view>

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
      <view class="coupon-title">
        <view>优惠券</view>
        <view @click="navTo('coupon/coupon')">
          <text>全部优惠券</text>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
      <scroll-view scroll-x class="coupon-scroll">
        <u-empty mode="coupon" v-if="couponList.length === 0"></u-empty>
        <template v-else>
          <view
            class="coupon-scroll-box"
            v-for="(item, index) in couponList"
            :key="index"
            @click="receiveCoupon(item.id)"
          >
            <c-coupon :coupon="item" :disable="hasCoupon(item)" />
          </view>
        </template>
      </scroll-view>
    </view>

    <product-list v-if="loadComponent" />
  </view>
</template>

<script>
import { ProductList } from './product-list.vue'
import couponMixin from '@/mixins/coupon'
export default {
  mixins: [couponMixin],
  components: { ProductList },
  data() {
    return {
      swiperList: [],
      categoryList: [],
      loadComponent: false
    }
  },
  async onLoad() {
    await this.$store.dispatch('user/wechatLogin')
    this.loadComponent = true
    this.getUserCoupons()
    this.getData()
  },
  onShow() {
    this.$store.dispatch('cart/setBadge')
  },
  methods: {
    swiperClick(index) {
      // const link = this.swiperList[index].link
      // uni.navigateTo({
      //   url: link
      // })
    },
    navTo(path) {
      uni.navigateTo({
        url: `/pages/${path}`
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
        this.swiperList = res.data?.pictures.map((e) => ({
          image: this.$getImage(e.__toString),
          link: e.__metadata.link
        }))
      })

      this.$api
        .get('/api/coupons', { '@filter': 'entity.getEnabled()' })
        .then((res) => {
          this.couponList = res.data
        })

      this.$store.dispatch('category/get').then((res) => {
        this.categoryList = res
          .slice(0, 7)
          .sort((a, b) => a.sequence - b.sequence)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  background-color: $c-background;
}

.search-wrapper {
  padding: 12px 0;
  display: flex;
  justify-content: center;
  .search {
    width: 90vw;
    padding: 16rpx;
    top: 40rpx;
    left: 10vw;
    background-color: #ddd;
    border-radius: 8rpx;
  }
}

.coupon {
  margin-top: 24rpx;
  padding: 24rpx;
  background-color: #fff;
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $c-gray;
  }
  &-scroll {
    height: 164rpx;
    margin-top: 24rpx;
    white-space: nowrap;
    &-box + &-box {
      margin-left: 24rpx;
    }
    &-box {
      display: inline-block;
    }
  }
}
</style>

