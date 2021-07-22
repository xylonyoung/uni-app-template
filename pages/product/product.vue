<template>
  <view class="product-container">
    <c-anchor
      :title="product.name"
      :scroll-top="scrollTop"
      :list="tabList"
      :current="tabIndex"
      container=".product-container"
    />

    <view v-if="inexistent" style="height: 50vh">
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

      <view class="presell" v-if="product.isPreSale">预售</view>

      <view class="introduction">
        <view class="introduction-top">
          <view class="introduction-top-price">
            <text>销售价</text>
            <text>{{ dimensionPrice }}</text>
            <text>市场价</text>
            <text>{{ dimensionMarketPrice }}</text>
          </view>
          <button class="reset-button" open-type="share">
            <u-icon name="share" size="32"></u-icon>
            <text>分享</text>
          </button>
        </view>
        <view class="introduction-center">
          <view>{{ product.name }}</view>
          <view>已售 {{ $numberFormat(product.sales) }}件</view>
        </view>

        <!-- <view class="introduction-member">
          <text>会员最高享受5折优惠</text>
          <text @click="$u.route('pages/member/member')">立即开通</text>
        </view> -->
      </view>

      <view class="dimension">
        <u-cell-group>
          <u-cell-item @click="showCartSelector = true">
            <text slot="icon">规格</text>
            <view slot="title" class="dimension-title">
              <u-tag type="info" :text="productDimension" />
              <u-tag v-if="dimensionName" type="error" :text="dimensionName" />
            </view>
          </u-cell-item>
          <u-cell-item value="100%好评" id="review" @click="showReviews = true">
            <text slot="icon">
              商品评论({{ $numberFormat(productReviews.length) }})
            </text>
          </u-cell-item>
          <c-reviews />
        </u-cell-group>
      </view>

      <view>
        <c-reviews :list="productReviews" :limit="2" />
      </view>

      <view id="description">
        <view class="title">详情介绍</view>
        <u-parse :html="htmlFormat(product.description)"></u-parse>
      </view>

      <c-cart-bar :product="product" @buy="showCartSelector = true" />

      <c-cart-selector
        v-model="showCartSelector"
        :product.sync="product"
        @change="cartSelectorChange"
      />
    </view>

    <view id="recommend">
      <c-recommend />
    </view>

    <u-popup v-model="showReviews" mode="bottom" closeable>
      <scroll-view scroll-y style="height: 70vh">
        <c-reviews :list="productReviews" />
      </scroll-view>
    </u-popup>
  </view>
</template>

<script>
import { htmlFormat } from '@/utils'
import dimension from '@/mixins/dimension'
export default {
  mixins: [dimension],
  data() {
    return {
      inexistent: false,
      product: {},
      scrollTop: 0,
      tabList: [
        {
          name: '商品',
          anchor: '#product'
        },
        {
          name: '评论',
          anchor: '#review'
        },
        {
          name: '详情',
          anchor: '#description'
        },
        {
          name: '推荐',
          anchor: '#recommend'
        }
      ],
      tabIndex: 0,
      swiperList: [],
      showCartSelector: false,
      specificationIndex: 0,
      showReviews: false
    }
  },
  computed: {
    productDimension() {
      const result = this.product?.specifications
      return result ? `共${result.length}种规格` : '暂无规格'
    },
    productReviews() {
      const result = this.product?.evaluations ?? []
      return result.map((e) => e.__metadata)
    },
    dimensionName() {
      return this.selectedDimension?.__metadata?.name ?? null
    }
  },
  watch: {
    product(val) {
      this.inexistent = !val.name
    }
  },
  onLoad(option) {
    this.getProduct(option.id)
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内分享按钮
      console.log(res.target)
    }
    return {
      title: this.product.name,
      path: '/pages/product/product?id=' + this.product.id,
      imageUrl: this.$getImage(this.product.cover)
    }
  },
  methods: {
    htmlFormat,
    cartSelectorChange(index) {
      this.specificationIndex = index
    },
    getProduct(id) {
      this.$api.get(`/api/products/${id}`).then((res) => {
        this.product = res.data
        const { pictures, cover } = this.product
        if (pictures) this.getSwiperList([cover, ...pictures])
        uni.setNavigationBarTitle({
          title: this.product.name
        })
      })
    },
    getSwiperList(images) {
      this.swiperList = images.map((e) => this.$getImage(e.__toString ?? e))
    },
    showPreview(index) {
      uni.previewImage({
        current: index,
        urls: this.swiperList
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin market-price {
  color: $c-gray;
  text-decoration: line-through;
}
.product-container {
  min-height: 100vh;
  background-color: $c-background;
}

.presell {
  width: 100%;
  padding: 12rpx 40rpx;
  color:#fff;
  font-size: 40rpx;
  font-weight: bold;
  background-image: linear-gradient(
    to right,
    #ff5934,
    #ff622b,
    #ff6b22,
    #ff7415,
    #ff7d00
  );
}

.introduction {
  background-color: #fff;
  padding: 24rpx 40rpx;
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    color: $c-price;
    &-price {
      text:nth-child(2) {
        font-size: 40rpx;
        font-weight: bold;
        &::before {
          content: '£';
          padding-right: 4rpx;
          font-size: 24rpx;
        }
      }
      text:nth-child(3) {
        margin-left: 16rpx;
        @include market-price;
      }
      text:last-child {
        @include market-price;
        &::before {
          content: '£';
          padding-right: 4rpx;
          font-size: 24rpx;
        }
      }
    }
    .reset-button {
      color: $c-gray;
      font-size: 28rpx;
      text:last-child {
        margin-left: 8rpx;
      }
    }
  }
  &-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    view:first-child {
      font-size: 36rpx;
      font-weight: bold;
    }
    view:last-child {
      color: $c-gray;
    }
  }
  &-member {
    position: relative;
    margin-top: 24rpx;
    padding: 24rpx 80rpx;
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
  margin: 24rpx 0;
  &-title {
    margin-left: 24rpx;
    u-tag + u-tag {
      margin-left: 12rpx;
    }
    &-shipping {
      display: flex;
      view + view {
        margin-left: 24rpx;
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
