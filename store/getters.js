const getters = {
  user: (state) => state.user.user,
  authorized: (state) => state.user.authorized,
  profile: (state) => state.user.user?.profile?.__metadata || {},
}
export default getters
