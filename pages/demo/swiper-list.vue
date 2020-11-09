<template>
	<view class="swiper-list">
		<u-tabs-swiper
			class="swiper-tabs"
			ref="uTabs"
			:list="tabs"
			:current="current"
			@change="tabsChange"
		></u-tabs-swiper>
		<swiper
			class="swiper-box"
			:style="{ height: height }"
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
		>
			<swiper-item class="swiper-item" v-for="(page, index) in tabs" :key="index">
				<load-list
					:list-api="listApi"
					:list.sync="list"
					:list-query.sync="listQuery"
					v-if="showOrNot(index)"
					:ref="'loadList' + index"
				>
					<u-avatar :src="item.avatar"></u-avatar>
					<view>{{ item.name }}</view>
					<view>{{ index }}</view>
				</load-list>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import mixin from '@/components/load-list/load-list.js'
import loadList from '@/components/load-list'
export default {
	mixins: [mixin],
	components: { loadList },
	computed: {
		showOrNot() {
			return function(index) {
				return Math.abs(index - this.swiperCurrent) < 2
			}
		}
	},
	props: {
		tabs: { type: Array, default: _ => [] }
	},
	data() {
		return {
			list: [],
			listApi: 'loadList.get',
			listQuery: {
				page: 1,
				limit: 10,
				'@order': 'createdTime | desc'
			},
			height: '400px', // 需要固定swiper的高度
			// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0 // swiper组件的current值，表示当前那个swiper-item是活动的
		}
	},
	created() {
		this.height = uni.getSystemInfoSync().windowHeight + 'px'
		console.log(uni.getSystemInfoSync().windowHeight)
	},
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
.swiper-list {
	display: flex;
	flex-direction: column;
	width: 100%;
}
.swiper-tabs {
	z-index: 999;
	position: fixed;
	top: var(--window-top);
	left: 0;
	width: 100%;
}
.swiper-box {
	flex: 1;
	margin-top: 80rpx;
}
.swiper-item {
	height: 100%;
}
</style>
