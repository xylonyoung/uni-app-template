<template>
	<view class="index-container">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{ title }}</text>
		</view>
		<u-cell-group>
			<view v-for="(item, index) in pages" :key="index">
				<u-cell-item :icon="item.icon" icon-size="60" :title="item.title" class="animation-slide-bottom" :style="{ animationDelay: index * 0.3 + 's' }"
				 @click="navTo(item.title)"></u-cell-item>
			</view>
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
		onLoad() {
			let pages = []
			const files = require.context('../demo', false, /\.vue$/)
			files.keys().forEach(key => {
				pages = pages.concat(files(key).default)
			})
			this.pages = pages.map(e => {
				return {
					title: e.__file.match(/demo\/(\S*).vue/)[1],
					icon: this.iconList[Math.floor(Math.random() * this.iconList.length + 1) - 1]
						.name,
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
	@import '@/style/animation.css';
	@import '@/style/rainbow.scss';

	.u-cell {
		::v-deep .u-cell__left-icon-wrap {
			@include rainbow-font;
		}
	}

	.index-container {
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
