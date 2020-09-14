<template>
  <load-list :list-api.sync="listApi" :list.sync="list" ref="loadList">
    <view v-for="(item, index) in list" :key="index" class="content"
      ><image class="logo" src="/static/logo.png"></image>
      <view>{{ index }}</view></view
    >
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
      listApi: 'getData',
      list: [],
    }
  },
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}
</style>
