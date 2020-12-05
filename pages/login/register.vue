<template>
	<view >
		<view class="top">
			<u-image width="100%" mode="widthFix" src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/d60ea2ee9c04e034e8c7e147bdb05731.jpg?thumb=1&w=720&h=360"></u-image>
		</view>

		<view class="center">
			<u-form :model="formData" :rules="rules" ref="uForm" :label-width="150">
				<u-form-item label="手机" prop="phone">
					<u-input v-model="formData.phone" />
				</u-form-item>
				<u-form-item label="密码" prop="password">
					<u-input v-model="formData.password" type="password" />
				</u-form-item>
				<u-form-item label="验证码" prop="code">
					<u-input placeholder="请输入验证码" v-model="formData.code"></u-input>
					<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
					<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
				</u-form-item>
			</u-form>
			<view class="agreement">
				<u-checkbox v-model="agreement" @change="checkboxChange"></u-checkbox>
				<view class="agreement-text" @click="navTo()">
					同意 《软件用户协议》
				</view>
			</view>
		</view>

		<view class="bottom">
			<u-button type="primary" @click="submit">确定</u-button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				formData: {},
				codeTips: '',
				agreement: false,
				rules: {
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						}
					],
					code: [{
							required: true,
							message: '请输入验证码',
							trigger: ['change', 'blur'],
						},
						{
							type: 'number',
							message: '验证码只能为数字',
							trigger: ['change', 'blur'],
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: ['change', 'blur'],
						},
						{
							// 正则不能含有两边的引号
							pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
							message: '需同时含有字母和数字，长度在6-12之间',
							trigger: ['change', 'blur'],
						}
					],
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			navTo(link) {
				uni.navigateTo({
					url: `/pages/${link}`
				})
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if (!this.agreement) return this.$u.toast('请勾选协议');
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
			codeChange(text) {
				this.codeTips = text;
			},
			// 获取验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			// 勾选版权协议
			checkboxChange(e) {
				this.agreement = e.value;
			},
		}
	}
</script>
<style lang="scss">
	.top {
		padding-top: 100rpx;
	}

	.center {
		margin: 50rpx;

		.agreement {
			display: flex;
			margin-top: 30rpx;
		}
	}

	.bottom {
		margin: 100rpx;
	}
</style>
