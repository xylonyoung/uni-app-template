<template>
  <view class="load-list-container">
    <scroll-view
      scroll-y
      class="scroll-view"
      :style="{ height: height, 'padding-top': `${paddingTop}rpx` }"
      scroll-with-animation
      :scroll-top="scrollTop"
      @scrolltolower="scrollToLower"
      @scroll="scroll"
    >
      <slot :list="list"></slot>

      <u-empty v-if="showEmpty"></u-empty>

      <u-loadmore v-else :status="status" style="padding: 20rpx" />

      <transition name="back">
        <view class="back-to-top" v-if="scrollTop > 300">
          <u-icon
            @click="backToTop"
            size="60"
            color="rgba(255,255,255,0.8)"
            name="arrow-upward"
          ></u-icon>
        </view>
      </transition>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: {
    listApi: { type: String, default: '' },
    listQuery: {
      type: Object,
      default: () => ({ page: 1, limit: 10 })
    },
    auto: { type: Boolean, default: true },
    paddingTop: { type: [String, Number], default: 0 }
  },
  data() {
    return {
      height: '399px',
      scrollTop: 0,
      status: 'loading',
      showEmpty: false,
      list: []
    }
  },
  watch: {
    auto: {
      handler: function (val) {
        if (val && this.list.length === 0) this.loadData()
      },
      immediate: true
    }
  },
  created() {
    this.height = uni.getSystemInfoSync().windowHeight + 'px'
  },
  methods: {
    backToTop() {
      this.scrollTop = 0
    },
    scrollToLower() {
      this.loadData()
    },
    scroll(e) {
      this.scrollTop = e.detail.scrollTop
    },
    async loadData(type) {
      const listQuery = Object.assign({}, this.listQuery)

      if (type === 'refresh') {
        listQuery.page = 1
        this.scrollTop = 0
        this.showEmpty = false
      } else if (this.status === 'nomore') return

      this.status = 'loading'

      const res = await this.$api.get(this.listApi, listQuery)

      const list = res.data
      const { paginator } = res
      let currentPage, endPage

      if (paginator) {
        listQuery.page = paginator.next
        currentPage = paginator.current
        endPage = paginator.endPage
      } else {
        this.showEmpty = true
      }
      //have next page or not?
      this.status =
        endPage - currentPage === 0 || list.length === 0 ? 'nomore' : 'loadmore'
      //update data & interaction
      this.list = type === 'refresh' ? list : this.list.concat(list)
      this.$emit('update:listQuery', listQuery)
      uni.stopPullDownRefresh()
    }
  }
}
</script>

<style lang="scss">
.load-list-container {
  height: 100%;
}
.scroll-view {
  box-sizing: border-box;
}
.back-to-top {
  width: 80rpx;
  height: 80rpx;
  position: fixed;
  right: 50rpx;
  bottom: 80rpx;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 100%;
}
.back-enter-active {
  transition: opacity 0.5s;
}
.back-enter {
  opacity: 0;
}
.back-leave-active {
  transition: opacity 0.5s;
}
.back-leave-to {
  opacity: 0;
}
</style>
