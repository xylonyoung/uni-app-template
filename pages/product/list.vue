<template>
  <view class="list-container">
    <view id="list-container-top">
      <view class="search-bar">
        <u-search
          placeholder="请输入搜索的商品"
          clearable
          v-model="searchData"
          @search="searchProducts"
          @custom="searchProducts"
        ></u-search>
      </view>

      <view class="tabs">
        <view
          class="tabs-item"
          :style="[tabStyle(index)]"
          v-for="(item, index) in ['综合', '销量', '价格']"
          :key="index"
          @click="tabChange(index)"
        >
          <view>{{ item }}</view>
          <u-icon
            v-if="index === 0"
            :style="[rotateArrow]"
            name="arrow-down-fill"
            size="16"
          ></u-icon>
          <view class="tabs-item-arrow" v-if="index === 2">
            <u-icon
              name="arrow-up-fill"
              size="16"
              :color="selectedArrow === 'up' ? '' : '#ccc'"
            ></u-icon>
            <u-icon
              name="arrow-down-fill"
              size="16"
              :color="selectedArrow === 'down' ? '' : '#ccc'"
            ></u-icon>
          </view>
        </view>
        <view class="tabs-item" @click="showPopup = true">
          <view>筛选</view>
        </view>

        <view class="tabs-dropdown" :style="[dropdownStyle]">
          <view class="tabs-dropdown-content" :style="[contentStyle]">
            <view
              class="tabs-dropdown-content-item"
              :style="selectedDropdown === index ? 'color:' + themeColor : ''"
              v-for="(item, index) in ['综合排序', '新品优先']"
              :key="index"
              @click="dropdownChange(index)"
            >
              <text>{{ item }}</text>
              <u-icon
                name="checkbox-mark"
                v-show="selectedDropdown === index"
              ></u-icon>
            </view>
          </view>
          <view class="tabs-dropdown-mask" @click="showDropdown = false"></view>
        </view>
      </view>
    </view>

    <c-popup-category
      v-model="showPopup"
      :list="categoryList"
      :current.sync="categoryIndex"
      children
      @change="categoryConfirm"
    />

    <c-load-list
      ref="loadList"
      :list.sync="list"
      :list-api="listApi"
      :list-query.sync="listQuery"
      :reload.sync="reloadList"
      :auto="autoLoadList"
      :height="contentHeight + 'px'"
    >
      <c-product-list :product-list="list" />
    </c-load-list>

    <u-toast ref="uToast" />
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      themeColor: '#ff6900',
      searchData: '',
      selectedTab: 0,
      showDropdown: false,
      selectedDropdown: 0,
      showPopup: false,
      selectedArrow: '',
      list: [],
      listApi: '/api/products',
      listQuery: {
        page: 1,
        limit: 10
      },
      reloadList: false,
      autoLoadList: false,
      contentHeight: '',
      categoryList: [],
      categoryIndex: []
    }
  },
  computed: {
    ...mapGetters([]),
    dropdownStyle() {
      const result = {
        height: this.contentHeight + 'px',
        transition: 'opacity 0.4s linear',
        zIndex: -1,
        opacity: 0
      }
      if (this.showDropdown) {
        result.zIndex = 1
        result.opacity = 1
      }
      return result
    },
    contentStyle() {
      const result = {
        transform: 'translateY(-100%)',
        transitionDuration: '.4s'
      }
      if (this.showDropdown) {
        result.transform = 'translateY(0)'
      }
      return result
    },
    rotateArrow() {
      const result = {
        marginLeft: '8rpx',
        transition: 'transform .4s'
      }
      if (this.showDropdown) {
        result.transform = 'rotate(180deg)'
      } else {
        result.color = '#ccc'
      }
      return result
    }
  },
  onLoad(option) {
    const { category } = option
    if (category) {
      this.setListQuery(`entity.getCategory().getId() in ${category}`)
    }
    this.autoLoadList = true
  },
  onShow() {
    this.$store.dispatch('store/setBadge')
    this.$store.dispatch('store/getCategory').then((res) => {
      this.categoryList = res.data.map((e) => {
        const result = { ...e }
        if (result.children) {
          result.children = result.children.map((i) => {
            return i.__metadata
          })
        }
        return result
      })
    })
  },
  mounted() {
    this.getContentHeight()
  },
  methods: {
    setListQuery(str) {
      this.listQuery['@filter'] = str ?? ''
    },
    categoryItemStyle(index) {
      return index === this.categoryIndex ? { color: this.themeColor } : ''
    },
    categoryConfirm(arr) {
      this.setListQuery(`entity.getCategory().getId() in [${arr}]`)
      this.toReloadList()
      this.showPopup = false
    },
    navToProduct(id) {
      uni.navigateTo({
        url: `/pages/product/product?id=${id}`
      })
    },
    showToast(title, type) {
      this.$refs.uToast.show({
        title,
        type
      })
    },
    getContentHeight() {
      let windowHeight = this.$u.sys().windowHeight
      this.$uGetRect('#list-container-top').then((res) => {
        this.contentHeight = windowHeight - res.bottom
      })
    },
    tabStyle(index) {
      if (index === this.selectedTab) {
        return { color: this.themeColor }
      }
    },
    tabChange(index) {
      switch (index) {
        case 0:
          this.showDropdown = !this.showDropdown
          this.getContentHeight()
          return
        case 1:
          this.selectedArrow = ''
          this.listQuery['@order'] = 'sales|DESC'
          break
        case 2:
          this.selectedArrow = this.selectedArrow === 'up' ? 'down' : 'up'
          this.listQuery['@order'] =
            this.selectedArrow === 'up' ? 'price|ASC' : 'price|DESC'
          break
        default:
          break
      }
      this.selectedTab = index
      this.selectedDropdown = null
      this.showDropdown = false
      this.toReloadList()
    },
    dropdownChange(index) {
      this.listQuery['@order'] = index === 0 ? '' : 'id|DESC'
      this.selectedArrow = ''
      this.selectedTab = 0
      this.selectedDropdown = index
      this.showDropdown = false
      this.toReloadList()
    },
    searchProducts(e) {
      if (!e) {
        this.showToast('请输入搜索内容!', 'warning')
        return
      }
      this.listQuery['@filter'] = `entity.getName() matches '/${e}/'`
      this.toReloadList()
    },
    toReloadList() {
      this.reloadList = true
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  background-color: $c-background;
}

.search-bar {
  padding: 24rpx 40rpx 0;
  background-color: #fff;
}
.tabs {
  height: 80rpx;
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  background-color: #fff;
  &-item {
    display: flex;
    &-arrow {
      padding-left: 8rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 24rpx;
    }
  }
  &-dropdown {
    width: 100%;
    position: absolute;
    left: 0;
    top: 80rpx;
    bottom: 0;
    overflow: hidden;
    &-content {
      position: relative;
      background-color: #fff;
      z-index: 3;
      &-item {
        padding: 32rpx 80rpx;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #eee;
      }
    }
    &-mask {
      position: absolute;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
    }
  }
}
.category {
  width: 60vw;
  height: 100%;
  position: relative;
  &-item {
    padding: 24rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid $c-border;
  }
}
</style>
