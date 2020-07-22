const getters = {
	token: state => state.user.token,
	userInfo: state => state.user.userInfo,
	userId: state => state.user.userInfo.id,
	avatar: state => state.user.profile.avatarUrl,
	nickName: state => state.user.profile.nickName,
	profile: state => state.user.profile
}
export default getters
