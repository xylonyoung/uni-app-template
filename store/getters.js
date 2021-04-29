const getters = {
  user: (state) => state.user.user,
  profile: (state) => state.user.user?.profile?.__metadata || {},
  cart: (state) => state.store.cart,
  orderStatus: (state) => state.store.orderStatus,
}
export default getters
