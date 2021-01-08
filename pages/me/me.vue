<template>
	<view class="me-container">
		<template v-for="(item, index) in pages">
			<u-cell-item :key="index" :icon="item.icon" icon-size="60" :title="item.title" class="animation-slide-bottom" :style="{ animationDelay: index * 0.5 + 's' }"
			 @click="navTo(item.link)"></u-cell-item>
		</template>
		</u-cell-group>
	</view>
</template>

<script>
	import {
		iconList
	} from '@/temp/icon'
	export default {
		data() {
			return {
				title: 'Hello',
				pages: [],
				iconList,
			}
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
			this.pages = [{
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
			]
		},
		methods: {
			getIcon() {
				return this.iconList[Math.floor(Math.random() * this.iconList.length + 1) - 1].name
			},
			navTo(link) {
				uni.navigateTo({
					url: `/pages/${link}`,
				})
			},
		},
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

	.me-container {
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
