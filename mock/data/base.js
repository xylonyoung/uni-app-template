export default {
  'list.get': (response) => createList(response),
}

function createList(response) {
  const list = {
    'data|10': [
      {
        'id|+1': 1,
        name: '@ctitle(10)',
        cover: '@image()',
        'price|6-6666': 66,
        'sold|0-6666': 88,
        'images|3': ['@image()'],
        'dimension|10': [{ id: 1, name: '规格', inventory: 6, price: 999 }],
        createdTime: '@datetime()',
      },
    ],
  }
  const paginator = {
    current: response.page,
    next: response.page + 1,
    endPage: 3,
    totalCount: 30,
  }
  return { ...list, paginator }
}
