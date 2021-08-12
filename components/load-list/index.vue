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
      @refresherrefresh="refreshData"
    >
      <slot :list="value" />

      <view v-if="empty" style="height: 300rpx">
        <u-empty :mode="emptyMode" />
      </view>

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
    value: { type: Array, default: () => [] },
    api: { type: String, default: '' },
    query: { type: Object, default: () => ({}) },
    load: { type: Boolean, default: true },
    height: { type: String, default: () => `100vh` },
    emptyMode: { type: String, default: 'data' },
    format: { type: Function, default: undefined }
  },
  data() {
    return {
      scrollTop: 0,
      distanceOfTop: 0,
      status: 'loading',
      empty: false,
      refresh: false,
      defaultQuery: { page: 1, limit: 10 }
    }
  },
  computed: {
    scrollStyle() {
      return { height: this.height }
    }
  },
  watch: {
    load: {
      handler(val) {
        if (val && !this.empty && this.value.length === 0) this.loadData()
      },
      immediate: true
    }
  },
  created() {
    this.$emit('update:query', { ...this.defaultQuery, ...this.query })
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
    refreshData() {
      if (this.refresh) return
      this.refresh = true
      this.reloadData()
    },
    reloadData() {
      this.backToTop()
      this.$emit('update:query', { ...this.query, page: 1 })
      this.$emit('input', [])
      this.status = 'loading'
      this.empty = false
      this.$nextTick(() => {
        this.loadData().then(() => {
          this.refresh = false
        })
      })
    },
    async loadData() {
      if (this.status === 'nomore') return

      const query = { ...this.query }
      const res = await this.$request.get(this.api, query)
      let { paginator, data } = res

      if (!data || data?.length === 0) {
        this.empty = true
      } else {
        query.page = paginator.next
        if (this.format) {
          data = this.format(data)
        }

        this.status =
          paginator.current === paginator.last ? 'nomore' : 'loadmore'
        this.$emit('input', [...this.value, ...data])
        this.$emit('update:query', query)
      }

      this.$emit('complete')
    }
  }
}
</script>

<style lang="scss" scoped>
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
