<template>
  <view class="navbar-container">
    <u-navbar
      :background="{ backgroundColor: 'rgba(0,0,0,0)' }"
      :border-bottom="false"
      v-if="navbarHide"
    ></u-navbar>
    <template v-else>
      <u-navbar :title="title"></u-navbar>
      <slot />
    </template>
  </view>
</template>
<script>
export default {
  props: {
    title: { type: String, default: '' },
    scrollTop: { type: Number, default: 0 }
  },
  data() {
    return {}
  },
  computed: {
    navbarHide() {
      return this.scrollTop < 10
    }
  },
  methods: {}
}
</script>
<style lang='scss'>
.navbar-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
}
</style>