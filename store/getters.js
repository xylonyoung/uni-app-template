import $getValue from 'get-value'
const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  profile: state => $getValue(state, 'user.user.profile.__metadata')
}
export default getters
