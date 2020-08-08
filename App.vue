<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    try {
      window.console &&
        window.console.log &&
        console.log(
          '%c百度%c\n%c搜索',
          'font-size:30px;color:white;background:black;border-radius:5px 5px 0 0;padding:10px 20px 0;',
          '',
          'font-size:30px;color:black;background:orange;border-radius:0 0 5px 5px;border:solid black;border-width: 0 15px 10px 15px;padding:0 5px;'
        )
    } catch (e) {}
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
</style>
