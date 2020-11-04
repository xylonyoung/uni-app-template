<template>
	<view class="content">
		<!-- slot page -->
		<slot></slot>
		<!-- data is empty -->
		<u-empty v-if="showEmpty"></u-empty>
		<!-- load more data -->
		<u-loadmore :status="status" v-if="!showEmpty" margin-top="20" margin-bottom="20" />
		<!-- back to top -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
// pages.json "style" need to setup "enablePullDownRefresh": true
export default {
	props: {
		list: { type: Array, default: [] },
		listApi: { type: String, default: '' },
		listQuery: {
			type: Object,
			default: () => ({ page: 1, limit: 10 })
		}
	},
	data() {
		return {
			scrollTop: 0,
			status: 'loading',
			showEmpty: false
		}
	},

	created() {
		this.loadData()
	},
	methods: {
		async loadData(type) {
			//init status
			this.status = 'loading'
			this.showEmpty = false

			//init query
			let listQuery = this.listQuery
			if (type === 'refresh') {
				listQuery.page = 1
				this.$emit('update:list', [])
			}
			//load data
			let list = [],
				currentPage,
				endPage,
				listApi = this.listApi.split('.')
			await this.$api[listApi[0]][listApi[1]](listQuery).then(res => {
				console.log(res)
				const { data } = res
				const { paginator } = res
				list = data
				if (paginator) {
					listQuery.page = paginator.next
					currentPage = paginator.current
					endPage = paginator.endPage
				} else {
					this.showEmpty = true
				}
			})
			//have next page or not?
			this.status = endPage - currentPage === 0 || list.length === 0 ? 'nomore' : 'loadmore'
			//update data
			list = this.list.concat(list)
			this.$emit('update:list', list)
			this.$emit('update:listQuery', listQuery)

			uni.stopPullDownRefresh()
		}
	}
}
</script>

<style lang="scss"></style>
