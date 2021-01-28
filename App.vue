<script>
import { loginType } from './settings'
export default {
  onLaunch: function () {
    loginType()
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import 'uview-ui/index.scss';

page {
  color: $t-font;
}
</style>
