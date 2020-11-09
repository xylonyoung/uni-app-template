const mixin = {
	computed: {
		thisRef() {
			return this.$refs.swiperCurrent >= 0 ? 'loadList' + this.$refs.swiperCurrent : 'loadList'
		}
	},
	//listen pull down to refresh
	onPullDownRefresh() {
		this.$refs[this.thisRef].loadData('refresh')
	},
	//listen scroll for back-top
	onPageScroll(e) {
		this.$refs[this.thisRef].scrollTop = e.scrollTop
	},
	//listener for reach bottom and load data
	onReachBottom() {
		this.$refs[this.thisRef].loadData()
	}
}
export default mixin
