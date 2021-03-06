import createMock from '../index'
import { param2Obj } from '../utils'

export default {
  'list.get': response => createList(response, list),
  'order.get': response => createList(response)
}
const list = {
  'data|10': [
    {
      createdTime: '@datetime',
      name: '@cname',
      region: '@region',
      avatar: '@image',
      'images|3': ['@image']
    }
  ]
}

function createList(response, list) {
  let params = { page: 1, next: 2, endPage: 3 }
  if (response) {
    const { url } = response
    params = Object.assign(params, param2Obj(url))
    params.next = +params.page + 1
  }
  return createMock(
    Object.assign(list, {
      paginator: {
        current: params.page,
        next: params.next,
        endPage: params.endPage,
        totalCount: 30
      }
    })
  )
}
