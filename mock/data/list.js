import { success } from '../base-data'

const Mock = require('mockjs')

const list = Mock.mock(
  Object.assign(success, {
    'data|10': [
      {
        createdTime: '@datetime',
        name: '@cname',
        region: '@region',
        avatar: '@image',
        'images|3': ['@image'],
      },
    ],
    paginator: {
      current: 1,
      next: 2,
      endPage: 3,
      totalCount: 100,
      numItemsPerPage: 10,
    },
  })
)

export default {
  'load-list.get': _ => list,
  'uni-pagination.get': _ => list,
}
