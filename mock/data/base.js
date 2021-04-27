const products = {
  'data|10': [
    {
      'id|+1': 1,
      name: '@ctitle(10)',
      cover: '@image()',
      price: '@float(6,9999)',
      sold: '@integer(0,9999)',
      'images|3': ['@image()'],
      'dimension|6': [
        {
          'id|+1': 1,
          name: '@cname()',
          inventory: '@integer(0,999)',
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
      name: '@ctitle(10)',
      cover: '@image()',
      price: '@float(6,9999)',
      sold: '@integer(0,9999)',
      'images|3': ['@image()'],
      'dimension|6': [
        {
          'id|+1': 1,
          name: '@cname()',
          inventory: '@integer(0,999)',
          price: '@float(6,9999)',
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
  'mockProducts.get': (response) => createList(response, orders),
  'mockOrders.get': (response) => createList(response, products),
}
