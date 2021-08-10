<template>
  <view class="address-container">
    <u-cell-item :value="tips" :arrow="value ? true : false" @click="toSelect">
      <u-icon slot="icon" name="map-fill" color="#ff6900" size="40"></u-icon>
      <view slot="title">
        <template v-if="value.phone">
          <view class="user">
            <text>{{ value.name }}</text>
            <text>{{ value.phone }}</text>
          </view>
          <view class="detail">
            <view>{{ regionFullName }}</view>
            <view>{{ value.address }}</view>
          </view>
        </template>
        <view v-else>暂未设置收货地址</view>
      </view>
    </u-cell-item>
  </view>
</template>
<script>
import { wechatAddress } from '@/config'
import Address from '@/mixins/address'
import { mapGetters } from 'vuex'
export default {
  mixins: [Address],
  props: {
    value: { type: Object, default: () => ({}) },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return { addressList: [] }
  },
  computed: {
    ...mapGetters(['selectAddress']),
    regionFullName() {
      if (wechatAddress) {
        return this.value.region
      }

      return this.getRegionFullName(this.value?.region?.id)
    },
    tips() {
      if (this.disabled) return ''

      return this.value.phone ? '选择地址' : ''
    }
  },
  watch: {
    selectAddress(val) {
      this.addressList = uni.getStorageSync('address') || []
      this.$emit('input', this.addressList[val])
    }
  },
  created() {
    if (wechatAddress) return

    this.addressList = uni.getStorageSync('address') || []
    const address = uni.getStorageSync('address') || []
    const defaultIndex = address.findIndex((e) => e.default)
    this.$store.commit('address/SET_SELECT', defaultIndex)
    this.getRegions().then(() => {
      this.$emit('input', this.addressList[this.selectAddress] ?? {})
    })
  },
  methods: {
    toSelect() {
      if (this.disabled) return

      if (wechatAddress) {
        uni.chooseAddress({
          success: (res) => {
            this.$emit('input', {
              name: res.userName,
              phone: res.telNumber,
              region: res.provinceName + res.cityName + res.countyName,
              address: res.detailInfo
            })
          }
        })
      } else {
        uni.navigateTo({
          url: '/pages/address/list'
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.address-container {
  margin-bottom: 32rpx;
  background-color: #fff;
  border-image: url('@/static/pay-stripe.png') 0 0 12 0 / 12rpx repeat;
  border-style: solid;
}

.user {
  margin-left: 24rpx;
  text:last-child {
    margin-left: 12rpx;
    color: $c-gray;
    font-size: 24rpx;
  }
}

.detail {
  margin-left: 24rpx;
  font-size: 24rpx;
}
</style>