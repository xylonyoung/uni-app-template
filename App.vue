<script>
import { weChatLogin } from '@/settings'
export default {
  onLaunch: function () {
    if (weChatLogin) {
      this.$store.dispatch('user/weChatLogin')
    }
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
