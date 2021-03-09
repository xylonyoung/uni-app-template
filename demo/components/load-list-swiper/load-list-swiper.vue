<template>
	<view>
		<u-tabs class="top-tabs" ref="uTabs" :list="tabs" :current="tabIndex" @change="tabsChange"></u-tabs>
		<swiper :style="{ height: height }" :current="tabIndex" @change="swiperChange">
			<swiper-item v-for="(tab, curIndex) in tabs" :key="curIndex">
				<c-load-list :list-api="tab.listApi" :list-query.sync="tab.listQuery" v-slot="{ list }" ref="loadList"
					:auto="curIndex === tabIndex" padding-top="80">
					<slot :list="list"></slot>
				</c-load-list>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default {
		props: {
			tabs: {
				type: Array,
				default: () => []
			},
			tabIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				height: '399px'
			}
		},
		created() {
			this.height = uni.getSystemInfoSync().windowHeight + 'px'
		},
		methods: {
			onRefresh() {
				this.$refs.loadList[this.tabIndex].loadData('refresh')
			},
			tabsChange(index) {
				if (index === this.currentIndex) return
				this.$emit('update:tabIndex', index)
			},
			swiperChange(e) {
				this.$emit('update:tabIndex', e.detail.current)
			}
		}
	}
</script>
<style lang="scss">
	.top-tabs {
		position: fixed;
		width: 100%;
		top: var(--window-top);
		left: 0;
		z-index: 999;
	}
</style>
