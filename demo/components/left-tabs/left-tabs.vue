<template>
  <view class="left-tabs-container" :style="'background-color:' + bgColor">
    <scroll-view scroll-y class="tabs" :style="[scrollStyle]">
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
      </view>
    </scroll-view>
    <view
      class="content"
      :style="'background-color:' + activeBgColor"
      v-show="children && Number.isInteger(tabIndex)"
    >
      <view :style="[tabChildStyle('all')]" @click="clickChild('all')">
        全部
      </view>
      <view
        v-for="(item, index) in childList"
        :key="index"
        :style="[tabChildStyle(index)]"
        @click="clickChild(index)"
      >
        {{ item.name }}
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    list: { type: Array, default: () => [] },
    current: { type: [Number, Array], default: null },
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
    width: {
      type: String,
      default: () => '160rpx',
    },
    height: {
      type: String,
      default: () => `100vh`,
    },
    children: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { tabIndex: null, childIndex: null, allChild: false }
  },
  created() {
    if (this.children) {
      this.tabIndex = this.current[0]
      this.childIndex = this.current[1]
    } else {
      this.tabIndex = this.current
    }
    console.log(this.tabIndex, this.childIndex)
  },
  computed: {
    scrollStyle() {
      return { height: this.height, width: this.width }
    },
    showChildren() {
      const list = this.list[this.tabIndex]
      return list && list.children && list.children.length > 0
    },
    childList() {
      const result = this.list[this.tabIndex]
      if (result) {
        return result.children
      } else {
        return []
      }
    },
  },
  methods: {
    tabChildStyle(index) {
      const style = {
        color: this.activeColor,
        padding: '20rpx',
      }
      if (index === 'all') return this.allChild ? style : { padding: '20rpx' }
      return index === this.childIndex ? style : { padding: '20rpx' }
    },
    tabItemStyle(index) {
      const style = {
        color: this.activeColor,
        'background-color': this.activeBgColor,
        'border-left': `8rpx solid ${this.activeColor}`,
        padding: '20rpx 20rpx 20rpx 12rpx',
      }
      return index === this.tabIndex ? style : ''
    },
    clickTab(index) {
      if (index === this.tabIndex) return
      this.tabIndex = index
      this.allChild = false
      this.childIndex = null
      if (!this.children) {
        this.$emit('update:current', index)
        this.$emit('change', index)
      }
    },
    clickChild(index) {
      if (index === this.childIndex) return
      if (index === 'all') {
        this.allChild = true
        this.childIndex = null
        this.$emit('update:current', this.tabIndex)
        this.$emit('change', this.tabIndex)
      } else {
        this.allChild = false
        this.childIndex = index
        this.$emit('update:current', [this.tabIndex, index])
        this.$emit('change', [this.tabIndex, index])
      }
    },
  },
}
</script>
<style lang='scss'>
.left-tabs-container {
  display: flex;
}
.tabs {
  height: 100%;
  box-sizing: border-box;
  .tabs-box {
    padding: 20rpx;
    transition-duration: 0.3s;
    .name {
      text-align: center;
    }
  }
}
.content {
  width: 30vh;
  box-sizing: border-box;
  text-align: center;
}
</style>