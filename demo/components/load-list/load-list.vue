<template>
  <view>
    <scroll-view
      scroll-y
      class="scroll-view"
      :style="'height:' + height + ';padding-top:' + paddingTop + 'rpx'"
      :scroll-top="scrollTop"
      @scrolltolower="scrollToLower"
      @scroll="scroll"
      refresher-enabled
      :refresher-triggered="refresh"
      @refresherrefresh="loadData('refresh')"
    >
      <slot :list="list" />

      <view v-if="showEmpty" style="height: 300rpx">
        <u-empty />
      </view>

      <u-loadmore v-else :status="status" style="padding: 20rpx" />
    </scroll-view>

    <transition name="back">
      <view class="back-to-top" v-if="scrollTop > 300">
        <u-icon
          @click="backToTop"
          size="60"
          color="rgba(255,255,255,0.8)"
          name="arrow-upward"
        />
      </view>
    </transition>
  </view>
</template>

<script>
export default {
  props: {
    list: { type: Array, default: () => [] },
    listApi: { type: String, default: '' },
    listQuery: {
      type: Object,
      default: () => ({ page: 1, limit: 10 })
    },
    auto: { type: Boolean, default: true },
    paddingTop: { type: [String, Number], default: 0 },
    height: {
      type: String,
      default: () => `${uni.getSystemInfoSync().windowHeight}px`
    }
  },
  data() {
    return {
      scrollTop: 0,
      status: 'loading',
      showEmpty: false,
      refresh: false
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
        this.refresh = true
      } else if (this.status === 'nomore' || !this.listApi) return

      this.status = 'loading'

      const res = await this.$api.get(this.listApi, listQuery).catch(() => {
        if (this.list.length === 0) {
          this.showEmpty = true
        }
      })

      if (!res) return

      const { paginator, data } = res
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
        endPage - currentPage === 0 || data.length === 0 ? 'nomore' : 'loadmore'
      //update data & interaction
      const list = type === 'refresh' ? data : this.list.concat(data)
      this.$emit('update:list', list)
      this.$emit('update:listQuery', listQuery)
      this.$emit('change', { list, listQuery })
      this.refresh = false
    }
  }
}
</script>

<style lang="scss">
.scroll-view {
  box-sizing: border-box;
}
.back-to-top {
  width: 80rpx;
  height: 80rpx;
  position: fixed;
  right: 50rpx;
  bottom: 80rpx;
  z-index: 999;
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
