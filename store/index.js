import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 用户登录后的token
		 */
		token: '',
		/**
		 * 用户是否是选择家庭的户主状态
		 */
		isHolder: false,
		/**
		 * 用户登录状态
		 */
		login: false,
		/**
		 * 用户信息对象
		 */
		userInfo: {},
		/**
		 * 选中家庭数据
		 */
		selectedFamily: {}

	},
	mutations: {
		/**
		 * 将本地存储的数据同步到state中
		 * @param {Object} state
		 */
		initData(state) {
			state.isHolder = uni.getStorageSync('isHolder')
			state.login = uni.getStorageSync('utoken') ? true : false
			state.token = uni.getStorageSync('utoken')
			state.selectedFamily = uni.getStorageSync('family')
			state.userInfo = uni.getStorageSync('userInfo')
		},
		/**
		 * 保存登录后数据
		 * @param {Object} state
		 * @param {Object} token
		 */
		saveLoginData(state, token) {
			state.login = true
			state.token = token
			uni.setStorageSync('utoken', token)
		},
		clearLoginData(state) {
			//清空登录数据
			state.login = false
			state.token = ''
			uni.clearStorageSync()
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
		 * 设置是否是户主
		 * @param {Object} state
		 * @param {Object} flag
		 */
		setIsHolder(state, flag) {
			state.isHolder = flag
			uni.setStorageSync('isHolder', flag)
		},
		saveSelectedFamily(state, familyObj) {
			state.selectedFamily = familyObj
			uni.setStorageSync('family', familyObj)
		}

	}
})

export default store
