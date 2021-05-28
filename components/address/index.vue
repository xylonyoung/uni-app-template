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
        <u-form-item label="收件人" prop="userName">
          <u-input v-model="formData.userName" />
        </u-form-item>
        <u-form-item label="电话" prop="telNumber">
          <u-input v-model="formData.telNumber" />
        </u-form-item>
        <u-form-item label="省份" prop="provinceName">
          <u-input
            type="select"
            v-model="formData.provinceName"
            placeholder="请选择省份"
            @click="toShowRegionSelect('province')"
          ></u-input>
        </u-form-item>
        <u-form-item label="城市" prop="cityName">
          <u-input
            type="select"
            v-model="formData.cityName"
            placeholder="请选择城市"
            @click="toShowRegionSelect('city')"
          ></u-input>
        </u-form-item>
        <u-form-item label="地区" prop="countyName">
          <u-input
            type="select"
            v-model="formData.countyName"
            placeholder="请选择地区"
            @click="toShowRegionSelect('county')"
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
      v-if="showRegionSelect"
      v-model="showRegionSelect"
      :list="regionList[regionType]"
      value-name="id"
      label-name="name"
      @confirm="regionConfirm"
    ></u-select>
  </u-popup>
</template>
<script>
export default {
  props: {
    value: { type: Boolean, required: true }
  },
  data() {
    return {
      showPopup: false,
      showRegionSelect: false,
      regionList: {
        province: [],
        city: [],
        county: []
      },
      regionType: '',
      setDefault: false,
      formData: {
        userName: '',
        telNumber: '',
        province: null,
        provinceName: '',
        city: null,
        cityName: '',
        county: null,
        countyName: '',
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
        provinceName: [
          {
            required: true,
            message: '请选择省份',
            trigger: ['change', 'blur']
          }
        ],
        cityName: [
          {
            required: true,
            message: '请选择城市',
            trigger: ['change', 'blur']
          }
        ],
        countyName: [
          {
            required: true,
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
      selectList: []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.showPopup = val
      },
      immediate: true
    }
  },
  onReady() {
    this.getRegion()
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    toShowRegionSelect(type) {
      this.selectList = this.getSelectList(type)
      this.regionType = type
      this.$nextTick(() => {
        this.showRegionSelect = true
      })
    },
    getSelectList(type) {
      switch (type) {
        case 'province':
          return this.regionList.province
        case 'city':
          return this.regionList.city
        case 'county':
          return this.regionList.county
        default:
          return []
      }
    },
    getRegion(id) {
      const params = { '@filter': 'parent.id = 100000' }
      if (id) {
        params['@filter'] = 'parent.id = ' + id
      }
      this.$api.get('api/regions', params).then((res) => {
        switch (this.regionType) {
          case 'province':
            this.regionList.city = res.content
            break
          case 'city':
            this.regionList.county = res.content
            break
          default:
            this.regionList.province = res.content
            break
        }
      })
    },
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
    regionConfirm(e) {
      switch (this.regionType) {
        case 'province':
          this.formData.city = null
          this.formData.cityName = ''
        case 'city':
          this.formData.county = null
          this.formData.countyName = ''
          this.getRegion(e[0].value)
          break
        default:
          break
      }
      this.formData[this.regionType] = e[0]?.value
      this.formData[this.regionType + 'Name'] = e[0]?.label
    },
    onClose() {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>