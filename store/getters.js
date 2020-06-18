const getters = {
token: state => state.user.token,
userInfo :state => state.user.userInfo,
avatar: state => state.user.userInfo.avatarUrl,
name: state => state.user.userInfo.nickName,
}
export default getters
