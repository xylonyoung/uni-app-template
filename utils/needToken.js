export default function needToken(){
	const token =uni.getStorageSync('token')
	if(token){
		return true
	}else{
		uni.navigateTo({
			url: '../login/login'
		});
	}
}