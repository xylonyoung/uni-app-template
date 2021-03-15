<template>
  <view class="left-tabs" :style="'background-color:' + bgColor">
    <scroll-view scroll-y class="tabs" :style="'height:' + height">
      <view
        v-for="(item, index) in tabList"
        :key="index"
        class="tabs-box"
        :style="
          index === tabIndex
            ? `color:${activeColor};background-color:${activeBgColor}`
            : ''
        "
        @click="clickTab(index)"
      >
        <view
          class="name"
          :style="
            index === tabIndex
              ? `border-left: 10rpx solid ${activeColor};padding-left: 10rpx`
              : ''
          "
        >
          {{ item.name }}
        </view>
      </view>
    </scroll-view>
    <view class="content" :style="'background-color:' + activeBgColor">
      <slot />
    </view>
  </view>
</template>
<script>
export default {
  props: {
    tabList: { type: Array, default: () => [] },
    tabIndex: { type: Number, default: 0 },
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
    height: {
      type: String,
      default: () => `${uni.getSystemInfoSync().windowHeight}px`
    }
  },
  data() {
    return {}
  },
  methods: {
    clickTab(index) {
      if (index === this.tabIndex) return
      this.$emit('update:tabIndex', index)
    }
  }
}
</script>
<style lang='scss' scoped>
.left-tabs {
  display: flex;
}
.tabs {
  width: 160rpx;
  height: 100%;
  box-sizing: border-box;
  .tabs-box {
    padding: 20rpx 20rpx 20rpx 0;
    .name {
      padding-left: 20rpx;
      text-align: center;
    }
  }
}
.content {
  width: calc(100% - 160rpx);
  box-sizing: border-box;
}
</style>