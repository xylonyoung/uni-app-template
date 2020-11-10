<template>
	<scroll-view
		scroll-y
		style="height: 100%; width: 100%"
		@scroll="onScroll"
		@scrolltolower="loadData"
		:scroll-into-view="anchorTop"
	>
		<view class="header flex" id="anchorTop">
			<view class="avatar">
				<u-avatar :src="require('@/static/logo.png')" size="100"></u-avatar>
				<view class="">LV.初级育儿师</view>
			</view>
			<view class="specification flex">
				<u-avatar :src="require('@/static/logo.png')" size="50"></u-avatar>
				<text class="text">育儿等级说明</text>
			</view>
			<view class="content">
				系统会根据您以及您宝宝所在的阶段推荐适合的课程给您，为了可以推荐更加合适的育儿资料，请完善我的
				<text style="color: blue" @click="navTo('register/register')">宝宝资料</text>
			</view>
		</view>

		<view class="center-img">
			<u-image width="100%" height="200rpx" :src="getImage(schoolImg)"></u-image>
		</view>

		<view
			class="article flex"
			v-for="(item, index) in list"
			:key="index"
			@click="navTo('school/article?id=', item.id)"
		>
			<u-image width="100rpx" height="100rpx" :src="getImage(item.cover)"></u-image>
			<view class="detail">
				<view class="">{{ item.title }}</view>
				<view class="content">{{ removeStyle(item.content) }}</view>
				<view class="flex bottom">
					<view class="thumbs flex">
						<view>
							<u-icon name="eye-fill" size="30"></u-icon>
							999+
						</view>
						<view>
							<u-icon name="thumb-up-fill" size="30"></u-icon>
							999+
						</view>
					</view>
					<view>{{ parseTime(item.modifiedTime) }}</view>
				</view>
			</view>
		</view>
		<u-empty v-if="showEmpty" margin-top="30"></u-empty>
		<u-loadmore :status="status" v-else margin-top="20" margin-bottom="20" />
		<u-back-top :scroll-top="scrollTop" @click.native="anchorTop = 'anchorTop'"></u-back-top>
	</scroll-view>
</template>

<script>
import { getImage } from '@/utils/get-image.js'
import { parseTime } from '@/utils/parse-time.js'
export default {
	props: {
		page: { type: Object, default: _ => {} },
		listQuery: {
			type: Object,
			default: _ => ({ page: 1, limit: 5 })
		}
	},
	data() {
		return {
			scrollTop: 0,
			anchorTop: '',
			status: 'loading',
			showEmpty: false,
			list: [],
			schoolImg: ''
		}
	},
	created() {
		this.$api.albums.getTitle('SCHOOL').then(res => {
			this.schoolImg = this.$getValue(res, 'data.pictures.0')
		})

		this.loadData()
	},
	methods: {
		getImage,
		parseTime,
		onScroll(e) {
			const { scrollTop } = e.detail
			this.scrollTop = scrollTop
			this.anchorTop = ''
		},
		navTo(link, id) {
			let url = '/pages/' + link
			if (id) {
				url += id
			}
			uni.navigateTo({ url })
		},
		removeStyle(data) {
			return data.replace(/<\/?.+?>/g, '').replace(/ /g, '')
		},
		async loadData(type) {
			let currentPage,
				endPage,
				list = [],
				listQuery = this.listQuery

			if (type === 'refresh') {
				listQuery.page = 1
				this.showEmpty = false
				this.status = 'loading'
			}

			if (this.status === 'nomore') {
				return
			} else {
				this.status = 'loading'
			}
			await this.$api.content.get(listQuery).then(res => {
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
			this.list = type === 'refresh' ? list : [...this.list, ...list]
		}
	}
}
</script>

<style lang="scss">
.flex {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.header {
	position: relative;
	padding: 20rpx;
	text-align: center;
	.avatar {
		flex: 2;
		margin-right: 20rpx;
	}
	.content {
		flex: 4;
		margin-top: 50rpx;
		font-size: 22rpx;
		color: $theme-gray;
	}
	.specification {
		position: absolute;
		height: 50rpx;
		top: 20rpx;
		right: 0rpx;
		font-size: 20rpx;
		u-avatar {
			position: absolute;
			height: 50rpx;
		}
		.text {
			height: 100%;
			line-height: 50rpx;
			margin-left: 25rpx;
			padding: 0 10rpx 0 35rpx;
			background-color: #ff9900;
			color: #fff;
		}
	}
}
.center-img {
	margin: 20rpx;
	border-radius: 20rpx;
	overflow: hidden;
}
.article {
	padding: 20rpx;
	background-color: #fff;
	border-bottom: 5rpx solid $theme-border;
	.detail {
		width: 100%;
		margin-left: 20rpx;
		.content {
			max-height: 68rpx;
			margin: 20rpx;
			color: $theme-gray;
			font-size: 24rpx;
			overflow: hidden;
		}
		.bottom {
			color: $theme-gray;
			justify-content: space-between;
			font-size: 24rpx;
			.thumbs {
				width: 250rpx;
				justify-content: space-between;
			}
		}
	}
}
</style>
