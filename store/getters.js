const getters = {
	token: state => state.user.token,
	user: state => state.user.user,
	profile: state => state.user.user.profile
}
export default getters
