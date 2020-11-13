<template>
	<u-form :model="formData" ref="uForm">
		<template v-for="(item, index) in formList">
			<u-form-item :key="index" :label="item.label" :label-width="labelWidth(item.label)">
				<!-- https://uniapp.dcloud.io/component/input -->
				<u-input v-if="item.type === 'input'" v-model="formData[item.name]" />
				<u-input v-else-if="item.type === 'password'" v-model="formData[item.name]" type="password" />
				<u-input v-else-if="item.type === 'textarea'" v-model="formData[item.name]" type="textarea" />
				<u-input v-else-if="item.type === 'number'" v-model="formData[item.name]" type="number" />
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
					<text style="margin-right: 20rpx">{{ item.list ? item.list[0] : '关' }}</text>
					<u-switch v-model="formData[item.name]" />
					<text style="margin-left: 20rpx">{{ item.list ? item.list[1] : '开' }}</text>
				</template>

				<u-radio-group v-else-if="item.type === 'radio'" v-model="formData[item.label]">
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
			return function(label) {
				return label.length > 2 ? label.length * 25 + 45 : ''
			}
		}
	},
	props: {
		formList: { type: Array, default: _ => [] }
	},
	data() {
		return {
			formData: {},
			showFormData: {},
			showSelect: {},
			showCalendar: {}
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
		}
	}
}
</script>

<style lang="scss"></style>
