<template>
  <view>
    <u-swiper :list="swiperList" height="400"></u-swiper>

    <u-grid :col="4">
      <u-grid-item v-for="(item, index) in menuList" :key="index">
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

    <view class="product">
      <view
        class="product-item"
        v-for="(item, index) in productList"
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
    return {
      swiperList: [
        {
          image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
          title: '昨夜星辰昨夜风，画楼西畔桂堂东',
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
          title: '身无彩凤双飞翼，心有灵犀一点通',
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
        },
      ],
      menuList: [
        { name: '母婴用品', icon: '/static/home/1.png' },
        { name: '潮流服装', icon: '/static/home/2.png' },
        { name: '护肤美妆', icon: '/static/home/3.png' },
        { name: '居家用品', icon: '/static/home/4.png' },
        { name: '食品饮料', icon: '/static/home/5.png' },
        { name: '家用电器', icon: '/static/home/6.png' },
        { name: '热销商品', icon: '/static/home/7.png' },
        { name: '更多', icon: '/static/home/8.png' },
      ],
      productList: [],
    }
  },
  onLoad() {
    this.$store.dispatch('store/setBadge')
    this.getProductList()
  },
  methods: {
    getProductList() {
      this.$api.get('mockProducts').then((res) => {
        this.productList = res.data
      })
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/product';
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

