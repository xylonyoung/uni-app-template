const mixin = {
	//listen pull down to refresh
	onPullDownRefresh() {
		this.getRef.loadData('refresh')
	},
	//listen scroll for back-top
	onPageScroll(e) {
		this.getRef.scrollTop = e.scrollTop
	},
	//listener for reach bottom and load data
	onReachBottom() {
		this.getRef.loadData()
	},
	computed: {
		getRef() {
			if (/^[0-9]*$/.test(this.tabIndex)) {
				return this.$refs.loadList[this.tabIndex]
			} else {
				return this.$refs.loadList
			}
		}
	}
}
export default mixin
