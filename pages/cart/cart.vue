<template>
  <view class="cart-container">
    <view class="top" v-if="!isEmpty">
      <view>购物车</view>
      <view @click="showDelete = !showDelete">
        {{ showDelete ? '完成' : '管理' }}
      </view>
    </view>

    <view class="empty" v-if="isEmpty">
      <u-empty mode="car"></u-empty>
      <c-recommend />
    </view>

    <view class="cart-product" v-for="(item, index) in products" :key="index">
      <u-checkbox
        shape="circle"
        :value="item.checked"
        :name="index"
        :disabled="!item.quantity"
        @change="checkboxChange"
      ></u-checkbox>
      <view class="description" @click="navTo(item.id)">
        <u-image
          width="200rpx"
          height="200rpx"
          :src="$getImage(item.cover)"
        ></u-image>
        <view class="description">
          <view>
            <view class="description-name">{{ item.name }}</view>
            <u-tag
              :text="$getValue(findSpecification(item), '__metadata.name')"
              type="info"
              @click.native.stop="toShowCartSelector(item)"
            />
          </view>
          <view class="description-bottom">
            <view class="description-bottom-price">
              <text>￥</text>
              {{
                $numberFormat(
                  $getValue(findSpecification(item), '__metadata.price')
                )
              }}
            </view>
            <!-- component can reactive now! -->
            <u-number-box
              v-model="products[index].quantity"
              :max="findSpecification(item).remains"
              @click.native.stop
            ></u-number-box>
          </view>
        </view>
      </view>
    </view>

    <view class="bottom-bar">
      <view>
        <u-checkbox v-model="checkAll" @change="checkedAll" shape="circle">
          全选
        </u-checkbox>
        <view v-if="discount">
          {{ member.level.__toString + '：' + $numberFormat(discount * 10) }}折
        </view>
      </view>
      <view class="right" v-if="showDelete">
        <u-button type="error" plain @click="deleteFromCart">删除</u-button>
      </view>
      <view class="right" v-else>
        <view class="price-box">
          <view>
            合计:
            <text class="price">
              ￥
              <text>{{ $numberFormat(amount) }}</text>
            </text>
          </view>
          <view class="freight">不含运费</view>
        </view>
        <u-button type="error" @click="toPay">结算</u-button>
      </view>
    </view>

    <c-cart-selector
      v-model="showCartSelector"
      :product="product"
      hide-button
      @change="cartSelectorChange"
    />
  </view>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      checkAll: false,
      isEmpty: false,
      showDelete: false,
      showCartSelector: false,
      products: [],
      product: {},
      checkList: [],
      showLoading: false,
    }
  },
  computed: {
    ...mapGetters(['cart']),
    amount() {
      const totalPrice = this.products.reduce((acc, cur) => {
        if (!cur.checked) return acc
        const item = cur.specifications.find(
          (e) => e.id === cur.specificationId
        )
        return acc + item.__metadata.price * cur.quantity
      }, 0)
      return this.discount ? totalPrice * this.discount : totalPrice
    },
    discount() {
      const defaultDiscount = this.$getValue(
        this.member,
        'level.__metadata.defaultDiscount'
      )
      return defaultDiscount ? defaultDiscount : 0
    },
  },
  watch: {
    products: {
      handler(val) {
        this.isEmpty = val.length === 0
        this.checkAll = this.isEmpty ? false : val.every((e) => e.checked)
      },
      deep: true,
    },
  },
  onShow() {
    this.$store.dispatch('store/setCart',uni.getStorageSync('cart'))
    this.getProducts()
    this.$store.dispatch('store/setBadge')
  },
  methods: {
    toPay() {
      const products = this.products.filter((e) => e.checked)
      if (!products.length) {
        uni.showToast({
          title: '请选商品~',
          icon: 'none',
        })
        return
      }
      this.$store.dispatch('store/toPay', products)
    },
    deleteFromCart() {
      this.products = this.products.filter((e) => !e.checked)
      const cart = this.cart.filter((e) =>
        this.products.some((i) => i.id === e.productId)
      )
      this.$store.dispatch('store/setCart', cart)
      this.$store.dispatch('store/setBadge')
      uni.showToast({
        title: '删除成功~',
      })
    },
    cartSelectorChange(index) {
      const productIndex = this.products.findIndex(
        (e) => e.id === this.product.id
      )
      this.products[productIndex].specificationId = this.product.specifications[
        index
      ].id
    },
    navTo(id) {
      uni.navigateTo({
        url: `/pages/product/product?id=${id}`,
      })
    },
    findSpecification(item) {
      return (
        item.specifications.find((e) => e.id === item.specificationId) ?? {}
      )
    },
    toShowCartSelector(item) {
      this.product = item
      this.showCartSelector = true
    },
    getProducts() {
      uni.showLoading()
      const products = []
      const cart = this.cart.map((e) => {
        products.push(e.productId)
        return { ...e, checked: false }
      })
      this.$api
        .get('list', {
          '@filter': `entity.getId() in [${products}]`,
        })
        .then((res) => {
          console.log(res.data,cart)
           this.products = cart.map((e) => ({
            ...res.data.find((i) => i.id === e.productId),
            ...e,
          }))
          // component change the value, so need to assignment again!
          this.$nextTick(() => {
            this.products.forEach((e, index) => {
              e.quantity = cart[index].quantity
            })
          })
          uni.hideLoading()
        })
    },
    checkboxChange(event) {
      this.products[event.name].checked = event.value
    },
    checkedAll(event) {
      if (event.value) {
        this.products.forEach((e) => {
          if (e.quantity > 0) e.checked = true
        })
      } else {
        this.products.forEach((e) => {
          e.checked = false
        })
      }
    },
  },
}
</script>
<style lang='scss'>
@import '@/styles/store.scss';
.cart-container {
  padding-bottom: 122rpx;
}
.top {
  position: sticky;
  top: 0;
  z-index: 99;
  padding: 0 30rpx 20rpx;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}
.empty {
  padding-top: 50rpx;
}
.cart-product {
  margin: 20rpx 0;
  padding: 20rpx;
  display: grid;
  grid-template-columns: 10% 90%;
  place-items: center;
  background-color: #fff;
}
</style>