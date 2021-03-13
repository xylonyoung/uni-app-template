<template>
  <view class="page">
    <canvas canvas-id="qrcode" style="width: 250px; height: 250px" />
  </view>
</template>

<script>
import uQRCode from '@/demo/utils/uqrcode.js'
export default {
  data() {
    return {}
  },
  onLoad(options) {
    uQRCode
      .make({
        canvasId: 'qrcode',
        componentInstance: this,
        text: 'https://www.bing.com',
        size: 250,
        margin: 10,
        backgroundColor: '#ffffff',
        foregroundColor: '#000000',
        fileType: 'jpg',
        errorCorrectLevel: uQRCode.errorCorrectLevel.H
      })
      .then(res => {
        console.log(res)
      })
  }
}
</script>

<style lang="scss" scoped>
@import '@/demo/styles/rainbow.scss';

.page {
  @include rainbow;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
