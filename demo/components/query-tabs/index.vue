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
        <u-icon
          name="arrow-up-fill"
          size="16"
          :color="arrowColor(index, 'up')"
        ></u-icon>
        <u-icon
          name="arrow-down-fill"
          size="16"
          :color="arrowColor(index, 'down')"
        ></u-icon>
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
      default: '#ff6900',
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
    arrowColor(index, type) {
      return this.tabIndex === index && this.queryList[index] === type
        ? ''
        : '#bbb'
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
      const tabItem = this.list[index]
      let query

      if (tabItem.order) {
        const arrow = this.queryList[index] === 'up' ? 'down' : 'up'
        const order = arrow === 'up' ? 'ASC' : 'DESC'
        query = { '@order': `${tabItem.order}|${order}` }
        this.$set(this.queryList, index, arrow)
      } else if (index === this.tabIndex) {
        return
      } else {
        query = { ...tabItem.query }
      }

      this.tabIndex = index
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