<template>
  <view>
    <u-navbar
      height="44"
      title="demo"
      :custom-back="backTo"
    ></u-navbar>
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
      pages: []
    }
  },
  onPullDownRefresh() {
    setTimeout(() => {
      uni.stopPullDownRefresh()
    }, 999)
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
    },
    backTo() {
      uni.switchTab({
        url: '/pages/home/home'
      })
      uni.showTabBar()
    }
  }
}
</script>

<style lang="scss">
@import '@/demo/styles/animation.css';
@import '@/demo/styles/rainbow.scss';

.u-cell {
  ::v-deep & :first-child {
    .u-iconfont {
      @include rainbow-font;
    }
  }
}
</style>
