import request from './request.js'
export default function picturesUrl(pictures) {
	console.log(typeof pictures)
	if (!pictures) {
		return null
	} else if (typeof pictures === 'string') {
		return request.baseURL + '/uploads/images/' + pictures
	} else {
		pictures.forEach(e => {
			e.url = request.baseURL + '/uploads/images/' + e.__toString;
		});
		return pictures
	}
}
