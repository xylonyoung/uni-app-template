const getters = {
  user: (state) => state.user.user,
  profile: (state) => state.user.user?.profile?.__metadata || {},
  cart: (state) => state.common.cart,
  stockHasLimit: (state) => state.common.stockHasLimit,
  orderStatus: (state) => state.common.orderStatus,
  orderProducts: (state) => state.common.orderProducts,
  favorites:(state) => state.common.favorites
}
export default getters
