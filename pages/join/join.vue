<template>
  <view class="join-container">
    <u-form :model="formData" ref="uForm" label-width="128">
      <u-form-item label="手机号码" prop="phone">
        <u-input v-model="formData.phone" />
      </u-form-item>
      <u-form-item label="身份证" prop="IDCard">
        <u-upload
          :action="action"
          :header="header"
          :file-list="fileList"
        ></u-upload>
      </u-form-item>
      <u-form-item label="营业执照" prop="license">
        <u-upload
          :action="action"
          :header="header"
          :file-list="fileList"
        ></u-upload>
      </u-form-item>
    </u-form>
    <u-button type="success" @click="submit">提交</u-button>
  </view>
</template>

<script>
import { buildFullPath } from '@/utils'
export default {
  data() {
    return {
      formData: {},
      rules: {},
      header: {
        Authorization: uni.getStorageSync('token')
      },
      action: buildFullPath('upload')
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    submit() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          console.log('验证通过')
        } else {
          console.log('验证失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.join-container {
  padding: 32rpx;
}
</style>
