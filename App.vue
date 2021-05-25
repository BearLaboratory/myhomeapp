<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		onLaunch: function() {
			//获取手机基本信息，用作页面数据计算
			this.setSystemInfo(uni.getSystemInfoSync())
			//锁定屏幕不旋转
			plus.screen.lockOrientation('portrait-primary')
			//将本地存储信息同步到vuex
			this.initData()
			//获取并监听网络状态
			uni.getNetworkType({
				success: (res) => {
					let obj = {}
					if (res.networkType == 'none') {
						obj.connect = false
					} else {
						obj.connect = true
						obj.type = res.networkType
					}
					this.setNetWork(obj)
				}
			})
			uni.onNetworkStatusChange((res) => {
				let obj = {}
				if (res.networkType == 'none') {
					obj.connect = false
				} else {
					obj.connect = true
					obj.type = res.networkType
				}
				this.setNetWork(obj)
			})
			if (!this.firstOpen) {
				uni.reLaunch({
					url: 'pages/index/index',
					success() {
						//跳转完页面后再关闭启动页
						plus.navigator.closeSplashscreen()
					}
				})
			} else {
				//第一次打开应用
				if (this.login) {
					//已登录跳转引导页
					uni.reLaunch({
						url: 'pages/guide/guide',
						success() {
							plus.navigator.closeSplashscreen()
						}
					})
				} else {
					//未登录跳转登录页
					uni.reLaunch({
						url: 'pages/login/login',
						success() {
							plus.navigator.closeSplashscreen()
						}
					})
				}

			}

			// this.goEasy.connect({
			// 	onSuccess: function() { //连接成功
			// 		console.log("GoEasy connect successfully.") //连接成功
			// 	},
			// 	onFailed: function(error) { //连接失败
			// 		console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
			// 	},
			// 	onProgress: function(attempts) { //连接或自动重连中
			// 		console.log("GoEasy is connecting", attempts);
			// 	}
			// })
			// uni.openBluetoothAdapter({
			// 	success() {
			// 		console.log('1.开启蓝牙适配器成功')
			// 		uni.startBeaconDiscovery({
			// 			ignoreBluetoothAvailable: true,
			// 			success(be) {
			// 				console.log('2.开启beancon发现', be)
			// 				uni.onBeaconUpdate(function(rr) {
			// 					console.log('3---', rr.beacons[0])

			// 				})
			// 			}
			// 		})
			// 	}
			// })
			//热更新
		},
		onShow: function() {
			//每次页面显示时如果用户已登录则上报用户在线状态
			if (this.login && this.selectedFamily) {
				this.$u.api.userAppOnlineApi({
					familyId: this.selectedFamily.id,
					userId: this.userInfo.id,
					status: true
				}).then(res => {
					if (res.status) {
						console.log('用户在线上报成功')
					}
				})
			}
		},
		onHide: function() {
			//用户已登录页面隐藏时上报用户离线
			if (this.login && this.selectedFamily) {
				this.$u.api.userAppOnlineApi({
					familyId: this.selectedFamily.id,
					userId: this.userInfo.id,
					status: false
				}).then(res => {
					if (res.status) {
						console.log('用户离线上报成功')
					}
				})
			}
		},
		methods: {
			...mapMutations(['initData', 'setSystemInfo', 'setNetWork'])
		},
		computed: {
			...mapState(['login', 'selectedFamily', 'token', 'userInfo', 'firstOpen'])
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	page {
		height: 100%;
		background-color: $u-bg-color;
	}

	.main-container {
		height: 100%;
	}
</style>
