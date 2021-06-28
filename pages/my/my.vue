<template>
	<view class="main-container">
		<!-- 头部信息框 -->
		<view class="header-box" :style="{'padding-top':$store.state.systemInfo.statusBarHeight+'px'}">
			<view class="header-info-box">
				<view class="mail-box">
					<u-badge :is-dot="true" type="error" :offset="[0,-10]" v-show="haveNotRead"></u-badge>
					<u-icon name="email-fill" size="40" @click="gotoMessage"></u-icon>
				</view>
				<view class="slogan-box">
					<text>MyHome</text>
				</view>
				<view class="setting-box">
					<u-icon name="setting-fill" size="40" @click="showSettingPage"></u-icon>
				</view>
			</view>
			<view class="avatar-box-wrapper">
				<view class="avatar-box" @click="gotoInfoPage">
					<u-avatar :src="$store.state.userInfo.avatar" size="100" :show-level="true"
						:show-sex="$store.state.userInfo.sex?true:false"
						:sex-icon="$store.state.userInfo.sex==1?'man':'woman'"></u-avatar>
					<text>{{$store.state.userInfo.name}}</text>
					<u-tag text="户主" type="warning" size="mini" v-if="$store.state.isSelectedFamilyHolder" />
				</view>
			</view>
		</view>
		<!-- 体 -->
		<u-cell-group>
			<u-cell-item title="家庭管理" @click="gotoFamilyManage">
				<u-icon name="../../static/icons/familly.png" slot="icon" size="34" style="margin-right: 10rpx;">
				</u-icon>
			</u-cell-item>
			<u-cell-item title="楼层管理" @click="gotoFloorManage" v-show="$store.state.isSelectedFamilyHolder">
				<u-icon name="../../static/icons/floor.png" slot="icon" size="34" style="margin-right: 10rpx;"></u-icon>
			</u-cell-item>
			<u-cell-item title="房间管理" @click="gotoRoomManage" v-show="$store.state.isSelectedFamilyHolder">
				<u-icon name="../../static/icons/rooms.png" slot="icon" size="34" style="margin-right: 10rpx;"></u-icon>
			</u-cell-item>
			<u-cell-item title="设备管理" @click="gotoDeviceManage" v-show="$store.state.isSelectedFamilyHolder">
				<u-icon name="../../static/icons/device.png" slot="icon" size="34" style="margin-right: 10rpx;">
				</u-icon>
			</u-cell-item>
			<u-cell-item title="辅助设备" @click="gotoAssistentDevice">
				<u-icon name="../../static/icons/assistent.png" slot="icon" size="34" style="margin-right: 10rpx;">
				</u-icon>
			</u-cell-item>
		</u-cell-group>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				haveNotRead: false
			}
		},
		onShow() {
			this.doCheckNotReadMessage()
		},
		methods: {
			doCheckNotReadMessage() {
				this.$u.api.checkNotReadMessageApi().then(res => {
					if (res.status) {
						this.haveNotRead = res.data
					}
				})
			},
			gotoFloorManage() {
				uni.navigateTo({
					url: '../floormanage/floormanage'
				})
			},
			gotoMessage() {
				uni.navigateTo({
					url: '../messagemanage/messagemanage'
				})
			},
			/**
			 * 显示房间管理页面
			 */
			gotoRoomManage() {
				uni.navigateTo({
					url: '../roommanage/roommanage'
				})
			},
			gotoFamilyManage() {
				uni.navigateTo({
					url: '../familymanage/familymanage'
				})
			},
			/**
			 * 显示设备管理页面
			 */
			gotoDeviceManage() {
				uni.navigateTo({
					url: '../devicemanage/devicemanage'
				})
			},
			/**
			 * 显示辅助设备管理
			 */
			gotoAssistentDevice() {
				uni.navigateTo({
					url: '../assistentdevice/assistentdevice'
				})
			},

			/**
			 * 显示设置页
			 */
			showSettingPage() {
				uni.navigateTo({
					url: '../setting/setting'
				})
			},
			gotoInfoPage() {
				uni.navigateTo({
					url: '../myinfo/myinfo'
				})
			}
		}
	}
</script>

<style lang="scss">
	.header-box {
		background-color: #FFFFFF;

		.header-info-box {
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;
			height: 40rpx;

			.mail-box {
				display: flex;
				align-items: center;
				position: relative
			}

			.slogan-box {
				display: flex;
				align-items: center;
				font-size: 40rpx;
				font-weight: bold;
				color: #303030;
			}

			.setting-box {
				display: flex;
				align-items: center;
			}
		}

		.avatar-box-wrapper {
			display: flex;
			justify-content: center;
			padding: 40rpx 0;

			.avatar-box {
				display: flex;
				flex-direction: column;
				align-items: center;

				text {
					margin-top: 20rpx;
					font-size: 30rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}
</style>
