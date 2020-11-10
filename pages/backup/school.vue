<template>
	<view class="container">
		<u-tabs-swiper ref="uTabs" :list="tabList" :current="current" @change="tabsChange"></u-tabs-swiper>
		<swiper
			class="swiper-box"
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
		>
			<swiper-item class="swiper-item" v-for="(page, index) in tabList" :key="index">
				<school-swiper :page="page" v-if="showOrNot(index)"></school-swiper>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import SchoolSwiper from './school-swiper.vue'
export default {
	components: { SchoolSwiper },
	computed: {
		showOrNot() {
			return function(index) {
				return Math.abs(index - this.swiperCurrent) < 2
			}
		}
	},
	data() {
		return {
			tabList: [
				{
					name: '推荐'
				},
				{
					name: '备孕'
				},
				{
					name: '孕初期'
				},
				{
					name: '孕中期'
				},
				{
					name: '孕晚期'
				},
				{
					name: '产褥期'
				},
				{
					name: '100天'
				}
			],
			// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0 // swiper组件的current值，表示当前那个swiper-item是活动的
		}
	},
	onLoad() {},
	methods: {
		// tabs通知swiper切换
		tabsChange(index) {
			this.swiperCurrent = index
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx
			this.$refs.uTabs.setDx(dx)
		},
		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current
			this.$refs.uTabs.setFinishCurrent(current)
			this.swiperCurrent = current
			this.current = current
		}
	}
}
</script>

<style lang="scss">
.container {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>
