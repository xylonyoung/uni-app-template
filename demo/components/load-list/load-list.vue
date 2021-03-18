<template>
  <view>
    <scroll-view
      class="wrapper"
      :style="[scrollStyle]"
      scroll-y
      :scroll-top="scrollTop"
      @scroll="scroll"
      :lower-threshold="100"
      @scrolltolower="scrollToLower"
      scroll-with-animation
      scroll-anchoring
      refresher-enabled
      :refresher-triggered="refresh"
      @refresherrefresh="loadData('refresh')"
    >
      <slot :list="list" />

      <view v-if="showEmpty" style="height: 300rpx"><u-empty /></view>

      <u-loadmore v-else :status="status" style="padding: 20rpx" />
    </scroll-view>

    <view class="back-to-top" v-if="distanceOfTop > 300">
      <u-icon
        @click="backToTop"
        size="60"
        color="rgba(255,255,255)"
        name="arrow-upward"
      />
    </view>
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
    paddingTop: { type: String, default: '' },
    height: {
      type: String,
      default: () => `100vh`
    }
  },
  data() {
    return {
      scrollTop: 0,
      distanceOfTop: 0,
      status: 'loading',
      showEmpty: false,
      refresh: false
    }
  },
  computed: {
    scrollStyle() {
      return { height: this.height, 'padding-top': this.paddingTop }
    }
  },
  watch: {
    auto: {
      handler: function (val) {
        if (val && this.list.length === 0) this.loadData()
      },
      immediate: true
    },
  },
  methods: {
    backToTop() {
      this.setScrollTop()
      this.distanceOfTop = 0
    },

    scrollToLower() {
      this.loadData()
    },
    scroll(e) {
      this.distanceOfTop = e.detail.scrollTop
      this.$emit('scroll', e)
    },
    setScrollTop() {
      // scroll-top reaction need value change
      this.scrollTop = this.scrollTop === 0 ? 1 : 0
    },
    async loadData(type) {
      const listQuery = Object.assign({}, this.listQuery)

      if (type === 'refresh') {
        listQuery.page = 1
        this.setScrollTop()
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
.wrapper {
  box-sizing: border-box;
}
.back-to-top {
  width: 80rpx;
  height: 80rpx;
  position: fixed;
  right: 50rpx;
  bottom: 80rpx;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  opacity: 0.3;
  border-radius: 100%;
}
</style>
