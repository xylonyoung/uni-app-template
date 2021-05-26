<template>
  <view class="home-container">
    <u-swiper :list="swiperList" height="375"></u-swiper>

    <u-grid :col="4">
      <u-grid-item
        v-for="(item, index) in categoryList"
        :key="index"
        @click="navToCategory(item.id)"
      >
        <u-image width="80" height="80" :src="item.icon"></u-image>
        <view>{{ item.name }}</view>
      </u-grid-item>
      <u-grid-item @click="navToCategory(-1)">
        <u-image width="80" height="80" src="/static/more.png"></u-image>
        <view>更多</view>
      </u-grid-item>
    </u-grid>

    <view class="section">
      <view class="section-title">限时特价</view>
      <c-product-list :product-list="specialPriceList" />
    </view>

    <view class="section">
      <view class="section-title">预售</view>
      <c-product-list :product-list="presellList" />
    </view>

    <view class="section">
      <view class="section-title">推荐</view>
      <c-product-list :product-list="productList" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [],
      productList: [],
      categoryList: [],
      specialPriceList: [],
      presellList: []
    }
  },
  async onLoad() {
    // await this.$api
    //   .post('/auth/login', { password: '123456', username: 'xylon' })
    //   .then((res) => {
    //     uni.setStorageSync('token', 'Bearer ' + res.token)
    //   })
      
    this.$store.dispatch('common/setBadge')
    await this.$store.dispatch('user/wechatLogin')
    this.getData()
  },
  methods: {
    navToCategory(id) {
      if (id === -1) {
        uni.switchTab({
          url: '/pages/category/category'
        })
      } else {
        uni.navigateTo({
          url: `/pages/product/list?category=${id}`
        })
      }
    },
    getData() {
      this.$api
        .get('/api/albums', { '@filter': 'name = homeSwiper' })
        .then((res) => {
          this.swiperList = res.content?.[0]?.pictures ?? []
        })

      this.$store.dispatch('common/getCategory').then((res) => {
        this.categoryList = res.slice(0, 7) ?? []
      })

      this.$api.get('/api/special-prices').then((response) => {
        const waitSpecialPrice = []
        const waitPresell = []
        const specialPrice = []
        const presellPrice = []
        response.content.forEach((e) => {
          if (e.type === 'DEFAULT') {
            waitSpecialPrice.push(
              this.$api.get('/api/specifications/' + e.specification)
            )
            specialPrice.push(e)
          }
          if (e.type === 'PRE_SALE') {
            waitPresell.push(
              this.$api.get('/api/specifications/' + e.specification)
            )
            presellPrice.push(e)
          }
        })
        Promise.all(waitSpecialPrice).then((res) => {
          this.specialPriceList = res.map((e, index) => {
            return {
              ...(e?.metadata?.product ?? {}),
              specialPrice: { ...specialPrice[index] }
            }
          })
        })
        Promise.all(waitPresell).then((res) => {
          this.presellList = res.map((e, index) => {
            return {
              ...(e?.metadata?.product ?? {}),
              specialPrice: { ...presellPrice[index] }
            }
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  background-color: $c-background;
}

.section {
  margin-top: 24rpx;
  &-title {
    padding: 24rpx;
    background-color: #fff;
    font-size: 32rpx;
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
      &-image {
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

