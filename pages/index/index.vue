<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
    </view>
    <u-cell-group>
      <template v-for="(item, index) in pages">
        <u-cell-item
          :key="index"
          :icon="item.icon"
          icon-size="60"
          :title="item.title"
          :style="`animation-delay = ${index} * 0.3`"
          @click="navTo(item.title)"
        ></u-cell-item>
      </template>
    </u-cell-group>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
      pages: [],
    }
  },
  onLoad() {
    let pages = []
    const files = require.context('../demo', false, /\.vue$/)
    files.keys().forEach(key => {
      pages = pages.concat(files(key).default)
    })
    const icons = [
      'level',
      'woman',
      'man',
      'arrow-left-double',
      'arrow-right-double',
      'chat',
      'chat-fill',
      'red-packet',
      'red-packet-fill',
      'order',
      'checkbox-mark',
      'arrow-up-fill',
      'arrow-down-fill',
      'backspace',
      'photo',
      'photo-fill',
      'lock',
      'lock-fill',
      'lock-open',
      'lock-opened-fill',
      'hourglass',
      'hourglass-half-fill',
      'home',
      'home-fill',
      'fingerprint',
      'cut',
      'star',
      'star-fill',
      'share',
      'share-fill',
      'volume-up',
      'volume-up-fill',
      'volume-off',
      'volume-off-fill',
      'trash',
      'trash-fill',
      'rewind-right',
      'rewind-right-fill',
      'rewind-left',
      'rewind-left-fill',
      'shopping-cart',
      'shopping-cart-fill',
      'question',
      'question-circle',
      'question-circle-fill',
      'plus',
      'plus-circle',
      'plus-circle-fill',
      'tags',
      'tags-fill',
      'pause',
      'pause-circle',
      'pause-circle-fill',
      'play-circle',
      'play-circle-fill',
      'map',
      'map-fill',
      'phone',
      'phone-fill',
      'list',
      'list-dot',
      'man-delete',
      'man-add',
      'man-add-fill',
      'person-delete-fill',
      'info',
      'info-circle',
      'info-circle-fill',
      'minus',
      'minus-circle',
      'minus-circle-fill',
      'mic',
      'mic-off',
      'grid',
      'grid-fill',
      'eye',
      'eye-fill',
      'eye-off',
      'file-text',
      'file-text-fill',
      'edit-pen',
      'edit-pen-fill',
      'email',
      'email-fill',
      'download',
      'checkmark',
      'checkmark-circle',
      'checkmark-circle-fill',
      'clock',
      'clock-fill',
      'close',
      'close-circle',
      'close-circle-fill',
      'calendar',
      'calendar-fill',
      'car',
      'car-fill',
      'bell',
      'bell-fill',
      'bookmark',
      'bookmark-fill',
      'attach',
      'play-right',
      'play-right-fill',
      'play-left',
      'play-left-fill',
      'error',
      'error-circle',
      'error-circle-fill',
      'wifi',
      'wifi-off',
      'skip-back-left',
      'skip-forward-right',
      'search',
      'setting',
      'setting-fill',
      'volume',
      'volume-fill',
      'more-dot-fill',
      'more-circle',
      'more-circle-fill',
      'bag',
      'bag-fill',
      'arrow-upward',
      'arrow-downward',
      'arrow-leftward',
      'arrow-rightward',
      'arrow-up',
      'arrow-down',
      'arrow-left',
      'arrow-right',
      'rmb',
      'rmb-circle',
      'rmb-circle-fill',
      'thumb-up',
      'thumb-up-fill',
      'thumb-down',
      'thumb-down-fill',
      'coupon',
      'coupon-fill',
      'kefu-ermai',
      'server-fill',
      'server-man',
      'scan',
      'warning',
      'warning-fill',
      'google',
      'google-circle-fill',
      'chrome-circle-fill',
      'ie',
      'IE-circle-fill',
      'github-circle-fill',
      'android-fill',
      'android-circle-fill',
      'apple-fill',
      'camera',
      'camera-fill',
      'pushpin',
      'pushpin-fill',
      'minus-square-fill',
      'plus-square-fill',
      'heart',
      'heart-fill',
      'reload',
      'account',
      'account-fill',
      'minus-people-fill',
      'plus-people-fill',
      'integral',
      'integral-fill',
      'zhihu',
      'zhihu-circle-fill',
      'gift',
      'gift-fill',
      'zhifubao',
      'zhifubao-circle-fill',
      'weixin-fill',
      'weixin-circle-fill',
      'twitter',
      'twitter-circle-fill',
      'taobao',
      'taobao-circle-fill',
      'weibo',
      'weibo-circle-fill',
      'qq-fill',
      'qq-circle-fill',
      'moments',
      'moments-circel-fill',
      'qzone',
      'qzone-circle-fill',
      'facebook',
      'facebook-circle-fill',
      'baidu',
      'baidu-circle-fill',
      'zhuanfa',
    ]
    this.pages = pages.map(e => {
      return {
        title: e.__file.match(/(?<=demo\/).*?(?=.vue)/)[0],
        icon: icons[Math.floor(Math.random() * icons.length + 1) - 1],
      }
    })
  },
  methods: {
    navTo(link) {
      uni.navigateTo({
        url: `/pages/demo/${link}`,
      })
    },
  },
}
</script>

<style lang="scss">
@import '@/style/rainbow.scss';
.u-cell {
  /deep/ & :first-child {
    .u-iconfont {
      @include rainbow-font;
    }
  }
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
