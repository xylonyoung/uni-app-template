<template>
  <view class="product-list-container">
    <view
      class="category"
      v-for="(category, categoryIndex) in categoryList"
      :key="categoryIndex"
    >
      <u-image
        width="100%"
        height="300rpx"
        :src="$getImage(category.picture)"
      ></u-image>
      <view class="title">
        <u-divider>{{ category.name }}</u-divider>
        <view class="title-more" @click="navToList(category)">
          <text>更多</text>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
      <view class="product">
        <view
          class="product-item"
          v-for="(item, index) in categoryList[categoryIndex].productList"
          :key="index"
          @click="navTo(item.id)"
        >
          <u-image
            height="200rpx"
            border-radius="16"
            mode="aspectFill"
            :src="$getImage(item.cover)"
          ></u-image>
          <view class="product-item-name">{{ item.name }}</view>
          <view class="product-item-bottom">
            <view class="product-item-bottom-price">
              {{ productPrice(item) }}
            </view>
            <view class="product-item-bottom-cart">
              <u-icon name="shopping-cart" color="#fa3534" size="32"></u-icon>
            </view>
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
      categoryList: []
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      this.$store.dispatch('category/get').then((res) => {
        this.categoryList = res.filter(e=>e.isHomeDisplay)
        this.categoryList.forEach((e, index) => {
          const idList = [...this.collectCategoryId(e)]
          const params = {
            limit: 6,
            '@filter': `entity.getCategory().getId() in [${idList}]`
          }
          this.$request.get('/api/products', params).then((res) => {
            this.$set(this.categoryList[index], 'productList', res.data)
          })
        })
      })
    },
    collectCategoryId(item) {
      const result = [item.id]
      collectChildrenId(item.children)
      return result

      function collectChildrenId(list) {
        return list.forEach((e) => {
          result.push(e.id)
          const children = e?.__metadata?.children
          if (children) {
            collectChildrenId(children)
          }
        })
      }
    },
    productPrice(item) {
      return this.$numberFormat(item?.specifications?.[0]?.__metadata?.price)
    },
    navTo(id) {
      uni.navigateTo({
        url: `/pages/product/product?id=${id}`
      })
    },
    navToList(item) {
      uni.navigateTo({
        url: `/pages/product/list?category=${JSON.stringify([
          ...this.collectCategoryId(item)
        ])}`
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/product';
.product-list.container {
  margin-top: 24rpx;
}

.title {
  position: relative;
  padding: 24rpx;
  text-align: center;
  color: $c-gray;
  background-color: #fff;
  &-more {
    position: absolute;
    right: 24rpx;
    top: 50%;
    transform: translate(0, -51%);
  }
}

.product {
  padding: 12rpx;
  grid-template-columns: 1fr 1fr 1fr;
  &-item {
    width: 94%;
  }
}
</style>