<template>
  <u-popup v-model="showPopup" :mode="mode">
    <view class="popup-category-container">
      <scroll-view scroll-y class="tabs" :style="[scrollStyle]">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="tabs-box"
          :class="index === tempIndex[0] ? 'tabs-box-active' : ''"
          @click="clickTab(index)"
        >
          <view class="tabs-box-name">
            {{ item.name }}
          </view>
        </view>
      </scroll-view>
      <view class="content" v-show="children">
        <view
          class="content-item"
          :class="allSelected ? 'content-item-active' : ''"
          @click="clickChild('all')"
        >
          全部
        </view>
        <view
          class="content-item"
          :class="index === tempIndex[1] ? 'content-item-active' : ''"
          v-for="(item, index) in childList"
          :key="index"
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
    width: {
      type: String,
      default: '160rpx'
    },
    height: {
      type: String,
      default: '100vh'
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
<style lang='scss' scoped>
.popup-category-container {
  display: flex;
}
.tabs {
  height: 100%;
  box-sizing: border-box;
  &-box {
    height: 120rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    background-color: $c-background;
    transition-duration: 0.3s;
    &-name {
      text-align: center;
    }
  }
  &-box-active {
    position: relative;
    color: $c-theme;
    &::before {
      content: '';
      position: absolute;
      border-left: 4px solid $c-theme;
      height: 32rpx;
      left: 0;
      top: 39rpx;
    }
  }
}
.content {
  width: 30vh;
  box-sizing: border-box;
  text-align: center;
  &-item {
    padding: 16rpx;
  }
  &-item-active {
    color: $c-theme;
  }
}
</style>