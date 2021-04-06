<template>
  <view class="query-tabs-container">
    <view
      v-for="(item, index) in list"
      :key="index"
      class="tabs-box"
      :style="[tabItemStyle(index)]"
      @click="clickTab(index)"
    >
      <view class="name">
        {{ item.name }}
      </view>
      <view class="arrow" v-if="item.order">
        <u-icon name="arrow-up" :style="[arrowStyle(index, 'up')]"></u-icon>
        <u-icon name="arrow-down" :style="[arrowStyle(index, 'down')]"></u-icon>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    list: { type: Array, default: () => [] },
    current: { type: Number, default: 0 },
    bgColor: {
      type: String,
      default: '#f2f2f2',
    },
    activeColor: {
      type: String,
      default: '#ff6700',
    },
    activeBgColor: {
      type: String,
      default: '#fff',
    },
    showBar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      queryList: [],
      tabIndex: 0,
    }
  },
  watch: {
    current: {
      handler(val) {
        this.$nextTick(() => {
          this.tabIndex = val
        })
      },
      immediate: true,
    },
  },
  methods: {
    arrowStyle(index, type) {
      return this.queryList[index] === type ? '' : { color: 'initial' }
    },
    tabItemStyle(index) {
      const style = {
        color: this.activeColor,
        'background-color': this.activeBgColor,
        'border-bottom': this.showBar
          ? `6rpx solid ${this.activeColor}`
          : 'none',
      }
      return index === this.tabIndex ? style : ''
    },
    clickTab(index) {
      if (index === this.tabIndex) {
        const arrow = this.queryList[index] === 'down' ? 'up' : 'down'
        this.$set(this.queryList, index, arrow)
      } else {
        this.$set(this.queryList, index, 'up')
        this.tabIndex = index
      }
      const tabItem = this.list[index]
      let query
      if (tabItem.order) {
        const order = this.queryList[index] === 'up' ? 'ASC' : 'DESC'
        query = { '@order': `${tabItem.order}|${order}` }
      } else {
        query = { ...tabItem.query }
      }
      this.$emit('change', query)
    },
  },
}
</script>
<style lang='scss'>
.query-tabs-container {
  width: 100%;
  height: 80rpx;
  padding: 20rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
}
.tabs-box {
  height: 80rpx;
  line-height: 80rpx;
  display: flex;
  transition-duration: 0.3s;
  font-size: 30rpx;
  font-weight: bold;
}
.arrow {
  padding-left: 4rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20rpx;
}
</style>