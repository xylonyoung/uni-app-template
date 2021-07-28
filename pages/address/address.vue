<template>
  <view>
    <view v-for="(item, index) in 3" :key="index" >
      <view>
        <text>name</text>
        <text>phone</text>
      </view>
      <view>region</view>
      <view>details</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss">
</style>
