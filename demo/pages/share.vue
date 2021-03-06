<template>
  <view class="page">
    <u-image width="500rpx" height="500rpx" :src="image"></u-image>
  </view>
</template>

<script>
import QRCode from 'qrcode'
export default {
  data() {
    return { image: '' }
  },
  onLoad(options) {
    const url = `${location.origin}/pages/login/register?shareId=${options.id}`
    QRCode.toDataURL(url, { errorCorrectionLevel: 'H' })
      .then(res => {
        this.image = res
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/rainbow.scss';

.page {
  @include rainbow;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
