<template>
  <view>
    <view v-if="addressList.length === 0" style="padding-top: 48rpx">
      <u-empty mode="address"></u-empty>
    </view>

    <u-cell-group v-else>
      <u-cell-item
        :arrow="false"
        v-for="(item, index) in addressList"
        :key="index"
        @click="setSelectAddress(index)"
      >
        <u-icon
          v-show="index === selectAddress"
          slot="icon"
          name="arrow-right"
          class="theme-color"
        ></u-icon>
        <view slot="title" class="center">
          <view>
            <text>{{ item.name }}</text>
            <text style="margin: 0 24rpx">{{ item.phone }}</text>
            <text v-if="item.default" class="theme-color">[ 默认 ]</text>
          </view>
          <view>
            <u-loading v-if="loading" color="#ff6900"></u-loading>
            <view>{{ getRegionFullName(item.region.id) }}</view>
            <view>{{ item.address }}</view>
          </view>
        </view>
        <u-icon
          slot="right-icon"
          name="edit-pen"
          size="56"
          @click.native.stop="navTo(index)"
        ></u-icon>
      </u-cell-item>
    </u-cell-group>

    <view class="bottom">
      <u-button type="success" ripple @click="navTo" :disabled="loading">
        <u-icon name="plus"></u-icon>
        新增地址
      </u-button>
    </view>
  </view>
</template>

<script>
import Address from '@/mixins/address'
import { mapGetters } from 'vuex'
export default {
  mixins: [Address],
  data() {
    return {
      addressList: []
    }
  },
  computed: {
    ...mapGetters(['selectAddress'])
  },
  onLoad() {
    this.getRegions()
  },
  onShow() {
    this.addressList = [...uni.getStorageSync('address')]
  },
  methods: {
    navTo(index) {
      if (this.loading) return

      let url = '/pages/address/add'
      if (typeof index === 'number') {
        url += `?index=${index}`
      }

      uni.navigateTo({ url })
    }
  }
}
</script>

<style lang="scss">
.theme-color {
  color: $c-theme;
}

.center {
  margin-left: 48rpx;
}

.bottom {
  padding: 48rpx;
}
</style>
