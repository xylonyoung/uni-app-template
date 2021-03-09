<template>
  <view>
    <u-navbar height="44" title="课程分类" :custom-back="backTo"></u-navbar>

    <view style="padding: 20rpx">
      <u-search placeholder="课程" shape="square" v-model="keyword"></u-search>
    </view>

    <c-left-tabs
      v-slot="{ list }"
      :tabs="tabs"
      :tab-index.sync="tabIndex"
      ref="leftTabs"
      height-fix="52"
    >
      <view class="cover">
        <u-image
          height="100%"
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1552566103,2701508936&fm=26&gp=0.jpg"
        ></u-image>
      </view>
      <view class="items">
        <view v-for="(item, index) in list" :key="index">
          <u-image
            height="150rpx"
            mode="aspectFit"
            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1552566103,2701508936&fm=26&gp=0.jpg"
          ></u-image>
          <view class="title">
            {{ item.name }}
          </view>
        </view>
      </view>
    </c-left-tabs>
  </view>
</template>
<script>
export default {
  data() {
    return {
      keyword: '',
      tabIndex: 0,
      tabs: [
        { name: '测试用用' },
        { name: '测试用用测试用用测试用用' },
        { name: '测试用用' },
        { name: '测试用用' },
        { name: '测试用用' },
        { name: '测试用用' },
        { name: '测试用用' },
        { name: '测试用用' },
        { name: '测试用用' },
        { name: '测试用用' },
        { name: '测试用用' },
        { name: '测试用用' },
        { name: '测试用用' },
        { name: '测试用用' },
        { name: '测试用用' }
      ],
      height: '100%'
    }
  },

  onPullDownRefresh() {
    this.$refs.leftTabs.onRefresh()
  },
  onNavigationBarButtonTap() {
    uni.switchTab({
      url: '/pages/home/home'
    })
    uni.showTabBar()
  },
  onLoad() {
    this.height = `${uni.getSystemInfoSync().windowHeight - 52}px`
  },
  onShow() {
    uni.hideTabBar()
    console.log(uni.getSystemInfoSync(), '00000000', this.height)
  },
  methods: {
    backTo() {
      uni.switchTab({
        url: '/pages/home/home'
      })
      uni.showTabBar()
    }
  }
}
</script>
<style lang='scss' scoped>
.left-tabs {
  .cover {
    width: 100%;
    height: 300rpx;
    padding: 20rpx;
  }
  .items {
    width: 100%;
    padding: 20rpx;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20rpx;
    .title {
      margin-top: 10rpx;
    }
  }
}
</style>