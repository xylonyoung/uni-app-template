<template>
  <view class="address-container">
    <view style="padding: 32rpx">
      <u-form :model="formData" ref="uForm" label-width="160">
        <u-form-item prop="userName">
          <u-input v-model="formData.userName" placeholder="Full name" border />
        </u-form-item>
        <u-form-item prop="address">
          <u-input
            v-model="formData.address"
            placeholder="Address line 1 (or Company name)"
            border
          />
        </u-form-item>
        <u-form-item prop="address">
          <u-input
            v-model="formData.address"
            placeholder="Address line 2 (optional)"
            border
          />
        </u-form-item>
        <u-form-item prop="city">
          <u-input v-model="formData.city" placeholder="Town/City" border />
        </u-form-item>
        <u-form-item prop="postcode">
          <u-input v-model="formData.postcode" placeholder="Postcode" border />
        </u-form-item>
        <u-form-item prop="county">
          <u-input v-model="formData.county" placeholder="County" border />
        </u-form-item>
        <u-form-item prop="telNumber">
          <u-input
            v-model="formData.telNumber"
            placeholder="Phone number"
            border
          />
        </u-form-item>

        <view class="instruction">
          <view>Add delivery instructions (optional)</view>
          <view>Do we need additional instructions to find this address?</view>
        </view>
        <u-form-item prop="detailInfo">
          <u-input
            v-model="formData.detailInfo"
            border
            type="textarea"
            placeholder="Provide details such as building description, a nearby landmark, or other navigation instructions"
          />
        </u-form-item>
      </u-form>

      <view style="padding-top: 32rpx">
        <u-checkbox v-model="setDefault"></u-checkbox>
        <text>Default address</text>
      </view>
    </view>

    <view style="padding: 0 20%">
      <u-button @click="onSubmit" type="success">确定</u-button>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
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
            type: 'number',
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
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
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
    }
  }
}
</script>
<style lang='scss' scoped>
.instruction {
  font-weight: bold;
  view:first-child {
    padding: 24rpx 0;
    font-size: 36rpx;
  }
}
</style>