import {
	get
} from '../api/request.js';
import store from '../store';
// for weixin browser to use
export default function login() {
	const token = uni.getStorageSync('token');
	wxBrowser().then(res => {
		if (res) {
			if (token) {
				store.dispatch('user/login');
				share();
			} else if (process.env.NODE_ENV === 'production') {
				shareTemp();
				wxLogin();
			}
		} else {
			uni.reLaunch({
				url: `pages/wx-only/wx-only`,
			});
		}
	});
}

function shareTemp() {
	const shareId = getQueryVariable('shareId');
	if (shareId) {
		uni.setStorageSync('shareId', shareId);
	}
}

function share() {
	const localShareId = uni.getStorageSync(
		'shareId'
	);
	const shareId = getQueryVariable('shareId');
	if (shareId) {
		uni.reLaunch({
			url: `share?id=${shareId}`,
		});
	} else if (localShareId) {
		uni.removeStorageSync('shareId');
		uni.reLaunch({
			url: `share?id=${localShareId}`,
		});
	}
}

function getQueryVariable(variable) {
	var query = decodeURI(window.location.search.substring(1));
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return null;
}

function wxBrowser() {
	if (process.env.NODE_ENV === 'development') {
		return new Promise(res => res(true));
	}
	let ua = navigator.userAgent.toLowerCase();
	if (
		ua.match(/MicroMessenger/i) ==
		'micromessenger'
	) {
		return new Promise(res => res(true));
	} else {
		return new Promise(res => res(false));
	}
}

function wxLogin() {
	//get the code and state
	if (
		location.search.includes('code') &&
		location.search.includes('state')
	) {
		let obj = {};
		let arr = location.search.slice(1).split('&');
		arr.forEach(val => {
			let arr1 = val.split('=');
			obj[arr1[0]] = arr1[1];
		});
		//wechat login
		get('/wechat/official/login', obj).then(
			res => {
				//save the token
				uni.setStorageSync('token', res.data);
				location.replace(
					location.origin + location.pathname
				);
				// location.reload();
			}
		);
	} else {
		//need the authorized
		get('/wechat/official/generate-auth-url', {
			redirect_url: location.href,
		}).then(res => {
			location.replace(res.data);
		});
	}
}
