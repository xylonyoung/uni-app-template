<template>
  <view class="navbar-container">
    <u-navbar
      v-if="navbarHide"
      :background="{ background: 'rgba(0,0,0,0)' }"
      :border-bottom="false"
    ></u-navbar>
    <template v-else>
      <u-navbar :title="title"></u-navbar>
      <u-tabs
        active-color="#ff6900"
        :list="list"
        :is-scroll="false"
        :current="tabIndex"
        @change="goTo"
      ></u-tabs>
    </template>
  </view>
</template>
<script>
export default {
  props: {
    title: { type: String, default: '' },
    scrollTop: { type: Number, default: 0 },
    list: { type: Array, default: () => [] },
    current: { type: Number, default: null },
    container: { type: String, default: null }
  },
  data() {
    return { tabIndex: null, anchorList: [] }
  },
  created() {
    this.tabIndex = this.current
    this.list.forEach((e) => {
      uni
        .createSelectorQuery()
        .select(e.anchor)
        .boundingClientRect((data) => {
          this.anchorList.push(data.top)
        })
        .exec()
    })
  },
  computed: {
    navbarHide() {
      return this.scrollTop < 100
    }
  },
  watch: {
    scrollTop(val) {
      for (let i = this.anchorList.length - 1; i >= 0; i--) {
        if (val >= this.anchorList[i] - this.getOffset(i)) {
          this.tabIndex = i
          break
        }
      }
    }
  },
  methods: {
    getOffset(index) {
      return index === 0 ? 0 : 115
    },
    goTo(index) {
      this.tabIndex = index
      for (let i = 0; i < this.list.length; i++) {
        if (i === index) {
          uni
            .createSelectorQuery()
            .select(this.list[i].anchor)
            .boundingClientRect((data) => {
              uni
                .createSelectorQuery()
                .select(this.container)
                .boundingClientRect((res) => {
                  // 最外层盒子节点类或者 id
                  const distance = data.top - res.top - this.getOffset(index)
                  uni.pageScrollTo({
                    duration: 333,
                    scrollTop: distance
                  })
                })
                .exec()
            })
            .exec()
          break
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.navbar-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
}
</style>