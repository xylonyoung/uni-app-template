const getters = {
  user: (state) => state.user.user,
  profile: (state) => state.user.user?.profile?.__metadata || {},
  cart: (state) => state.common.cart,
  hasStock: (state) => state.common.hasStock,
  orderStatus: (state) => state.common.orderStatus,
  orderProducts: (state) => state.common.orderProducts
}
export default getters
