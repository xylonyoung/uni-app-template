<template>
  <view class="left-tabs" :style="'background-color:' + bgColor">
    <scroll-view
      scroll-y
      scroll-left="0"
      scroll-with-animation
      class="tabs"
      :style="'height:' + height"
    >
      <view
        v-for="(item, index) in tabs"
        :key="index"
        class="tabs-box"
        :style="
          index === tabIndex
            ? `color:${activeColor};background-color:${activeBgColor}`
            : ''
        "
        @tap="clickTab(index)"
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
    <template v-for="(tab, index) in tabs">
      <c-load-list
        :list-api="tab.listApi"
        :list-query.sync="tab.listQuery"
        v-slot="{ list }"
        ref="loadList"
        :key="index"
        :auto="index === tabIndex"
        v-show="index === tabIndex"
        class="content"
        :height-fix="heightFix"
        :style="'background-color:' + activeBgColor"
      >
        <view>
          <slot :list="list"></slot>
        </view>
      </c-load-list>
    </template>
  </view>
</template>
<script>
export default {
  props: {
    tabs: { type: Array, default: () => [] },
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
    heightFix: { type: [String, Number], default: 0 }
  },
  data() {
    return { height: '399px' }
  },
  created() {
    this.height = `${uni.getSystemInfoSync().windowHeight - this.heightFix}px`
    console.log(uni.getSystemInfoSync(), '00000000', this.height)
  },
  methods: {
    onRefresh() {
      this.$refs.loadList[this.tabIndex].loadData('refresh')
    },
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
}
</style>