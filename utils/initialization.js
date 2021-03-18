import Vue from 'vue'
import store from '@/store'
import api from '@/api/api'
import getValue from 'get-value'
import { baseURL } from '@/settings'

initialization()

async function initialization() {
	store.dispatch('user/getToken')

	let consoleStr = '🌈🌻🌼'
	let $api = api
	const needMock = process.env.NODE_ENV === 'development' && baseURL === 'https://mockjs'

	if (needMock) {
		consoleStr += 'mock'
		//#ifndef MP-WEIXIN
		import('@/mock')
		//#endif
		//#ifdef MP-WEIXIN
		await import('@/mock/wechat-mock').then(module => {
			$api = module.default
		})
		//#endif
	}

	vueUse($api)

	//#ifdef MP-WEIXIN
	if (!needMock) {
		store.dispatch('user/weChatLogin')
	}
	//#endif

	try {
		console && console.log && console.log('%c' + consoleStr, 'font-size:50px;')
	} catch (e) {
		console.log(e)
	}
}

/**
 * set global functions, variables, components, etc.
 */
function vueUse($api) {
	Vue.use({
		install(Vue) {
			Vue.prototype.$api = $api
			Vue.prototype.$getValue = getValue
		}
	})
}
