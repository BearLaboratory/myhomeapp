//家庭相关
let familyAddOrUpdateUrl = '/family/addOrUpdate'
let familyListUrl = '/family/familyList'
let confirmJoinUrl = '/family/confirmJoin'
let checkIsHolerUrl = '/family/checkIsHolder'

// floor相关
let floorAddOrUpdateUrl = '/floor/addOrUpdate'
let floorListByFamilyIdUrl = '/floor/listByFamilyId'

//room相关
let roomAddOrUpdateUrl = '/room/addOrUpdate'
let roomListByFloorIdUrl = '/room/listByFloorId'
let listAllByFamilyIdUrl = '/room/listAllByFamilyId'

//device相关
let deviceListByRoomIdUrl = '/device/listByRoomId'
let changeFavoriteUrl = '/device/changeFavorite'
let doControlUrl = '/device/doControl'
let addDeviceUrl = '/device/addDevice'

//用户相关
let searchUserByPhoneUrl = '/user/searchUserByPhone'
let loginByValidCodeUrl = '/user/loginByPhone'
let registByPhonePasswordUrl = '/user/registByPhonePassword'
let getUserInfoUrl = '/user/getUserInfo'
let updateUserInfoUrl = '/user/updateUserInfo'
let userAppOnlineUrl = '/user/userAppOnline'
let getValidCodeUrl = '/validCode/getCodeByPhone'
let uploadSelectedFamilyUrl = '/user/uploadSelectedFamily'
let uploadSelectedFloorUrl = '/user/uploadSelectedFloor'
let uploadSelectedRoomUrl = '/user/uploadSelectedRoom'
let addUser2FamilyUrl = '/user/addUser2Family'

//消息相关
let allMessageUrl = '/message/allMessage'
let readMessageUrl = '/message/readMessage'
let checkNotReadMessageUrl = '/message/checkNotReadMessage'
let getMessageByIdUrl = '/message/getMessageById'

//文件相关
let uploadImgUrl = '/file/uploadImg'

//app版本相关
let versionCheckUrl = '/appVersion/versionCheck'
let getNewAppUrl = '/appVersion/getNewApp'


const install = (Vue, vm) => {
	// 家庭相关
	let familyAddOrUpdateApi = (params = {}) => vm.$u.post(familyAddOrUpdateUrl, params)
	let familyListApi = (params = {}) => vm.$u.get(familyListUrl, params)
	let confirmJoinApi = (params = {}) => vm.$u.get(confirmJoinUrl, params)
	let checkIsHolerApi = (params = {}) => vm.$u.get(checkIsHolerUrl, params)
	let uploadSelectedFamilyApi = (params = {}) => vm.$u.post(uploadSelectedFamilyUrl, params)
	// 楼层相关
	let floorAddOrUpdateApi = (params = {}) => vm.$u.post(floorAddOrUpdateUrl, params)
	let floorListByFamilyIApi = (params = {}) => vm.$u.get(floorListByFamilyIdUrl, params)
	// 房间相关
	let roomAddOrUpdateApi = (params = {}) => vm.$u.post(roomAddOrUpdateUrl, params)
	let roomListByFloorIdApi = (params = {}) => vm.$u.get(roomListByFloorIdUrl, params)
	let listAllByFamilyIdApi = (params = {}) => vm.$u.get(listAllByFamilyIdUrl, params)
	let uploadSelectedRoomApi = (params = {}) => vm.$u.post(uploadSelectedRoomUrl, params)
	// 设备相关
	let deviceListByRoomIdApi = (params = {}) => vm.$u.get(deviceListByRoomIdUrl, params)
	let changeFavoriteApi = (params = {}) => vm.$u.post(changeFavoriteUrl, params)
	let doControlApi = (params = {}) => vm.$u.post(doControlUrl, params)
	let addDeviceApi = (params = {}) => vm.$u.post(addDeviceUrl, params)
	// 用户相关
	let searchUserByPhoneApi = (params = {}) => vm.$u.get(searchUserByPhoneUrl, params)
	let loginByValidCodeApi = (params = {}) => vm.$u.post(loginByValidCodeUrl, params)
	let registByPhonePasswordApi = (params = {}) => vm.$u.post(registByPhonePasswordUrl, params)
	let getUserInfoApi = (params = {}) => vm.$u.get(getUserInfoUrl, params)
	let updateUserInfoApi = (params = {}) => vm.$u.post(updateUserInfoUrl, params)
	let userAppOnlineApi = (params = {}) => vm.$u.post(userAppOnlineUrl, params)
	let uploadSelectedFloorApi = (params = {}) => vm.$u.post(uploadSelectedFloorUrl, params)
	let getValidCodeApi = (params = {}) => vm.$u.get(getValidCodeUrl, params)
	let addUser2FamilyApi = (params = {}) => vm.$u.post(addUser2FamilyUrl, params)
	// 消息相关
	let allMessageApi = (params = {}) => vm.$u.get(allMessageUrl, params)
	let checkNotReadMessageApi = (params = {}) => vm.$u.get(checkNotReadMessageUrl, params)
	let getMessageByIdApi = (params = {}) => vm.$u.get(getMessageByIdUrl, params)
	let readMessageApi = (params = {}) => vm.$u.get(readMessageUrl, params)
	// 文件相关
	let uploadImgApi = (params = {}) => vm.$u.post(uploadImgUrl, params)
	// app相关
	let versionCheckApi = (params = {}) => vm.$u.get(versionCheckUrl, params)
	let getNewAppApi = (params = {}) => vm.$u.get(getNewAppUrl, params)


	vm.$u.api = {
		// 家庭相关
		familyAddOrUpdateApi,
		familyListApi,
		checkIsHolerApi,
		// 楼层相关
		// 房间相关
		// 设备相关
		// 用户相关
		addUser2FamilyApi,
		// 消息相关
		allMessageApi,
		checkNotReadMessageApi,
		getMessageByIdApi,
		readMessageApi,
		// 文件相关
		// app相关
		getNewAppApi,
		floorAddOrUpdateApi,
		floorListByFamilyIApi,
		roomAddOrUpdateApi,
		roomListByFloorIdApi,
		listAllByFamilyIdApi,
		deviceListByRoomIdApi,
		changeFavoriteApi,
		doControlApi,
		addDeviceApi,


		confirmJoinApi,

		searchUserByPhoneApi,
		loginByValidCodeApi,
		registByPhonePasswordApi,
		getUserInfoApi,
		updateUserInfoApi,
		userAppOnlineApi,
		uploadSelectedFamilyApi,
		uploadSelectedFloorApi,
		uploadSelectedRoomApi,
		getValidCodeApi,


		uploadImgApi,
		versionCheckApi

	}
}

export default {
	install
}
