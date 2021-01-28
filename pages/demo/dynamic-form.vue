<template>
  <view class="container">
    <c-dynamic-form
      :form-list="formList"
      :form-data.sync="formData"
      :rules="rules"
      ref="dForm"
    >
      <template v-slot:code>
        <u-input
          placeholder="请输入验证码"
          v-model="formData.code"
          type="text"
        ></u-input>
        <u-button slot="right" type="success" size="mini">获取验证码</u-button>
      </template>
    </c-dynamic-form>
    <u-button @click="submit">提交</u-button>
  </view>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      formList: [
        {
          name: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          name: 'password',
          label: '密码',
          type: 'input',
          attributes: {
            type: 'password'
          }
        },
        {
          name: 'textarea',
          label: '文本框',
          type: 'input',
          attributes: {
            type: 'textarea'
          }
        },
        {
          name: 'number',
          label: '数字',
          type: 'input',
          attributes: {
            type: 'number'
          }
        },
        {
          name: 'switch',
          label: '开关',
          type: 'switch'
        },
        {
          name: 'gender',
          label: '性别',
          type: 'radio',
          list: [
            {
              value: '1',
              label: '女'
            },
            {
              value: '2',
              label: '男'
            }
          ]
        },
        {
          name: 'hobby',
          label: '爱好',
          type: 'checkbox',
          list: [
            {
              value: '1',
              label: '电影'
            },
            {
              value: '2',
              label: '看书'
            },
            {
              value: '3',
              label: '运动'
            },
            {
              value: '4',
              label: '旅游'
            }
          ]
        },
        {
          name: 'select',
          label: '选择器',
          type: 'select',
          list: [
            {
              value: '1',
              label: '选项1'
            },
            {
              value: '2',
              label: '选项2'
            },
            {
              value: '3',
              label: '选项3'
            },
            {
              value: '4',
              label: '选项4'
            }
          ]
        },
        {
          name: 'multiSelect',
          label: '多列选择器',
          type: 'select',
          properties: {
            mode: 'mutil-column-auto'
          },
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
                      label: '深圳'
                    },
                    {
                      value: 4,
                      label: '广州'
                    }
                  ]
                },
                {
                  value: 5,
                  label: '广西',
                  children: [
                    {
                      value: 6,
                      label: '南宁'
                    },
                    {
                      value: 7,
                      label: '桂林'
                    }
                  ]
                }
              ]
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
                      label: '皇后街区'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'oneDay',
          label: '单日期',
          type: 'calendar'
        },
        {
          name: 'dateRange',
          label: '范围日期',
          type: 'calendar',
          properties: {
            mode: 'range',
            maxDate: '2030'
          }
        },
        {
          name: 'upload',
          label: '上传',
          type: 'upload',
          action: ''
        },
        {
          name: 'code',
          label: '验证码',
          type: 'slot'
        }
      ],
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            // 可以单个或者同时写两个触发验证方式
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.dForm.submit()
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 20rpx;
}
</style>
