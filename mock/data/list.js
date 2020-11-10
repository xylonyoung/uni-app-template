import { success } from '../base-data'

const Mock = require('mockjs')

function createList(response) {
	let params = { page: 1, next: 2, endPage: 3 }
	if (response) {
		const { url } = response
		params = Object.assign(params, getQueryParams(url))
		params.next = +params.page + 1
	}
	return Mock.mock(
		Object.assign(success, {
			'data|10': [
				{
					createdTime: '@datetime',
					name: '@cname',
					region: '@region',
					avatar: '@image',
					'images|3': ['@image']
				}
			],
			paginator: {
				current: params.page,
				next: params.next,
				endPage: params.endPage,
				totalCount: 30
			}
		})
	)
}

function getQueryParams(url) {
	let query = decodeURI(url).split('?')[1]
	let obj = {}
	if (query.match('&')) {
		let vars = query.split('&')
		for (let i = 0; i < vars.length; i++) {
			let pair = vars[i].split('=')
			obj[pair[0]] = decodeURIComponent(pair[1])
		}
	}
	return obj
}
export default {
	'load-list.get': response => createList(response),
	'uni-pagination.get': response => createList(response)
}
