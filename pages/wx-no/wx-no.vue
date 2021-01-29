<template>
  <view class="container">
    <img :src="src" />
    <view class="text">请使用浏览器打开</view>
  </view>
</template>

<script>
import steps from './steps'
export default {
  data() {
    return {
      src: steps
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: #000;
}
img {
  padding-left: 5%;
  width: 95%;
}
.text {
  margin-top: 50rpx;
  font-size: 70rpx;
  font-weight: bold;
  text-align: center;
  color: #87de48;
}
</style>
