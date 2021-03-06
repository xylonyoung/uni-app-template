<template>
  <view class="container">
    <u-cell-group>
      <u-cell-item
        v-for="(item, index) in pages"
        :key="index"
        :icon="item.icon"
        icon-size="60"
        :title="item.title"
        class="animation-slide-bottom"
        :style="{ animationDelay: index * 0.5 + 's' }"
        @click="navTo(item.path)"
      ></u-cell-item>
    </u-cell-group>
  </view>
</template>

<script>
import { iconList } from '@/demo/icon'
export default {
  data() {
    return {
      title: 'Hello',
      pages: []
    }
  },
  onPullDownRefresh() {
    setTimeout(() => {
      uni.stopPullDownRefresh()
    }, 999)
  },
  onNavigationBarButtonTap() {
    uni.switchTab({
      url: '/pages/home/home'
    })
    uni.showTabBar()
  },
  onShow() {
    uni.hideTabBar()
  },
  onLoad() {
    this.pages = this.pagesProcess()
  },
  methods: {
    pagesProcess() {
      const result = []
      const files = require.context('./', false, /\.vue$/)
      const pages = files.keys().map(key => files(key).default)
      pages.forEach(e => {
        const title = e.__file.match(/(?<=demo\/pages\/).*?(?=\.vue)/)[0]
        if (title === 'demo') return
        result.push({
          title,
          icon: getIcon(),
          path: title
        })
      })
      return result

      function getIcon() {
        return iconList[Math.floor(Math.random() * iconList.length + 1) - 1]
          .name
      }
    },
    navTo(path) {
      uni.navigateTo({
        url: `/demo/pages/${path}`
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/animation.css';
@import '@/styles/rainbow.scss';

.u-cell {
  ::v-deep & :first-child {
    .u-iconfont {
      @include rainbow-font;
    }
  }
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
