<template>
	<view class="page"><canvas canvas-id="qrcode" style="width: 215px;height: 215px;" /></view>
</template>

<script>
import uQRCode from '@/utils/uqrcode.js'
export default {
	data() {
		return {}
	},
	onLoad(options) {
		const url = `${location.origin}/pages/login/register?shareId=${options.id}`
		uQRCode.make({
			canvasId: 'qrcode',
			componentInstance: this,
			text: url,
			size: 215,
			margin: 10,
			backgroundColor: '#ffffff',
			foregroundColor: '#000000',
			fileType: 'jpg',
			correctLevel: uQRCode.defaults.correctLevel,
			success: res => {
				console.log(url)
			}
		})
	}
}
</script>

<style lang="scss">
@import '@/style/rainbow.scss';
.page {
	@include rainbow;
	width: 100%;
	height: calc(100vh - 88rpx);
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
