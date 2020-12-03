<template>
	<view>
		<u-tabs class="top-tabs" ref="uTabs" :list="tabs" :current="tabIndex" @change="tabsChange"></u-tabs>
		<u-gap height="80"></u-gap>
		<view v-for="(tab,curIndex) in tabs" :key="curIndex">
			<c-load-list :list-api="tab.listApi" v-slot="{ list }" :list-query.sync="tab.listQuery" ref="loadList" v-show="curIndex === tabIndex">
				<view v-for="(item, index) in list" :key="index" class="header">
					<u-avatar :src="item.avatar"></u-avatar>
					<view>{{ item.name }}</view>
					<view>{{ index }} {{tabIndex}}</view>
				</view>
			</c-load-list>
		</view>
	</view>
</template>
<script>
	import mixin from '@/components/load-list/load-list.js'
	export default {
		mixins: [mixin],
		data() {
			return {
				tabs: [{
						name: '全部'
					},
					{
						name: '奶粉'
					},
					{
						name: '面膜'
					},
					{
						name: '图书'
					},
				],
				tabIndex: 0
			}
		},
		onLoad() {
			this.tabs.forEach(e => {
				e.listApi = 'loadList.get'
				e.listQuery = {
					page: 1,
					limit: 10,
					'@order': 'createdTime | desc'
				}
			})
		},
		methods: {
			tabsChange(index) {
				this.tabIndex = index
				this.$nextTick(_ => {
					uni.pageScrollTo({
						scrollTop: this.$refs.loadList[this.tabIndex].scrollTop,
						duration: 0,
					})
				})
			},
		}
	}
</script>
<style lang="scss">
	.top-tabs {
		z-index: 999;
		position: fixed;
		top: var(--window-top);
		left: 0;
		width: 100%;
	}

	.header {
		text-align: center;
		padding: 20rpx;
		border-bottom: 1rpx solid #eee;
	}
</style>
