<template>
  <view class="product-container">
    <c-anchor
      :title="product.name"
      :scroll-top="scrollTop"
      :list="tabList"
      :current="tabIndex"
      container=".product-container"
    />

    <view v-if="inexistent" style="height: 50vh;">
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
            <text>销售价</text>
            <text>{{ productPrice }}</text>
          </view>
          <view>已售 {{ $numberFormat(product.sales) }}件</view>
        </view>
        <view class="introduction-name">
          <view>{{ product.name }}</view>
        </view>
      </view>

      <view class="dimension">
        <u-cell-group>
          <u-cell-item v-if="specialPrice.id">
            <text slot="icon">{{ specialPriceName }}</text>
            <view slot="title" class="dimension-title">
              <u-tag type="error" :text="specialPriceDimension" />
            </view>
          </u-cell-item>
          <u-cell-item v-else @click="showCartSelector = true">
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
        <u-parse :html="product.description"></u-parse>
      </view>

      <view v-if="specialPrice.id" class="buy-button">
        <view class="buy-button-quantity">
          <view>购买数量</view>
          <u-number-box
            v-model="quantity"
            :min="1"
            :max="specialPrice.remains"
          ></u-number-box>
        </view>
        <u-button type="error" @click="toPay">立即购买</u-button>
      </view>

      <c-cart-bar v-else @buy="showCartSelector = true" />

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
      showReviews: false,
      specialPrice: {},
      quantity: 1
    }
  },
  computed: {
    productDimension() {
      const result = this.product?.metadata?.specification
      return result ? `共${result.length}种规格` : '暂无规格'
    },
    productReviews() {
      const result = this.product?.evaluations ?? []
      return result.map((e) => e.__metadata)
    },
    productPrice() {
      return this.specialPrice?.price
        ? this.$numberFormat(this.specialPrice?.price)
        : this.dimensionPrice
    },
    specialPriceName() {
      return this.specialPrice?.type === 'DEFAULT' ? '特价' : '预售'
    },
    specialPriceDimension() {
      return this.specialPrice?.metadata?.specification?.name
    },
    dimensionName() {
      return this.selectedDimension?.name ?? null
    }
  },
  watch: {
    product(val) {
      this.inexistent = !val.name
    }
  },
  onLoad(option) {
    this.getProduct(option.id)
    const specialPriceId = option?.specialPriceId
    if (specialPriceId) {
      this.$api.get(`/api/special-prices/${specialPriceId}`).then((res) => {
        this.specialPrice = res
      })
    }
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
  methods: {
    htmlFormat,
    toPay() {
      const product = {
        ...this.product,
        specialPrice: { ...this.specialPrice },
        quantity: this.quantity
      }
      this.$store.dispatch('common/toPay', [product])
    },
    cartSelectorChange(index) {
      this.specificationIndex = index
    },
    getProduct(id) {
      this.$api.get(`/api/products/${id}`).then((res) => {
        this.product = res
        this.swiperList = res.pictures
        uni.setNavigationBarTitle({
          title: this.product.name
        })
      })
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
.product-container {
  min-height: 100vh;
  background-color: $c-background;
}
.introduction {
  background-color: #fff;
  padding: 24rpx;
  &-price {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 24rpx;
    color: $c-price;
    view {
      text:last-child {
        font-size: 60rpx;
        font-weight: bold;
        &::before {
          content: '￥';
          padding-right: 4rpx;
          font-size: 24rpx;
        }
      }
    }
    view:last-child {
      color: $c-gray;
    }
  }
  &-name {
    padding: 0 24rpx;
    display: flex;
    font-size: 36rpx;
    font-weight: bold;
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
.buy-button {
  width: 100%;
  height: 114rpx;
  position: fixed;
  padding: 0 10%;
  bottom: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  &-quantity {
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
