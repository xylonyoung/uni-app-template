const getters = {
  user: (state) => state.user.user,
  profile: (state) => state.user.user?.profile?.__metadata || {},
  cart: (state) => state.cart.list,
  orderProducts: (state) => state.order.products,
  favorites: (state) => state.favorite.list,
  selectAddress: (state) => state.address.select,
}
export default getters
