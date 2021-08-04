<template>
  <view class="add-container">
    <u-form :model="formData" ref="uForm" label-width="160">
      <u-form-item label="收件人" prop="name">
        <u-input v-model="formData.name" />
      </u-form-item>
      <u-form-item label="电话" prop="phone">
        <u-input v-model="formData.phone" />
      </u-form-item>
      <u-form-item label="地区" prop="region">
        <u-input
          type="select"
          v-model="regionName"
          placeholder="请选择地区"
          @click="showRegionSelect = true"
        ></u-input>
      </u-form-item>
      <u-form-item label="详细地址" prop="address">
        <u-input v-model="formData.address" type="textarea" />
      </u-form-item>
      <u-form-item label="默认地址" prop="default">
        <u-switch v-model="formData.default" slot="right"></u-switch>
      </u-form-item>
    </u-form>

    <view style="padding: 24rpx 20%">
      <u-button @click="onSubmit" type="success">确定</u-button>
    </view>

    <view style="padding: 24rpx 20%">
      <u-button v-if="addressIndex" @click="onDelete" type="error">
        删除
      </u-button>
    </view>

    <u-select
      v-model="showRegionSelect"
      mode="mutil-column-auto"
      :list="selectList"
      value-name="id"
      label-name="__toString"
      @confirm="regionConfirm"
    ></u-select>
  </view>
</template>

<script>
import Address from '@/mixins/address'
export default {
  mixins: [Address],
  data() {
    return {
      showRegionSelect: false,
      regionName: '',
      setDefault: false,
      formData: {
        name: '',
        phone: null,
        region: null,
        address: '',
        default: false
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入收件人',
            trigger: 'blur'
          }
        ],
        phone: [
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
        address: [
          {
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          }
        ]
      },
      addressIndex: null
    }
  },
  watch: {
    'formData.region'(val) {
      this.regionName = this.getRegionFullName(val.id)
    }
  },
  async onLoad(option) {
    await this.getRegions()

    if (option.index) {
      uni.setNavigationBarTitle({
        title: '修改地址'
      })
      this.addressIndex = option.index
      this.formData = uni.getStorageSync('address')[option.index]
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    onDelete() {
      const result = uni.getStorageSync('address') || []
      result.splice(this.addressIndex, 1)
      uni.setStorageSync('address', result)
      uni.navigateBack({ delta: 1 })
    },
    onSubmit() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          const result = uni.getStorageSync('address') || []

          if (this.formData.default) {
            result.forEach((item) => {
              item.default = false
            })
          }

          if (this.addressIndex) {
            result[this.addressIndex] = this.formData
            this.setSelectAddress(this.addressIndex)
          } else {
            result.push(this.formData)
            this.setSelectAddress(result.length - 1)
          }

          uni.setStorageSync('address', result)
          uni.navigateBack({ delta: 1 })
        } else {
          console.log('验证失败')
        }
      })
    },
    regionConfirm(region) {
      const id = region[region.length - 1].value
      this.formData.region = this.regionList.find((item) => item.id === id)
    }
  }
}
</script>

<style lang="scss">
.add-container {
  padding: 24rpx;
}
</style>
