<template>
  <u-form :model="formData" ref="uForm">
    <template v-for="(item, index) in formList">
      <u-form-item
        :key="index"
        :label="item.label"
        :label-width="labelWidth(item.label)"
      >
        <!-- https://uniapp.dcloud.io/component/input -->
        <u-input v-if="item.type === 'input'" v-model="formData[item.name]" />
        <u-input
          v-else-if="item.type === 'password'"
          v-model="formData[item.name]"
          type="password"
        />
        <u-input
          v-else-if="item.type === 'textarea'"
          v-model="formData[item.name]"
          type="textarea"
        />
        <u-input
          v-else-if="item.type === 'number'"
          v-model="formData[item.name]"
          type="number"
        />
        <template v-else-if="item.type === 'select'">
          <u-input
            v-model="showFormData[item.name]"
            type="select"
            placeholder="请选择"
            @click="$set(showSelect, item.name, true)"
          />
          <u-select
            v-model="showSelect[item.name]"
            :list="item.list"
            :mode="item.mode"
            @confirm="selectConfirm($event, item.name)"
          ></u-select>
        </template>

        <template v-else-if="item.type === 'calendar'">
          <u-input
            v-model="showFormData[item.name]"
            type="select"
            placeholder="请选择"
            @click="$set(showCalendar, item.name, true)"
          />
          <u-calendar
            v-model="showCalendar[item.name]"
            :mode="item.mode"
            :max-date="item.maxDate"
            @change="calendarChange($event, item.name)"
          ></u-calendar>
        </template>

        <template v-else-if="item.type === 'switch'" class="u-flex">
          <text style="margin-right: 20rpx">{{
            item.list ? item.list[0] : '关'
          }}</text>
          <u-switch v-model="formData[item.name]" />
          <text style="margin-left: 20rpx">{{
            item.list ? item.list[1] : '开'
          }}</text>
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
      </u-form-item>
    </template>
  </u-form>
</template>

<script>
export default {
  computed: {
    labelWidth() {
      return function (label) {
        return label.length > 2 ? label.length * 25 + 45 : ''
      }
    },
  },
  data() {
    return {
      formData: {},
      showFormData: {},
      showSelect: {},
      showCalendar: {},
      formList: [
        { name: 'name', label: '姓名', type: 'input' },
        { name: 'password', label: '密码', type: 'password' },
        { name: 'textarea', label: '文本框', type: 'textarea' },
        { name: 'number', label: '数字', type: 'number' },

        { name: 'switch', label: '开关', type: 'switch' },
        {
          name: 'gender',
          label: '性别',
          type: 'radio',
          list: [
            { value: '1', label: '女' },
            { value: '2', label: '男' },
          ],
        },
        {
          name: 'hobby',
          label: '爱好',
          type: 'checkbox',
          list: [
            { value: '1', label: '电影' },
            { value: '2', label: '看书' },
            { value: '3', label: '运动' },
            { value: '4', label: '旅游' },
          ],
        },
        {
          name: 'select',
          label: '选择器',
          type: 'select',
          list: [
            { value: '1', label: '选项1' },
            { value: '2', label: '选项2' },
            { value: '3', label: '选项3' },
            { value: '4', label: '选项4' },
          ],
        },
        {
          name: 'multiSelect',
          label: '多列选择器',
          type: 'select',
          mode: 'mutil-column-auto',
          list: [
            {
              value: 1,
              label: '中国',
              children: [
                {
                  value: 2,
                  label: '广东',
                  children: [
                    {
                      value: 3,
                      label: '深圳',
                    },
                    {
                      value: 4,
                      label: '广州',
                    },
                  ],
                },
                {
                  value: 5,
                  label: '广西',
                  children: [
                    {
                      value: 6,
                      label: '南宁',
                    },
                    {
                      value: 7,
                      label: '桂林',
                    },
                  ],
                },
              ],
            },
            {
              value: 8,
              label: '美国',
              children: [
                {
                  value: 9,
                  label: '纽约',
                  children: [
                    {
                      value: 10,
                      label: '皇后街区',
                    },
                  ],
                },
              ],
            },
          ],
        },
        { name: 'oneDay', label: '单日期', type: 'calendar' },
        {
          name: 'dateRange',
          label: '范围日期',
          type: 'calendar',
          mode: 'range',
          maxDate: '2030',
        },
      ],
    }
  },
  methods: {
    checkboxGroupChange(e) {
      console.log(e)
      this.formData[name] = e
    },
    selectConfirm(e, name) {
      console.log(e, name)
      this.formData[name] = e
      let str = ''
      e.forEach(i => {
        str += i.label + '  '
      })
      this.showFormData[name] = str
    },
    calendarChange(e, name) {
      console.log(e)
      if (e.result) {
        this.formData[name] = e
        this.showFormData[name] = e.result
      } else {
        this.formData[name] = e
        this.showFormData[name] = `${e.startDate} 至 ${e.endDate}`
      }
    },
  },
}
</script>

<style lang="scss"></style>
