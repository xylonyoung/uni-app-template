const getters = {
  user: (state) => state.user.user,
  profile: (state) => state.user.user?.profile?.__metadata || {},
  cart: (state) => state.store.cart,
  hasStock: (state) => state.store.hasStock,
  orderStatus: (state) => state.store.orderStatus,
  orderProducts: (state) => state.store.orderProducts
}
export default getters
