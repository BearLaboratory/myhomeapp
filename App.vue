<script>
	import {
		mapState
	} from 'vuex'
	export default {
		onLaunch: function() {
			//01 检查最新APP,如果有热更新包则下载安装,整包更新提示用户下载安装

			//0 最先调这个接口，因为异步所以最先调用最先查询当前地址，根据地址大致判断是否进入家庭范围进行切换
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: (res) => {
					if (res.address) {
						this.$store.commit('savePositionInfo', res.address)
						console.log('详细地址信息===>', this.$store.state.positionInfo)
					}
				}
			})
			//1. 锁定屏幕不旋转
			plus.screen.lockOrientation('portrait-primary')
			//2. 获取手机基本信息，用作页面数据计算
			this.$store.commit('saveSystemInfo', uni.getSystemInfoSync())
			//3. 获取并监听网络状态
			uni.getNetworkType({
				success: (res) => {
					let obj = {}
					if (res.networkType == 'none') {
						obj.connect = false
					} else {
						obj.connect = true
						obj.type = res.networkType
					}
					this.$store.commit('saveNetWorkInfo', obj)
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
				this.$store.commit('saveNetWorkInfo', obj)
			})

			//4. 将本地存储信息同步到vuex，如果用户没有登录就没有必要去同步！！！！！
			this.$store.commit('initData')



			if (!this.$store.state.firstOpen) {
				uni.reLaunch({
					url: 'pages/index/index',
					success() {
						//跳转完页面后再关闭启动页
						plus.navigator.closeSplashscreen()
					}
				})
			} else {
				//第一次打开应用
				if (this.$store.state.loginInfo.logined) {
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
			if (this.$store.state.login && this.selectedFamily) {
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
			if (this.$store.state.login && this.selectedFamily) {
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
		computed: {
			...mapState(['selectedFamily', 'token', 'userInfo'])
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
