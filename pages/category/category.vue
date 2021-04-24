<template>
  <view class="category-container">
    <view class="top">
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
            class="rotate-arrow"
            name="arrow-down-fill"
            size="16"
            :color="selectedTab === 0 ? '' : '#ccc'"
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
        <view class="tabs-dropdown" v-show="showDropDown">
          <view
            class="tabs-dropdown-item"
            :style="selectedDropDown === index ? 'color:' + themeColor : ''"
            v-for="(item, index) in ['综合排序', '新品优先']"
            :key="index"
            @click="dropDownChange(index)"
          >
            <text>{{ item }}</text>
            <u-icon
              name="checkbox-mark"
              v-show="selectedDropDown === index"
            ></u-icon>
          </view>
          <view :style="[maskStyle]" @click="showDropDown = false"></view>
        </view>
      </view>
    </view>

    <u-popup v-model="showPopup" mode="right">
      <view class="popup">
        <view>出淤泥而不染，濯清涟而不妖</view>
        <view class="popup-bottom">
          <u-button @click="popupConfirm('reset')">重置</u-button>
          <u-button type="warning" @click="popupConfirm('reset')">
            确定
          </u-button>
        </view>
      </view>
    </u-popup>

    <c-load-list
      ref="loadList"
      :list.sync="list"
      :list-api="listApi"
      :list-query.sync="listQuery"
      :reload.sync="reloadList"
      :height="height"
    >
      <view v-for="(item, index) in list" :key="index" class="product">
        <u-avatar :src="item.avatar"></u-avatar>
        <view>{{ item.name }}</view>
        <view>{{ index }}</view>
      </view>
    </c-load-list>
  </view>
</template>

<script>
export default {
  data() {
    return {
      themeColor: '#ff6900',
      searchData: '',
      selectedTab: 0,
      showDropDown: false,
      selectedDropDown: null,
      showPopup: false,
      selectedArrow: '',
      list: [],
      listApi: 'list',
      listQuery: {
        page: 1,
        limit: 10,
        '@order': 'id|DESC',
      },
      reloadList: false,
      height: 'calc(100vh - 80rpx)',
    }
  },
  computed: {
    maskStyle() {
      uni.getSystemInfoSync().windowHeight
      return {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: this.height,
        'background-color': 'rgba(0, 0, 0, .3)',
      }
    },
  },
  created() {
    console.log(this.$uGetRect)
  },
  methods: {
    tabStyle(index) {
      if (index === this.selectedTab) {
        return { color: '#ff6900' }
      }
    },
    tabChange(index) {
      switch (index) {
        case 0:
          this.showDropDown = !this.showDropDown
          return
        case 1:
          this.selectedArrow = ''
          break
        case 2:
          this.selectedArrow = this.selectedArrow === 'up' ? 'down' : 'up'
          break
        default:
          break
      }
      this.selectedTab = index
      this.selectedDropDown = null
      this.showDropDown = false
      this.toReloadList()
    },
    dropDownChange(index) {
      this.selectedArrow = ''
      this.selectedTab = 0
      this.selectedDropDown = index
      this.showDropDown = false
      this.toReloadList()
    },
    popupConfirm(reset) {
      this.showPopup = false
    },
    searchProducts(e) {},
    toReloadList() {
      this.reloadList = true
    },
  },
}
</script>

<style lang="scss">
.search-bar {
  padding: 20rpx 40rpx 0;
}
.tabs {
  height: 80rpx;
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  &-item {
    display: flex;
    &-arrow {
      padding-left: 8rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 20rpx;
    }
  }
  &-dropdown {
    width: 100%;
    position: absolute;
    left: 0;
    top: 80rpx;
    z-index: 9;
    background-color: #fff;
    &-item {
      padding: 30rpx 100rpx;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #eee;
    }
  }
}
.popup {
  height: 100%;
  position: relative;
  &-bottom {
    width: 100%;
    padding: 0 20rpx;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
  }
}
.product {
  text-align: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}
</style>
