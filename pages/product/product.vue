<template>
  <view class="product-container">
    <c-anchor
      :title="product.name"
      :scroll-top="scrollTop"
      :list="tabList"
      :current="tabIndex"
      container=".product-container"
    />

    <view v-if="nonexistent" style="padding-top: 300rpx; height: 300rpx">
      <u-empty text="商品过期不存在" mode="page"></u-empty>
    </view>

    <view v-else>
      <u-swiper
        id="product"
        :list="swiperList"
        :autoplay="false"
        img-mode="widthFix"
        mode="number"
        indicator-pos="bottomRight"
        height="700"
        @click="showPreview"
      ></u-swiper>

      <view class="introduction">
        <view class="introduction-price">
          <view>
            销售价￥
            <text>{{ $numberFormat(product.price) }}</text>
          </view>
          <view>已售 {{ $numberFormat(product.sold) }}件</view>
        </view>
        <view class="introduction-name">
          <view>{{ product.name }}</view>
          <view>分享</view>
        </view>
        <view class="introduction-member">
          <text>会员最高享受5折优惠</text>
          <text @click="$u.route('pages/member/member')">立即开通</text>
        </view>
      </view>

      <view class="dimension">
        <u-cell-group>
          <u-cell-item @click="showCartSelector = true">
            <text slot="icon">规格</text>
            <view slot="title" class="dimension-title">
              <u-tag type="info" :text="productDimension" />
            </view>
          </u-cell-item>
          <u-cell-item @click="showShippingDetail = true">
            <text slot="icon">配送</text>
            <view slot="title" class="dimension-title">
              <view>
                <u-icon name="checkmark-circle"></u-icon>
                <text>同城限时达 | 选择下单预计最快12:00配送</text>
              </view>
              <view class="dimension-title-shipping">
                <view>
                  <u-icon name="checkmark-circle"></u-icon>
                  商家配送
                </view>
                <view>
                  <u-icon name="checkmark-circle"></u-icon>
                  到店自提
                </view>
              </view>
            </view>
          </u-cell-item>
          <u-cell-item value="100%好评" id="review">
            <text slot="icon">商品评论(1)</text>
          </u-cell-item>
          <c-reviews />
        </u-cell-group>
      </view>

      <view id="description">
        <view class="title">详情介绍</view>
        <u-parse :html="htmlFormat(product.description)"></u-parse>
      </view>

      <c-cart-bar @buy="showCartSelector = true" />

      <c-cart-selector
        v-model="showCartSelector"
        :product="product"
        @change="cartSelectorChange"
      />
    </view>

    <view id="recommend">
      <c-recommend />
    </view>

    <u-popup v-model="showShippingDetail" mode="bottom" closeable>
      <view class="shipping-detail">
        <view class="top-title">配送方式</view>
        <view>
          <view class="section">
            <view class="title">
              <u-icon name="home-fill"></u-icon>
              支持同城限时达
            </view>
            <view class="content">现在下单预计最快12:00配送</view>
          </view>
          <view class="section">
            <view class="title">
              <u-icon name="car-fill"></u-icon>
              支持商家配送
            </view>
            <view class="content"></view>
          </view>
          <u-cell-group>
            <u-cell-item
              icon="bag-fill"
              title="支持到店自提"
              value="查看到店自提"
            ></u-cell-item>
          </u-cell-group>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { htmlFormat } from '@/utils'
export default {
  data() {
    return {
      nonexistent: false,
      product: {},
      scrollTop: 0,
      tabList: [
        {
          name: '商品',
          anchor: '#product',
        },
        {
          name: '评论',
          anchor: '#review',
        },
        {
          name: '详情',
          anchor: '#description',
        },
        {
          name: '推荐',
          anchor: '#recommend',
        },
      ],
      tabIndex: 0,
      swiperList: [],
      showShippingDetail: false,
      showCartSelector: false,
      specificationIndex: 0,
    }
  },
  computed: {
    productDimension() {
      return this.product?.dimension
        ? `共${this.product.dimension.length}种规格`
        : ''
    },
    // productPrice() {
    //   if (this.product.specifications) {
    //     const result = this.product.specifications[0]
    //     if (!result) return 0
    //     return this.$numberFormat(result.__metadata.price)
    //   } else {
    //     return 0
    //   }
    // },
  },
  watch: {
    product(val) {
      this.nonexistent = !val.name
    },
  },
  onLoad(option) {
    this.getProduct(option.id)
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
  methods: {
    htmlFormat,
    cartSelectorChange(index) {
      this.specificationIndex = index
    },
    getProduct(id) {
      this.$api.get('mockProducts').then((res) => {
        this.product = res.data[0]
        this.swiperList = this.product.images
        // const { images } = this.product
        // if (images) this.getSwiperList(images)
        uni.setNavigationBarTitle({
          title: this.product.name,
        })
      })
    },
    getSwiperList(images) {
      this.swiperList = images.map((e) => this.$getImage(e))
    },
    showPreview(index) {
      uni.previewImage({
        current: index,
        urls: this.swiperList,
      })
    },
  },
}
</script>

<style lang="scss">
page {
  background-color: $c-background;
}
.introduction {
  background-color: #fff;
  &-price {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 20rpx;
    color: $c-price;
    view {
      text {
        font-size: 60rpx;
        font-weight: bold;
      }
    }
    view:last-child {
      color: $c-gray;
    }
  }
  &-name {
    padding: 0 20rpx;
    display: flex;
    font-size: 36rpx;
    font-weight: bold;
  }
  &-member {
    position: relative;
    margin-top: 20rpx;
    padding: 20rpx 100rpx;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    color: #fff;
    z-index: 0;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-image: linear-gradient(
        to right,
        #ff0000,
        #ff6700,
        #ff9f00,
        #ffd000,
        #ffff00
      );
      filter: blur(8px);
      z-index: -2;
    }
    &::after {
      content: '';
      position: absolute;
      top: 8rpx;
      left: 8rpx;
      bottom: 8rpx;
      right: 8rpx;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: -1;
    }
  }
}
.dimension {
  margin: 20rpx 0;
  &-title {
    margin-left: 20rpx;
    u-tag + u-tag {
      margin-left: 10rpx;
    }
    &-shipping {
      display: flex;
      view + view {
        margin-left: 20rpx;
      }
    }
  }
}
#description {
  margin: 20rpx 0;
  .title {
    padding-bottom: 20rpx;
    text-align: center;
  }
}
.shipping-detail {
  padding: 40rpx;
  .top-title {
    margin-bottom: 20rpx;
    padding-bottom: 20rpx;
    text-align: center;
    font-size: 40rpx;
    border-bottom: 1px solid #e0e0e0;
  }
  .section {
    padding: 0 32rpx 20rpx;
    .title {
      color: #606266;
      .u-icon {
        padding-right: 10rpx;
      }
    }
    .content {
      padding: 10rpx 0 0 38rpx;
      color: #909399;
    }
  }
}
#recommend {
  margin-bottom: 114rpx;
}
</style>
