<template>
  <u-form :model="formData" ref="uForm">
    <template v-for="(item, index) in formList">
      <u-form-item
        :key="index"
        :label="item.label"
        v-if="item.type === 'input'"
      >
        <u-input v-model="formData[item.name]" />
      </u-form-item>
      <u-form-item
        :key="index"
        :label="item.label"
        v-if="item.type === 'radio'"
      >
        <u-radio-group v-model="formData[item.label]">
          <u-radio
            v-for="(radio, index) in item.list"
            :key="index"
            :name="radio.value"
            :disabled="radio.disabled"
          >
            {{ radio.name }}
          </u-radio>
        </u-radio-group>
      </u-form-item>
      <u-form-item
        :key="index"
        :label="item.label"
        v-if="item.type === 'checkbox'"
      >
        <u-checkbox-group>
          <u-checkbox
            v-model="checkbox.checked"
            v-for="(checkbox, index) in item.list"
            :key="index"
            :name="checkbox.name"
          >
            {{ checkbox.name }}
          </u-checkbox>
        </u-checkbox-group>
      </u-form-item>
    </template>
  </u-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      formList: [
        { name: 'name', label: '姓名', type: 'input' },
        {
          name: 'gender',
          label: '性别',
          type: 'radio',
          list: [
            { value: '1', name: '女' },
            { value: '2', name: '男' },
          ],
        },
        {
          name: 'hobby',
          label: '爱好',
          type: 'checkbox',
          list: [
            { value: '1', name: '电影' },
            { value: '2', name: '看书' },
            { value: '3', name: '运动' },
          ],
        },
      ],
    }
  },
}
</script>

<style lang="scss"></style>
