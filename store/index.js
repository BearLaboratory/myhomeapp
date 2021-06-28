import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * app信息，版本更新时写死
		 */
		appInfo: {
			versionName: 'v1.0.0',
			versionCode: 100
		},
		/**
		 * 设备信息
		 */
		systemInfo: {},
		/**
		 * 手机网络类型
		 */
		netWorkInfo: {},
		/**
		 * 地理信息对象
		 */
		positionInfo: {},
		/**
		 * 登录信息对象
		 */
		loginInfo: {
			logined: false,
			token: ''
		},
		/**
		 * 用户信息对象
		 */
		userInfo: {},
		/**
		 * 用户所有关联家庭集合
		 */
		familyList: [],
		/**
		 * 选中家庭数据
		 */
		selectedFamily: {},
		/**
		 * 用户是否是选中家庭的户主
		 */
		isSelectedFamilyHolder: false,
		/**
		 * 选中家庭中楼层集合
		 */
		floorList: [],
		/**
		 * 选中楼层数据
		 */
		selectedFloor: {},
		/**
		 * 选中楼层下的所有房间集合
		 */
		roomList: [],
		/**
		 * 选中房间
		 */
		selectedRoom: {},

		/**
		 * 是否第一次打开APP
		 */
		isFirstOpen: true,
		/**
		 * 选中房间下喜欢设备集合
		 */
		favoriteDeviceList: [],
		/**
		 * 设备集合
		 */
		deviceList: []

	},
	mutations: {
		/**
		 * 保存系统信息
		 * @param {Object} state
		 * @param {Object} systemInfo
		 */
		saveSystemInfo(state, systemInfo) {
			state.systemInfo = systemInfo
		},
		/**
		 * 保存网络状态
		 * @param {Object} state
		 * @param {Object} network
		 */
		saveNetWorkInfo(state, network) {
			state.netWork = network
		},
		/**
		 * 保存位置信息
		 * @param {Object} state
		 * @param {Object} positionObject
		 */
		savePositionInfo(state, positionObject) {
			state.positionInfo = positionObject
		},
		/**
		 * 保存登录以后的数据
		 * @param {Object} state
		 * @param {Object} loginInfo
		 */
		saveLoginInfo(state, loginInfo) {
			state.loginInfo = loginInfo
			uni.setStorageSync('loginInfo', loginInfo)
		},
		/**
		 * 保存用户信息
		 * @param {Object} state
		 * @param {Object} userInfo
		 */
		saveUserInfo(state, userInfo) {
			state.userInfo = userInfo
			uni.setStorageSync('userInfo', userInfo)
		},
		/**
		 * 保存家庭集合
		 * @param {Object} state
		 * @param {Object} familyList
		 */
		saveFamilyList(state, familyList) {
			state.familyList = familyList
			uni.setStorageSync('familyList', familyList)
		},
		/**
		 * 保存选中家庭
		 * @param {Object} state
		 * @param {Object} familyObj
		 */
		saveSelectedFamily(state, familyObj) {
			state.selectedFamily = familyObj
			uni.setStorageSync('selectedFamily', familyObj)
		},
		/**
		 * 保存用户是否是选中家庭的户主
		 * @param {Object} state
		 * @param {Object} flag
		 */
		saveIsSelectedFamilyHolder(state, flag) {
			state.isSelectedFamilyHolder = flag
			uni.setStorageSync('isSelectedFamilyHolder', flag)
		},
		/**
		 * 保存选中家庭所有楼层集合
		 * @param {Object} state
		 * @param {Object} flist
		 */
		saveFloorList(state, flist) {
			state.floorList = flist
			uni.setStorageSync('floorList', flist)
		},
		/**
		 * 保存选中的楼层
		 * @param {Object} state
		 * @param {Object} selectedFloor
		 */
		saveSelectedFloor(state, selectedFloor) {
			state.selectedFloor = selectedFloor
			uni.setStorageSync('selectedFloor', selectedFloor)
		},
		/**
		 * 保存选中楼层下所有房间集合
		 * @param {Object} state
		 * @param {Object} roomList
		 */
		saveRoomList(state, roomList) {
			state.roomList = roomList
			uni.setStorageSync('roomList', roomList)
		},
		/**
		 * 保存选中房间
		 * @param {Object} state
		 * @param {Object} selectedRoom
		 */
		saveSelectedRoom(state, selectedRoom) {
			state.selectedRoom = selectedRoom
			uni.setStorageSync('selectedRoom', selectedRoom)
		},

		/**
		 * 保存app是否被第一次打开状态
		 * @param {Object} state
		 * @param {Object} firstOpen
		 */
		saveIsFirstOpen(state, flag) {
			state.isFirstOpen = flag
			uni.setStorageSync('isFirstOpen', flag)
		},
		/**
		 * 保存喜欢设备集合
		 * @param {Object} state
		 * @param {Object} deviceList
		 */
		saveFavoriteDeviceList(state, deviceList) {
			state.favoriteDeviceList = deviceList
		},
		saveDeviceList(state, deviceList) {
			state.deviceList = deviceList
		},

		/**
		 * 将本地存储的数据同步到state中
		 * @param {Object} state
		 */
		initData(state) {
			state.loginInfo = uni.getStorageSync('loginInfo')
			state.userInfo = uni.getStorageSync('userInfo')
			state.familyList = uni.getStorageSync('familyList')
			state.selectedFamily = uni.getStorageSync('selectedFamily')
			state.isSelectedFamilyHolder = uni.getStorageSync('isSelectedFamilyHolder')
			state.floorList = uni.getStorageSync('floorList')
			state.selectedFloor = uni.getStorageSync('selectedFloor')
			state.roomList = uni.getStorageSync('roomList')
			state.selectedRoom = uni.getStorageSync('selectedRoom')
			state.isFirstOpen = uni.getStorageSync('isFirstOpen')
		}
	}
})

export default store
