<template>
  <u-form :model="formData" ref="uForm">
    <u-verification-code
      seconds="60"
      ref="uCode"
      @change="codeChange"
    ></u-verification-code>
    
    <u-form-item
      v-for="(item, index) in formList"
      :key="index"
      :prop="item.name"
      :label="item.label"
      :label-width="autoLabelWidth(item.label)"
      :required="item.required"
    >
      <u-input
        v-if="item.type === 'input'"
        v-model="formData[item.name]"
        v-bind="item.properties"
      />

      <template v-else-if="item.type === 'code'">
        <u-input
          placeholder="请输入验证码"
          v-model="formData.code"
          type="text"
        ></u-input>
        <u-button slot="right" type="success" size="mini" @click="getCode">
          {{ codeTips }}
        </u-button>
      </template>

      <u-switch
        v-else-if="item.type === 'switch'"
        v-model="formData[item.name]"
        v-bind="item.properties"
      />

      <template v-else-if="item.type === 'select'">
        <u-input
          v-model="showFormData[item.name]"
          type="select"
          :placeholder="item.placeholder || '请选择'"
          @click="$set(showSelect, item.name, true)"
        />
        <u-select
          v-model="showSelect[item.name]"
          :list="item.list"
          v-bind="item.properties"
          @confirm="selectConfirm($event, item.name)"
        ></u-select>
      </template>

      <template v-else-if="item.type === 'calendar'">
        <u-input
          v-model="showFormData[item.name]"
          type="select"
          :placeholder="item.placeholder || '请选择'"
          @click="$set(showCalendar, item.name, true)"
        />
        <u-calendar
          v-model="showCalendar[item.name]"
          v-bind="item.properties"
          @change="calendarChange($event, item.name)"
        ></u-calendar>
      </template>

      <u-radio-group
        v-else-if="item.type === 'radio'"
        v-model="formData[item.label]"
      >
        <u-radio
          v-for="(radio, index) in item.list"
          :key="index"
          :name="radio.value"
          :disabled="radio.disabled"
        >
          {{ radio.label }}
        </u-radio>
      </u-radio-group>

      <u-checkbox-group
        v-else-if="item.type === 'checkbox'"
        @change="checkboxGroupChange($event, item.name)"
      >
        <u-checkbox
          v-model="checkbox.checked"
          v-for="(checkbox, index) in item.list"
          :key="index"
          :name="checkbox.label"
        >
          {{ checkbox.label }}
        </u-checkbox>
      </u-checkbox-group>

      <u-upload
        v-else-if="item.type === 'upload'"
        :action="item.action"
        :file-list="fileList"
      ></u-upload>

      <slot v-else-if="item.type === 'slot'" :name="item.name"></slot>
    </u-form-item>
  </u-form>
</template>

<script>
export default {
  props: {
    formList: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showFormData: {},
      showSelect: {},
      showCalendar: {},
      fileList: [],
      codeTips: ''
    }
  },
  mounted() {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    submit() {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          console.log('验证通过')
        } else {
          console.log('验证失败')
        }
      })
    },
    updateData(data) {
      this.$emit('update:formData', Object.assign(this.formData, data))
    },
    setProperties(props, defaultProps) {
      if (props) {
        return Object.assign(defaultProps, props)
      } else {
        return defaultProps
      }
    },
    autoLabelWidth(label) {
      return label.length > 2 ? label.length * 25 + 45 : ''
    },
    checkboxGroupChange(e, name) {
      console.log(e)
      this.updateData({ [name]: e })
    },
    selectConfirm(e, name) {
      console.log(e, name)
      this.updateData({ [name]: e })
      let str = ''
      e.forEach(i => {
        str += i.label + '  '
      })
      this.showFormData[name] = str
    },
    calendarChange(e, name) {
      console.log(e)
      if (e.result) {
        this.updateData({ [name]: e })
        this.showFormData[name] = e.result
      } else {
        this.updateData({ [name]: e })
        this.showFormData[name] = `${e.startDate} 至 ${e.endDate}`
      }
    },
    codeChange(text) {
      this.codeTips = text
    },
    // 获取验证码
    getCode() {
      console.log(this.$refs, this.$refs.uCode.canGetCode)
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码'
        })
        setTimeout(() => {
          uni.hideLoading()
          // 这里此提示会被this.start()方法中的提示覆盖
          this.$u.toast('验证码已发送')
          // 通知验证码组件内部开始倒计时
          this.$refs.uCode.start()
        }, 2000)
      } else {
        this.$u.toast('倒计时结束后再发送')
      }
    }
  }
}
</script>

<style lang="scss"></style>
