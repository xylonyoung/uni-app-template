<template>
	<view>
		<view v-for="(item, index) in list" :key="index" class="header">
			<u-avatar :src="item.avatar"></u-avatar>
			<view>{{ item.name }}</view>
		</view>
		<view
			style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20rpx;
      "
		>
			<uni-pagination
				v-show="listQuery.totalCount > 0"
				:total="listQuery.totalCount"
				:pageSize="listQuery.limit"
				:current="listQuery.page"
				@change="loadData"
			></uni-pagination>
		</view>
	</view>
</template>

<script>
import uniPagination from '@/components/uni-pagination'
export default {
	components: { uniPagination },
	data() {
		return {
			list: [],
			listQuery: {
				page: 1,
				limit: 10,
				totalCount: 0,
				'@order': 'modifiedTime|desc'
			}
		}
	},
	onShow() {
		this.loadData()
	},
	methods: {
		async loadData() {
			let listQuery = this.listQuery
			//load data
			await this.$api.pagination.get(listQuery).then(res => {
				console.log(res)
				const { data } = res
				const { paginator } = res
				if (data) {
					this.list = data
				}
				if (paginator) {
					listQuery.page = paginator.current
					listQuery.totalCount = paginator.totalCount
				} else {
					this.showEmpty = true
				}
			})
			this.listQuery = listQuery
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
