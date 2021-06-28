<template>
	<view style="height: 100%;">
		<common-header @floorSelect="floorSelect" @roomSelect="roomSelect" @searchConfirm="doSearchDevice">
		</common-header>
		<view class="main-container"
			:style="{'padding-top': 135 + 750 * $store.state.systemInfo.statusBarHeight / 375 + 'rpx'}">
			<view class="main-box">
				<view class="device-line">
					<view class="device-card" v-for="(device,index) in realDeviceList" :key="device.id">
						<view class="collect-box">
							<u-icon :name="device.favorite?'star-fill':'star'" size="40"
								:color="device.favorite?'#F29100':'#c8c9cc'" @click="changeFavorite(device)"></u-icon>
							<text v-show="!device.online">设备离线</text>
						</view>
						<view class="icon-name-box">
							<u-image width="100rpx" height="100rpx"
								:src="device.open?'../../static/device/'+device.iconPath+'-active.png':'../../static/device/'+device.iconPath+'.png'">
							</u-image>
							<text>{{device.name}}</text>
							<text class="openText"
								v-if="device.type==1&&device.subType==1">{{device.open?'打开':'关闭'}}</text>
							<text class="openText"
								v-if="device.type==1&&device.subType==2">{{device.rate>0?device.rate+'%':'关闭'}}</text>
						</view>
						<!-- 开关型设备 -->
						<view class="action-box" v-if="device.type==1&&device.subType==1">
							<u-switch v-model="device.open" active-color="#42B983" size="40" :loading="false"
								@change="doControlDevice(device,index)" :disabled="!device.online"></u-switch>
						</view>
						<!-- 比例型设备 -->
						<view class="action-rate-box" v-if="device.type==1&&device.subType==2">
							<u-slider v-model="device.rate" height="40" activeColor="#42B983" block-width="50"
								@end="doControlDevice(device,index)" :disabled="!device.online"></u-slider>
						</view>
						<view class="action-temp-box" v-if="device.type==2&&device.subType==1">
							<text style="color: #000000;">温度: {{device.payload.temperature}}℃ </text>
							<text style="color: #000000;margin-top: 10rpx;">湿度: {{device.payload.humidity}}%</text>
						</view>
					</view>
					<!-- 无家庭提示 -->
					<view class="no-device-wrapper" v-if="$store.state.familyList.length==0">
						<u-empty src="../../static/common/family.png" text="无家庭信息">
							<u-button type="success" slot="bottom" style="margin-top: 50rpx;"
								@click="gotoFamilyManage()">
								添加家庭
							</u-button>
						</u-empty>
					</view>
					<!-- 无楼层提示 -->
					<view class="no-device-wrapper"
						v-if="$store.state.familyList.length!=0 &&$store.state.floorList.length==0">
						<u-empty src="../../static/common/floor.png" text="无楼层信息">
							<u-button type="success" slot="bottom" style="margin-top: 50rpx;"
								@click="gotoFloorManage()">
								添加楼层
							</u-button>
						</u-empty>
					</view>
					<!-- 无房间提示 -->
					<view class="no-device-wrapper"
						v-if="$store.state.familyList.length!=0 &&$store.state.floorList.length!=0&&$store.state.roomList.length==0">
						<u-empty src="../../static/common/floor.png" text="无房间信息">
							<u-button type="success" slot="bottom" style="margin-top: 50rpx;" @click="gotoRoomManage()">
								添加房间
							</u-button>
						</u-empty>
					</view>
					<!-- 无设备提示 -->
					<view class="no-device-wrapper"
						v-if="$store.state.familyList.length!=0 &&$store.state.floorList.length!=0&&$store.state.roomList.length!=0&&$store.state.deviceList.length==0">
						<u-empty src="../../static/common/device.png" text="无收藏设备">
						</u-empty>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import CommonHeader from "../../components/CommonHeader.vue"
	export default {
		components: {
			CommonHeader
		},
		data() {
			return {
				//房间集合
				roomList: [],
				//设备集合
				deviceList: [],
				//真实设备集合（搜索以后的）
				realDeviceList: []
			}
		},
		created() {
			// 查询最新版本，判断是否需要升级
		},
		onShow() {
			var that = this
			if (this.selectedFamily) {
				// that.goEasy.subscribe({
				// 	channel: 'devicePush::' + that.selectedFamily.id,
				// 	onMessage: function(message) {
				// 		let contentObj = JSON.parse(message.content)
				// 		for (var i = 0; i < that.realDeviceList.length; i++) {
				// 			if (that.realDeviceList[i].id == contentObj.deviceId) {
				// 				switch (that.realDeviceList[i].type) {
				// 					case 1:
				// 						if (contentObj.online != undefined) {
				// 							that.realDeviceList[i].online = contentObj.online
				// 						}
				// 						that.realDeviceList[i].open = contentObj.open
				// 						break
				// 					case 2:
				// 						if (contentObj.online != undefined) {
				// 							that.realDeviceList[i].online = contentObj.online
				// 						} else {
				// 							that.realDeviceList[i].payload = contentObj.payload
				// 						}
				// 						break
				// 					default:
				// 						console.log('设备状态设备类型不匹配')
				// 				}
				// 			}
				// 		}
				// 	},
				// 	onSuccess: function() {
				// 		console.log("设备状态Channel订阅成功。");
				// 	},
				// 	onFailed: function(error) {
				// 		console.log("设备状态Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
				// 	}
				// })
			}
		},
		methods: {
			loadRoomListByFloorId() {
				this.$u.api.roomListByFloorIdApi({
					floorId: this.$store.state.selectedFloor.id
				}).then(res => {
					if (res.status) {
						this.$store.commit('saveRoomList', res.data)
					}
				})
			},
			loadDeviceByRoomSelectd() {
				this.$u.api.deviceListByRoomIdApi({
					familyId: this.$store.state.selectedFamily.id,
					roomId: this.$store.state.selectedRoom.id,
					favorite: true
				}).then(res => {
					if (res.status) {
						this.$store.commit('saveFavoriteDeviceList', res.data)
					}
				})
			},
			floorSelect() {
				this.$u.api.uploadSelectedFloorApi(this.$store.state.selectedFloor).then(res => {
					this.loadRoomListByFloorId()
				})
			},
			roomSelect() {
				this.$u.api.uploadSelectedRoomApi(this.$store.state.selectedRoom).then(res => {
					if (res.status) {
						this.loadDeviceByRoomSelectd()
					}
				})
			},
			gotoFamilyManage() {
				uni.navigateTo({
					url: '../familymanage/familymanage'
				})
			},
			gotoFloorManage() {
				uni.navigateTo({
					url: '../floormanage/floormanage'
				})
			},
			gotoRoomManage() {
				uni.navigateTo({
					url: '../roommanage/roommanage'
				})
			},
			gotoDeviceManage() {
				uni.navigateTo({
					url: '../devicemanage/devicemanage'
				})
			},
			/**
			 * 改变设备的收藏状态
			 * @param {Object} deviceData
			 */
			changeFavorite(deviceData) {
				this.$u.api.changeFavoriteApi({
					id: deviceData.id,
					favorite: !deviceData.favorite
				}).then(res => {
					if (res.status) {
						this.loadDeviceByRoomSelectd(this.selectedRoomId)
					}
				})
			},
			/**
			 * 控制设备
			 * @param {Object} device
			 */
			doControlDevice(device, arrayIndex) {
				//本地判断
				let deviceType = device.type
				if (deviceType == 131 || deviceType == 132) {
					this.deviceList[arrayIndex].open = device.rate > 0
				}
				this.$u.api.doControlApi(device).then(res => {
					if (res.status) {
						console.log('成功')
					}
				})
			},
			/**
			 * 本地搜索设备
			 */
			doSearchDevice(searchKey) {
				if (searchKey == '') {
					this.realDeviceList = this.deviceList
				} else {
					this.realDeviceList = []
					for (var i = 0; i < this.deviceList.length; i++) {
						if (this.deviceList[i].name.indexOf(searchKey) != -1) {
							this.realDeviceList.push(this.deviceList[i])
						}

					}
				}
			}

		}
	}
</script>

<style lang="scss">
	.main-box {
		padding-bottom: 22rpx;
	}

	.device-line {
		display: flex;
		justify-content: space-between;
		margin-left: 22rpx;
		margin-right: 22rpx;
		flex-wrap: wrap;

		.no-device-wrapper {
			display: flex;
			justify-content: center;
			width: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.device-card {
			width: 340rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			padding: 20rpx;
			margin-top: 22rpx;

			.collect-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					font-size: 22rpx;
					color: #C8C9CC;
				}
			}

			.icon-name-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 20rpx;

				text {
					margin-top: 20rpx;
					font-size: 25rpx;
					font-weight: bold;
				}

				.openText {
					font-size: 24rpx;
					color: #C8C9CC;
				}
			}

			.action-box {
				display: flex;
				justify-content: center;
				margin-top: 30rpx;
				padding: 20rpx;
			}

			.action-rate-box {
				margin-top: 30rpx;
				padding: 20rpx;
			}

			.action-temp-box {
				margin-top: 20rpx;
				display: flex;
				flex-direction: column;
				text-align: center;
				padding-bottom: 20rpx;
			}
		}
	}
</style>
