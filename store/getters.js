const getters = {
  user: (state) => state.user.user,
  profile: (state) => state.user.profile,
  sessionKey:(state) => state.user.sessionKey,
  cart: (state) => state.common.cart,
  stockHasLimit: (state) => state.common.stockHasLimit,
  orderStatus: (state) => state.common.orderStatus,
  orderProducts: (state) => state.common.orderProducts,
  categoryList: (state) => state.common.categoryList
}
export default getters
