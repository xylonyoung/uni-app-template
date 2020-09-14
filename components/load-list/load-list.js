const mixin = {
  //下拉刷新
  onPullDownRefresh() {
    this.$refs.loadList.loadData('refresh')
  },
}

export default mixin
