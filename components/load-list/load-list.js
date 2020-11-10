const mixin = {
	//listen pull down to refresh
	onPullDownRefresh() {
		this.$refs.loadList.loadData('refresh')
	},
	//listen scroll for back-top
	onPageScroll(e) {
		this.$refs.loadList.scrollTop = e.scrollTop
	},
	//listener for reach bottom and load data
	onReachBottom() {
		this.$refs.loadList.loadData()
	}
}
export default mixin
