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
  let paginator = { page: 1, next: 2, endPage: 3, totalCount: 30 }
  if (response) {
    paginator = Object.assign(paginator, response.body)
    paginator.next = +paginator.page + 1
  }
  return Object.assign(list, paginator)
}
