<template>
  <view>
    <scroll-view
      class="swiper-wrapper"
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

      <view v-if="empty" style="height: 300rpx"><u-empty /></view>

      <u-loadmore v-else :status="status" style="padding: 20rpx" />
    </scroll-view>

    <view class="back-to-top" v-if="distanceOfTop > 300">
      <u-icon @click="backToTop" size="60" color="#fff" name="arrow-upward" />
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
      default: () => ({ page: 1, limit: 10 }),
    },
    reload: { type: Boolean, default: false },
    auto: { type: Boolean, default: true },
    height: { type: String, default: () => `100vh` },
  },
  data() {
    return {
      scrollTop: 0,
      distanceOfTop: 0,
      status: 'loading',
      empty: false,
      refresh: false,
    }
  },
  computed: {
    scrollStyle() {
      return { height: this.height }
    },
  },
  watch: {
    reload(val) {
      if (val) this.backToTop()
      this.refresh = val
    },
    auto: {
      handler(val) {
        if (val && !this.empty && this.list.length === 0) this.loadData()
      },
      immediate: true,
    },
  },
  methods: {
    backToTop() {
      // scroll-top reaction need value change
      this.scrollTop = this.scrollTop === 0 ? 1 : 0
      this.distanceOfTop = 0
    },
    scrollToLower() {
      this.loadData()
    },
    scroll(e) {
      this.$u.debounce(() => {
        this.distanceOfTop = e.detail.scrollTop
        this.$emit('scroll', e)
      }, 99)
    },
    resetReload() {
      this.$emit('update:reload', false)
    },
    async loadData(refresh) {
      const listQuery = { ...this.listQuery }

      if (refresh) {
        listQuery.page = 1
        this.empty = false
        this.refresh = true
        this.$emit('update:list', [])
      } else if (this.status === 'nomore') return

      this.status = 'loading'

      const res = await this.$api.get(this.listApi, listQuery)

      if (!res) {
        this.empty = true
        this.resetReload()
        return
      }

      const { paginator, data } = res
      const list = refresh ? data : [...this.list, ...data]

      if (res.data.length === 0) {
        this.empty = true
      } else {
        listQuery.page = paginator.next
        listQuery.totalCount = paginator.totalCount
        this.status =
          paginator.current === paginator.last ? 'nomore' : 'loadmore'
      }

      this.$emit('update:list', list)
      this.$emit('update:listQuery', listQuery)
      this.$emit('change', { list, listQuery })
      this.resetReload()
    },
  },
}
</script>

<style lang="scss">
.swiper-wrapper {
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
