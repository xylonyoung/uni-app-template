<template>
  <view class="container">
    <iframe :src="src" frameborder="0" scrolling="no"></iframe>
    <view class="text">请使用微信打开</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: 'https://weixin.qq.com/'
    }
  }
}
</script>

<style lang="scss" scoped>
iframe {
  width: 100%;
  height: 1000rpx;
}
.text {
  margin-top: 50rpx;
  font-size: 70rpx;
  font-weight: bold;
  text-align: center;
  color:#87de48;
}
</style>
