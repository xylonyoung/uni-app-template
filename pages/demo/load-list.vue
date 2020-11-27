<template>
	<c-load-list :list-api="listApi" v-slot="{ list }" :list-query.sync="listQuery" ref="loadList">
		<view v-for="(item, index) in list" :key="index" class="header">
			<u-avatar :src="item.avatar"></u-avatar>
			<view>{{ item.name }}</view>
			<view>{{ index }}</view>
		</view>
	</c-load-list>
</template>
<script>
	import mixin from '@/components/load-list/load-list.js'
	export default {
		mixins: [mixin],
		data() {
			return {
				listApi: 'loadList.get',
				listQuery: {
					page: 1,
					limit: 10,
					'@order': 'createdTime | desc'
				}
			}
		}
	}
</script>
<style lang="scss">
	.header {
		text-align: center;
		padding: 20rpx;
		border-bottom: 1rpx solid #eee;
	}
</style>
