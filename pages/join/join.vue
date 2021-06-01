<template>
  <view class="join-container">
    <u-button v-if="unpaid" type="success" @click="toPay(undefined)">
      立即支付加盟费
    </u-button>
    <view v-else>
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
            max-count="1"
            @on-success="onSuccess('idCard', $event)"
            @on-remove="onRemove('idCard', $event)"
          ></u-upload>
        </u-form-item>
        <u-form-item label="营业执照" prop="businessLicence">
          <u-upload
            :action="action"
            :header="header"
            max-count="1"
            @on-success="onSuccess('businessLicence', $event)"
            @on-remove="onRemove('businessLicence', $event)"
          ></u-upload>
        </u-form-item>
      </u-form>
      <u-button type="success" @click="submit">提交</u-button>
    </view>
  </view>
</template>

<script>
import { buildFullPath } from '@/utils'
import wechatPay from '@/utils/wechat-pay'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['user', 'hasJoin']),
    unpaid() {
      return this.user?.join?.id && !this.hasJoin
    }
  },
  onReady() {
    if (!this.unpaid) this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    async toPay(invoice) {
      let id = invoice
      if (!invoice) {
        const res = await this.$api.put('/api/joins', {
          ...this.user?.join,
          invoice: null
        })
        id = res.invoice
      }
      wechatPay(id).then(() => {
        this.$store.dispatch('user/getUserInformation')
        uni.navigateBack({
          delta: 2
        })
      })
    },
    submit() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.$api.post('/api/joins', this.formData).then(() => {
            uni.showToast({
              title: '申请成功'
            })
            this.toPay(res.invoice)
          })
        } else {
          console.log('验证失败')
        }
      })
    },
    onSuccess(name, data) {
      this.formData[name] = data[0]
    },
    onRemove(name, index) {
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
