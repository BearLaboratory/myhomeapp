<template>
	<view class="main-container">
		<normal-header pageName="房间管理"></normal-header>
		<view class="rooms-body">
			<view class="header-box">
				<view class="">
					<text>请选择楼层后对房间管理</text>
				</view>
				<view class="action-box">
					<view class="" style="display: flex;align-items: center;margin-right: 30rpx;">
						<text
							style="font-size: 22rpx;margin-right: 10rpx;">{{selectedFloor.label?selectedFloor.label:'选择楼层'}}</text>
						<u-icon name="arrow-down-fill" @click="floorSelectShow=true" size="30"></u-icon>
					</view>
					<view class="">
						<u-icon name="plus" @click="showAddMask" size="40"
							:color="selectedFloor.label?'#303030':'#c8c9cc'"></u-icon>
					</view>
				</view>
			</view>
			<!-- body -->
			<view class="item-box-wrapper">
				<!-- 无数据提示 -->
				<u-empty text="暂无房间数据" mode="data" v-if="$store.state.roomList.length==0"></u-empty>
				<u-cell-group v-else>
					<u-cell-item :title="room.name" v-for="(room,index) in $store.state.roomList" :key='index'
						:arrow="false">
						<u-icon name="setting" slot="right-icon" @click="showModifyMask(room)"></u-icon>
					</u-cell-item>
				</u-cell-group>
			</view>
		</view>
		<!-- 添加楼层mask -->
		<u-mask :show="addMaskShow">
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="addMaskShow=false"></u-icon>
				</view>
				<u-field v-model="roomName" label="房间名" placeholder="例如: 卧室"></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<u-button type="success" @click="saveData">保存</u-button>
				</view>
			</view>
		</u-mask>
		
		
		<!-- 修改楼层mask -->
		<u-mask :show="modifyMaskShow" >
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="modifyMaskShow=false"></u-icon>
				</view>
				<u-field v-model="modifyData.name" label="楼层名" placeholder="例如: 一楼"></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<u-button type="success" @click="updateData">保存</u-button>
				</view>
			</view>
		</u-mask>
		<u-select v-model="floorSelectShow" mode="single-column" :list="$store.state.floorList" value-name="id"
			label-name="name" @confirm="selectConfirm"></u-select>
	</view>
</template>

<script>
	import NormalHeader from '../../components/NormalHeader.vue'
	export default {
		components: {
			NormalHeader
		},
		data() {
			return {
				floorSelectShow: false,
				addMaskShow: false,
				modifyMaskShow: false,
				selectedFloor: {},
				roomName: '',
				modifyData: {}
			}
		},
		created() {
			console.log(this.$store.state.floorList)
		},
		methods: {
			/**
			 * 显示新增框，必须要在选择楼层后才能显示
			 */
			showAddMask() {
				if (this.selectedFloor.value && this.selectedFloor.value != '') {
					this.addMaskShow = true
				}
			},
			saveData() {
				this.$u.api.roomAddOrUpdateApi({
					name: this.roomName,
					floorId: this.selectedFloor.value,
					familyId: this.$store.state.selectedFamily.id
				}).then(res => {
					if (res.status) {
						this.loadRoomsByFloorId(this.selectedFloor.value)
						this.addMaskShow = false
						this.roomName = ''
					}
				})
			},
			showModifyMask(roomData) {
				this.modifyData = roomData
				this.modifyMaskShow = true
			},
			updateData() {
				this.$u.api.roomAddOrUpdateApi(this.modifyData).then(res => {
					if (res.status) {
						this.loadRoomsByFloorId(this.selectedFloor.value)
						this.modifyMaskShow = false
					}
				})
			},
			loadRoomsByFloorId(floorId) {
				this.$u.api.roomListByFloorIdApi({
					floorId: floorId
				}).then(res => {
					if (res.status) {
						this.$store.commit('saveRoomList', res.data)
					}
				})
			},
			/**
			 * 楼层选择确认方法
			 * @param {Object} e 数组，被选择的.value label
			 */
			selectConfirm(e) {
				this.selectedFloor = e[0]
				if (e[0].value) {
					this.loadRoomsByFloorId(e[0].value)
				}
			}
		}
	}
</script>

<style lang="scss">
	.rooms-body {
		background-color: #FFFFFF;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;

		.header-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 20rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;

			.action-box {
				display: flex;
				align-items: center;
			}
		}

		.item-box-wrapper {
			padding-top: 40rpx;
			padding-bottom: 40rpx;
		}
	}

	.add-box {
		background-color: #FFFFFF;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 500rpx;
		padding: 20rpx;
	}
</style>
