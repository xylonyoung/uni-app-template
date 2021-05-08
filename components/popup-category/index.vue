<template>
  <u-popup v-model="showPopup" :mode="mode">
    <view
      class="popup-category-container"
      :style="'display:flex;background-color:' + bgColor"
    >
      <scroll-view
        scroll-y
        class="popup-category-container-tabs"
        :style="[scrollStyle]"
      >
        <view
          v-for="(item, index) in list"
          :key="index"
          class="popup-category-container-tabs-box"
          :style="[tabItemStyle(index)]"
          @click="clickTab(index)"
        >
          <view class="popup-category-container-tabs-box-name">
            {{ item.name }}
          </view>
        </view>
      </scroll-view>
      <view
        class="popup-category-container-content"
        :style="'background-color:' + activeBgColor"
        v-show="children"
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
  </u-popup>
</template>
<script>
export default {
  props: {
    value: { type: Boolean, default: false },
    list: { type: Array, default: () => [] },
    current: { type: [Number, Array], required: true },
    mode: {
      type: String,
      default: 'right'
    },
    bgColor: {
      type: String,
      default: '#f2f2f2'
    },
    activeColor: {
      type: String,
      default: '#ff6900'
    },
    activeBgColor: {
      type: String,
      default: '#fff'
    },
    width: {
      type: String,
      default: () => '160rpx'
    },
    height: {
      type: String,
      default: () => `100vh`
    },
    // is 2-D array?
    children: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showPopup: false,
      allSelected: false,
      tempIndex: []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.showPopup = val
      },
      immediate: true
    }
  },
  created() {
    this.tempIndex = [...this.current]
  },
  computed: {
    scrollStyle() {
      return { height: this.height, width: this.width }
    },
    childList() {
      return this.list[this.tempIndex[0]]?.children ?? []
    }
  },
  methods: {
    tabChildStyle(index) {
      const style = { padding: '16rpx' }
      const activateStyle = { color: this.activeColor, ...style }
      if (index === 'all') {
        return this.allSelected ? activateStyle : style
      }
      return index === this.tempIndex[1] ? activateStyle : style
    },
    tabItemStyle(index) {
      const style = {
        color: this.activeColor,
        'background-color': this.activeBgColor,
        'border-left': `8rpx solid ${this.activeColor}`,
        padding: '16rpx 16rpx 16rpx 12rpx'
      }
      return index === this.tempIndex[0] ? style : ''
    },
    setTempIndex(arg) {
      let result
      if (typeof arg === 'number') {
        result = [arg, null]
      } else {
        result = [...arg]
      }
      this.$set(this.tempIndex, 0, result[0])
      this.$set(this.tempIndex, 1, result[1])
    },
    clickTab(index) {
      if (index === this.tempIndex[0]) return

      if (this.children) {
        this.setTempIndex(index)
        this.allSelected = false
      } else {
        this.$emit('update:current', index)
        this.$emit('change', index)
      }
    },
    clickChild(index) {
      if ([this.tempIndex[0], index] === this.current) return

      let result
      if (index === 'all') {
        this.allSelected = true
        this.$emit('update:current', [this.tempIndex[0]])
        this.setTempIndex(this.tempIndex[0])
        result = this.list[this.tempIndex[0]].children.map((e) => e.id)
      } else {
        this.allSelected = false
        this.setTempIndex([this.tempIndex[0], index])
        this.$emit('update:current', [this.tempIndex[0], index])
        result = [this.list[this.tempIndex[0]].children[index].id]
      }
      this.$emit('change', result)
    }
  }
}
</script>
<style lang='scss'>
.popup-category-container {
  display: flex;
  &-tabs {
    height: 100%;
    box-sizing: border-box;
    &-box {
      padding: 16rpx;
      transition-duration: 0.3s;
      &-name {
        text-align: center;
      }
    }
  }
  &-content {
    width: 30vh;
    box-sizing: border-box;
    text-align: center;
  }
}
</style>