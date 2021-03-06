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
        @click="navTo(item.link)"
      ></u-cell-item>
    </u-cell-group>
    <u-tabbar v-model="current" :list="list" :mid-button="true"></u-tabbar>
  </view>
</template>

<script>
import { iconList } from '@/temp/icon'
export default {
  data() {
    return {
      title: 'Hello',
      pages: [],
      iconList,
      list: [
        {
          iconPath: 'home',
          selectedIconPath: 'home-fill',
          text: '首页',
          count: 2,
          isDot: true,
          customIcon: false
        },
        {
          iconPath: 'photo',
          selectedIconPath: 'photo-fill',
          text: '放映厅',
          customIcon: false
        },
        {
          iconPath: 'https://cdn.uviewui.com/uview/common/min_button.png',
          selectedIconPath:
            'https://cdn.uviewui.com/uview/common/min_button_select.png',
          text: '发布',
          midButton: true,
          customIcon: false
        },
        {
          iconPath: 'play-right',
          selectedIconPath: 'play-right-fill',
          text: '直播',
          customIcon: false
        },
        {
          iconPath: 'account',
          selectedIconPath: 'account-fill',
          text: '我的',
          count: 23,
          isDot: false,
          customIcon: false
        }
      ],
      current: 0
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
      const files = require.context('../demo', false, /\.vue$/)
      const pages = files.keys().map(key => files(key).default)
      pages.forEach(e => {
        result.push({
          title: e.__file.match(/demo\/(\S*).vue/)[1],
          icon: this.iconList[
            Math.floor(Math.random() * this.iconList.length + 1) - 1
          ].name
        })
      })
      return result.concat(
        {
          title: '登录',
          icon: this.getIcon(),
          link: 'login/login'
        },
        {
          title: '分享',
          icon: this.getIcon(),
          link: 'share/share'
        },
        {
          title: '微信打开',
          icon: this.getIcon(),
          link: 'wx-only/wx-only'
        },
        {
          title: '浏览器打开',
          icon: this.getIcon(),
          link: 'wx-no/wx-no'
        }
      )
    },
    getIcon() {
      return this.iconList[
        Math.floor(Math.random() * this.iconList.length + 1) - 1
      ].name
    },
    navTo(link) {
      uni.navigateTo({
        url: `/pages/${link}`
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
