<template>
  <view class="join-container">
    <u-form :model="formData" ref="uForm" label-width="128">
      <u-form-item label="姓名" prop="name">
        <u-input v-model="formData.name" />
      </u-form-item>
      <u-form-item label="手机号码" prop="phone">
        <u-input v-model="formData.phone" />
      </u-form-item>
      <u-form-item label="身份证" prop="idCard">
        <u-upload
          :action="action"
          :header="header"
          @on-success="
            (data) => {
              onSuccess(data, 'idCard')
            }
          "
          @on-remove="
            (index) => {
              onRemove(index, 'idCard')
            }
          "
        ></u-upload>
      </u-form-item>
      <u-form-item label="营业执照" prop="businessLicence">
        <u-upload
          :action="action"
          :header="header"
          name="businessLicence"
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
      formData: { name: '', phone: '', idCard: [], businessLicence: [] },
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
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
        idCard: [
          {
            required: true,
            message: '请上传身份证',
            trigger: ['change', 'blur']
          }
        ],
        businessLicence: [
          {
            required: true,
            message: '请上传营业执照',
            trigger: ['change', 'blur']
          }
        ]
      },
      header: {
        Authorization: uni.getStorageSync('token')
      },
      action: buildFullPath('/api/uploads')
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    submit() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.$api.post('/api/joins', this.formData).then(() => {
            uni.showToast({
              title: '申请成功'
            })
          })
        } else {
          console.log('验证失败')
        }
      })
    },
    onSuccess(data, name) {
      console.log(data, name)
      this.formData[name] = data[0]
    },
    onRemove(index, name) {
      console.log(index, name)
      this.formData[name] = null
    }
  }
}
</script>

<style lang="scss" scoped>
.join-container {
  padding: 32rpx;
}
</style>
