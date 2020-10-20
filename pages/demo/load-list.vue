<template>
	<load-list :list-api="listApi" :list.sync="list" :list-query.sync="listQuery" ref="loadList">
		<view v-for="(item, index) in list" :key="index">
			<u-avatar :src="item.avatar"></u-avatar>
			<view>{{ item.name }}</view>
		</view>
	</load-list>
</template>
<script>
import mixin from '@/components/load-list/load-list.js'
import loadList from '@/components/load-list/load-list.vue'
export default {
	mixins: [mixin],
	components: { loadList },
	data() {
		return {
			list: [],
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

<style lang="scss"></style>
