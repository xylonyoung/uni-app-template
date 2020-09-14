<template>
  <load-list :list-api.sync="listApi" :list.sync="list" ref="loadList">
    <view v-for="(item, index) in list" :key="index">{{ item.name }}</view>
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
</style>
