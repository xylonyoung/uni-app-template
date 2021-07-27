<template>
  <view>
    <view class="address">
      <u-cell-item
        :value="choose ? '选择地址' : ''"
        :arrow="choose ? true : false"
        @click="chooseAddress"
      >
        <u-icon slot="icon" name="map-fill" color="#ff6700" size="40"></u-icon>
        <view slot="title">
          <template v-if="value.telNumber">
            <view class="address-user">
              <text>{{ value.userName }}</text>
              <text>{{ value.telNumber }}</text>
            </view>
            <view class="address-detail">
              {{ addressDetail }}
            </view>
          </template>
          <view v-else>暂未设置收货地址</view>
        </view>
      </u-cell-item>
    </view>

    <u-popup
      v-model="showPopup"
      mode="bottom"
      closeable
      height="70%"
      @close="onClose"
    >
      <view style="padding: 32rpx">
        <u-form :model="formData" ref="uForm" label-width="160">
          <u-form-item label="收件人" prop="userName">
            <u-input v-model="formData.userName" />
          </u-form-item>
          <u-form-item label="电话" prop="telNumber">
            <u-input v-model="formData.telNumber" />
          </u-form-item>
          <u-form-item label="地区" prop="region">
            <u-input
              type="select"
              v-model="regionName"
              placeholder="请选择地区"
              @click="showRegionSelect = true"
            ></u-input>
          </u-form-item>
          <u-form-item label="详细地址" prop="detailInfo">
            <u-input
              v-model="formData.detailInfo"
              type="textarea"
              placeholder=" "
            />
          </u-form-item>
        </u-form>

        <view style="padding-top: 32rpx">
          <u-checkbox v-model="setDefault"></u-checkbox>
          <text>设置为默认地址</text>
        </view>
      </view>

      <view style="padding: 0 20%">
        <u-button @click="onSubmit" type="success">确定</u-button>
      </view>

      <u-select
        v-model="showRegionSelect"
        mode="mutil-column-auto"
        :list="selectList"
        value-name="id"
        label-name="__toString"
        @confirm="regionConfirm"
      ></u-select>
    </u-popup>
  </view>
</template>
<script>
export default {
  props: {
    value: { type: Object, required: true },
    choose: { type: Boolean, default: false }
  },
  data() {
    return {
      showPopup: false,
      showRegionSelect: false,
      regionList: [],
      selectList: [],
      setDefault: false,
      formData: {
        userName: '',
        telNumber: null,
        region: null,
        detailInfo: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入收件人',
            trigger: 'blur'
          }
        ],
        telNumber: [
          {
            required: true,
            message: '请输入手机号',
            trigger: ['change', 'blur']
          },
          {
            validator: (rule, value, callback) => {
              return this.$u.test.mobile(value)
            },
            message: '手机号码不正确',
            trigger: ['change', 'blur']
          }
        ],
        region: [
          {
            required: true,
            type: 'object',
            message: '请选择地区',
            trigger: ['change', 'blur']
          }
        ],
        detailInfo: [
          {
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          }
        ]
      },
      regionName: ''
    }
  },
  watch: {
    'formData.region'(val) {
      this.regionName = this.mergeAddressName(val?.id)
    }
  },
  computed: {
    addressDetail() {
      const regionId = this.value?.region?.id ?? this.value?.region
      return this.mergeAddressName(regionId) + ' ' + this.value?.detailInfo

      // return (
      //   this.value.provinceName +
      //   this.value.cityName +
      //   this.value.countyName +
      //   this.value.detailInfo
      // )
    }
  },
  created() {
    this.getRegion()
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    mergeAddressName(regionId) {
      const getAddressName = (id) => {
        const anAddress = this.regionList.find((e) => e.id === id)
        if (anAddress) {
          result.unshift(anAddress.name)
        }
        const parentId = anAddress?.parent?.id
        if (parentId) {
          getAddressName(parentId)
        }
      }

      const result = []
      getAddressName(regionId)

      return result.join(' ')
    },
    onSubmit() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          if (this.setDefault) uni.setStorageSync('address', this.formData)
          this.$emit('input', this.formData)
          this.onClose()
        } else {
          console.log('验证失败')
        }
      })
    },
    async getRegion() {
      const list = await this.$store.dispatch('region/getRegionList')
      this.regionList = list
      this.selectList = this.regionFormat(list)
      const address = uni.getStorageSync('address')
      if (address) {
        this.$emit('input', address)
      }
    },
    regionFormat(data) {
      const result = data.filter((e) => e.parent === null)
      return result.map((e) => {
        return { ...e, children: [...findChild(e)] }
      })
      function findChild(item) {
        if (!item.children) return
        return item.children.map((e) => {
          if (e.children) {
            return findChild(e)
          } else {
            return data.find((i) => e.id === i.id)
          }
        })
      }
    },
    regionConfirm(region) {
      const id = region.pop().value
      this.formData.region = this.regionList.find((e) => e.id === id)
    },
    onClose() {
      this.showPopup = false
    },
    chooseAddress() {
      if (!this.choose) return

      this.showPopup = true
      // uni.chooseAddress({
      //   success: (res) => {
      //     uni.setStorageSync('address', res)
      //     this.address = res
      //   }
      // })
    }
  }
}
</script>
<style lang='scss' scoped>
.address {
  margin-bottom: 32rpx;
  background-color: #fff;
  border-image: url('@/static/pay-stripe.png') 0 0 12 0 / 12rpx repeat;
  border-style: solid;
  &-user {
    margin-left: 12rpx;
    text:last-child {
      margin-left: 12rpx;
      color: $c-gray;
      font-size: 24rpx;
    }
  }
  &-detail {
    margin-left: 12rpx;
    font-size: 24rpx;
  }
}
</style>