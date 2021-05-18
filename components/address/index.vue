<template>
  <u-popup
    v-model="showPopup"
    mode="bottom"
    closeable
    height="70%"
    @close="onClose"
  >
    <view style="padding: 32rpx">
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
      :list="regionList"
      value-name="id"
      label-name="__toString"
      @confirm="regionConfirm"
    ></u-select>
  </u-popup>
</template>
<script>
export default {
  props: {
    regions: { type: Array, required: true },
    value: { type: Boolean, required: true }
  },
  data() {
    return {
      showPopup: false,
      showRegionSelect: false,
      regionList: [],
      setDefault: false,
      formData: {
        name: '',
        phone: '',
        region: [],
        detailInfo: ''
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
            message: '请输入手机号码',
            trigger: 'blur'
          }
        ],
        region: [
          {
            type: 'array',
            required: true,
            message: '请选择地区',
            trigger: 'change'
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
    value: {
      handler(val) {
        this.showPopup = val
      },
      immediate: true
    },
    regions: {
      handler(val) {
        this.regionList = this.regionFormat(val)
      },
      immediate: true,
      deep: true
    },
    'formData.region'(val) {
      this.regionName = val.reduce((acc, cur) => {
        return acc + ' ' + cur.label
      }, '')
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
          this.$emit('confirm', this.formData)
          this.onClose()
        } else {
          console.log('验证失败')
        }
      })
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
    regionConfirm(e) {
      this.formData.region = e
    },
    onClose() {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>