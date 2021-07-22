const getters = {
  user: (state) => state.user.user,
  profile: (state) => state.user.user?.profile?.__metadata || {},
  cart: (state) => state.common.cart,
  ORDER_STATUS: (state) => state.constant.ORDER_STATUS,
  stockHasLimit: (state) => state.common.stockHasLimit,
  orderProducts: (state) => state.common.orderProducts,
  favorites:(state) => state.common.favorites
}
export default getters
