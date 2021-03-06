<!-- https://ext.dcloud.net.cn/plugin?id=32 -->
<template>
	<view>
		<view v-for="(item, index) in list" :key="index" class="header">
			<u-avatar :src="item.avatar"></u-avatar>
			<view>{{ item.name }}</view>
		</view>
		<view style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20rpx;
      ">
			<c-pagination v-show="listQuery.totalCount > 0" :total="listQuery.totalCount" :pageSize="listQuery.limit" :current="listQuery.page"
			 @change="loadData"></c-pagination>
		</view>
	</view>
</template>

<script>
	export default {
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
				await this.$api.get('list', listQuery).then(res => {
					console.log(res)
					const {
						data
					} = res
					const {
						paginator
					} = res
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
