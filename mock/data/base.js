export default {
  'list.get': response => getList(response)
}
function getList(response) {
  const list = {
    'data|10': [
      {
        createdTime: '@datetime()',
        name: '@cname()',
        region: '@region()',
        avatar: '@image()',
        'images|3': ['@image()']
      }
    ]
  }
  return createList(response, list)
}
function createList(response, list) {
  const paginator = {
    current: response.page,
    next: response.page + 1,
    endPage: 3,
    totalCount: 30
  }
  return Object.assign(list, { paginator })
}
