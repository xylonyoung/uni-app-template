<template>
	<view class="content">
		<!-- 插入页面 -->
		<slot></slot>
		<!-- 没数据 -->
		<u-empty v-if="list.length === 0"></u-empty>
		<!-- 加载更多 -->
		<u-loadmore :status="status" v-if="!showEmpty" margin-top="20" margin-bottom="20" />
		<!-- 返回顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
import * as api from '@/api/api.js'
export default {
	props: {
		list: { type: Array, default: [] },
		listApi: { type: String, default: '' },
		listQuery: {
			type: Object,
			default: () => ({ page: 1, limit: 10, '@order': 'id | desc' })
		}
	},
	data() {
		return {
			scrollTop: 0,
			status: 'loading',
			showEmpty: false
		}
	},
	//监听页面滚动
	onPageScroll(e) {
		this.scrollTop = e.scrollTop
	},

	//加载更多
	onReachBottom() {
		if (this.status === 'loadmore') {
			this.loadData()
		}
	},
	created() {
		this.loadData()
	},
	methods: {
		async loadData(type) {
			let list = [],
				currentPage,
				endPage
			let listQuery = this.listQuery
			this.status = 'loading'
			this.showEmpty = false
			if (type === 'refresh') {
				listQuery.page = 1
				this.$emit('update:list', [])
			}
			await api[this.listApi](listQuery).then(res => {
				console.log(res)
				const { data } = res
				const { paginator } = res
				if (data) {
					list = data
				}
				if (paginator) {
					listQuery.page = paginator.next
					currentPage = paginator.current
					endPage = paginator.endPage
				} else {
					this.showEmpty = true
				}
			})
			//判断是否还有下一页
			this.status = endPage - currentPage === 0 || list.length === 0 ? 'nomore' : 'loadmore'
			//更新数据
			list = this.list.concat(list)
			this.$emit('update:list', list)
			this.$emit('update:listQuery', listQuery)
			//停止下拉刷新
			uni.stopPullDownRefresh()
		}
	}
}
</script>

<style lang="scss"></style>
