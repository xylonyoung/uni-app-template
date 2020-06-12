import { baseURL } from './request.js'
export default function picturesUrl(pictures) {
	if (!pictures) {
		return null
	} else if (typeof pictures === 'string') {
		return baseURL + '/uploads/images/' + pictures
	} else {
		pictures.forEach(e => {
			e.url = baseURL + '/uploads/images/' + e.__toString;
		});
		return pictures
	}
}
