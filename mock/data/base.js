const products = {
  'data|10': [
    {
      'id|1-3': 1,
      name: '@ctitle(3,10)',
      cover: '@image()',
      price: '@float(6,9999)',
      sold: '@integer(0,9999)',
      'images|3': ['@image()'],
      'dimension|3-6': [
        {
          'id|1-2': 1,
          name: '@cname()',
          stock: '@integer(0,9)',
          price: '@float(6,9999)',
        },
      ],
      createdTime: '@datetime()',
    },
  ],
}

const orders = {
  'data|10': [
    {
      'id|+1': 1,
      price: '@float(6,9999)',
      'status|0-3': 1,
      'items|1-3': [
        {
          name: '@ctitle(3,10)',
          cover: '@image()',
          price: '@float(6,9999)',
          'quantity|1-9':1,
          dimension: { id: 1, name: '@cname()' },
        },
      ],

      createdTime: '@datetime()',
    },
  ],
}

function createList(response, list) {
  const paginator = {
    current: response.page,
    next: response.page + 1,
    endPage: 3,
    totalCount: 30,
  }
  return { ...list, paginator }
}

export default {
  'mockProducts.get': (response) => createList(response, products),
  'mockOrders.get': (response) => createList(response, orders),
}
