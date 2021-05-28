<template>
  <view class="product-container">
    <c-anchor
      :title="product.name"
      :scroll-top="scrollTop"
      :list="tabList"
      :current="tabIndex"
      container=".product-container"
    />

    <view v-if="inexistent" style="padding-top: 300rpx; height: 300rpx">
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
            <text>{{ dimensionPrice }}</text>
          </view>
          <view>已售 {{ $numberFormat(product.sales) }}件</view>
        </view>
        <view class="introduction-name">
          <view>{{ product.name }}</view>
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

      <c-cart-bar @buy="showCartSelector = true" />

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
  methods: {
    htmlFormat,
    cartSelectorChange(index) {
      this.specificationIndex = index
    },
    getProduct(id) {
      this.$api.get(`/api/products/${id}`).then((res) => {
        this.product = res.data
        const { pictures } = this.product
        if (pictures) this.getSwiperList(pictures)
        uni.setNavigationBarTitle({
          title: this.product.name
        })
      })
    },
    getSwiperList(images) {
      this.swiperList = images.map((e) => this.$getImage(e.__toString))
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
          content: '£';
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
</style>
