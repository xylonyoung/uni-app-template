const getters = {
  user: (state) => state.user.user,
  profile: (state) => state.user.user?.wechatUser ?? {},
  sessionKey: (state) => state.user.sessionKey,
  cart: (state) => state.common.cart,
  stockHasLimit: (state) => state.common.stockHasLimit,
  orderStatus: (state) => state.common.orderStatus,
  orderProducts: (state) => state.common.orderProducts,
  categoryList: (state) => state.common.categoryList,
  hasJoin: (state) => {
    const now = new Date().valueOf()
    return (
      state.user.user?.join?.isFranchised &&
      now < new Date(state.user.user?.join?.expiredDate).valueOf()
    )
  }
}
export default getters
