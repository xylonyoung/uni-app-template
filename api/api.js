import request from './request.js'

export function login(data){
	return request.post('/api-login',data)
}
export function putRecommended(id){
	return request.put(`/api/users/set/recommended/${id}`)
}
export function getUser() {
	return request.get('/api/users')
}
export function mobileRegister(data) {
	return request.post('/mobile-register', data)
}
export function getAlbums(id) {
	return request.get('/api/albums/' + id)
}
export function getCategories(params) {
	return request.get('/api/categories', params)
}
export function getBusiness(params) {
	if (params.id) {
		return request.get('/api/factory/business/' + params.id, params.params)
	} else {
		return request.get('/api/factory/business', params)
	}
}
export function getRequirement(params) {
	if (params.id) {
		return request.get('/api/factory/requirement/' + params.id, params.params)
	} else {
		return request.get('/api/factory/requirement', params)
	}
}
export function getNotifications() {
	return request.get('/api/notifications')
}
export function getWorkerCvsByRequirement(id) {
	return request.get('/api/worker/cvs/by-requirement/' + id)
}
export function getBalances() {
	return request.get('/api/balances')
}
export function postUserProfile(data) {
	return request.post('/api/user-profile/update', data)
}
export function getStores(id) {
	if (id) {
		return request.get('/api/store/stores/' + id)
	} else {
		return request.get('/api/store/stores')
	}
}
export function getWorker() {
	return request.get('/api/worker')
}
export function putWorker(data) {
	return request.put('/api/worker', data)
}
export function postWorkCvs(data) {
	return request.post('/api/work/cvs', data)
}
export function postWorker(data) {
	return request.post('/api/worker', data)
}
export function getRegionsList(id) {
	return request.get('/api/regions/list/' + id)
}
export function getBusinessWorkers(id) {
	if(id){
		return request.get('/manage/factory/business/workers/' + id)
	}else{
		return request.get('/manage/factory/business/workers')
	}
}
export function getSalary() {
	return request.get('/api/salary')
}
export function getWithdrawApply() {
	return request.get('/api/withdraw-apply')
}
export function postWithdrawApply(data) {
	return request.post('/api/withdraw-apply', data)
}
export function getBankCard() {
	return request.get('/api/bank-card')
}
export function postBankCard(data) {
	return request.post('/api/bank-card', data)
}
export function delBankCard(id) {
	return request.del('/api/bank-card/' + id)
}
export function getBorrowApply() {
	return request.get('/api/borrow-apply')
}
export function postBorrowApply(data) {
	return request.post('/api/borrow-apply', data)
}
export function getStorePartners() {
	return request.get('/api/store/partners')
}
export function getFavourites(){
	return request.get('/api/worker/favourites')
}
export function postFavourites(data){
	return request.post('/api/worker/favourites',data)
}
export function delFavourites(id){
	return request.del(`/api/worker/favourites/${id}`)
}
