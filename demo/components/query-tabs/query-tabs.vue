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
      default: '#f2f2f2'
    },
    activeColor: {
      type: String,
      default: '#ff6700'
    },
    activeBgColor: {
      type: String,
      default: '#fff'
    },
    showBar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      orderList: []
    }
  },
  created() {},
  methods: {
    arrowStyle(index, type) {
      return this.orderList[index] === type ? '' : { color: 'initial' }
    },
    tabItemStyle(index) {
      const style = {
        color: this.activeColor,
        'background-color': this.activeBgColor,
        'border-bottom': this.showBar
          ? `6rpx solid ${this.activeColor}`
          : 'none'
      }
      return index === this.current ? style : ''
    },
    clickTab(index) {
      if (index === this.current) {
        const arrow = this.orderList[index] === 'down' ? 'up' : 'down'
        this.$set(this.orderList, index, arrow)
      } else {
        this.$set(this.orderList, index, 'up')
        this.$emit('update:current', index)
      }
      const tabItem = this.list[index]
      const query = {}
      if (tabItem.order) {
        const order = this.orderList[index] === 'up' ? 'ASC' : 'DESC'
        query['@order'] = `${tabItem.order}|${order}`
      } else {
        query['@filter'] = tabItem.query
      }
      this.$emit('change', query)
    }
  }
}
</script>
<style lang='scss' scoped>
.query-tabs-container {
  width: 100%;
  height: 80rpx;
  padding: 20rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
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