<template>
	<view class="main-container">
		<normal-header pageName="楼层管理"></normal-header>
		<view class="floor-body">
			<view class="header-box">
				<view class="">
					<text>请选择楼层设置</text>
				</view>
				<view class="action-box">
					<view class="">
						<u-icon name="plus" @click="addMaskShow=true" size="40" color="#303030"></u-icon>
					</view>
				</view>
			</view>
			<view class="item-box-wrapper">
				<!-- 无数据提示 -->
				<u-empty text="暂无楼层数据" mode="data" v-if="$store.state.floorList.length==0"></u-empty>
				<u-cell-group v-else>
					<u-cell-item :title="floor.name" v-for="(floor,index) in $store.state.floorList" :key='index'
						:arrow="false">
						<u-icon name="setting" slot="right-icon" @click="showModify(floor)"></u-icon>
					</u-cell-item>
				</u-cell-group>
			</view>
		</view>
		<!-- 添加楼层mask -->
		<u-mask :show="addMaskShow">
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="closeMarsk"></u-icon>
				</view>
				<u-field v-model="floorName" label="楼层名" placeholder="例如: 一楼"></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<u-button type="success" @click="saveFloor">保存</u-button>
				</view>
			</view>
		</u-mask>
		<!-- 修改楼层mask -->
		<u-mask :show="modifyMaskShow">
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="modifyMaskShow=false"></u-icon>
				</view>
				<u-field v-model="modifyFloorData.name" label="楼层名" placeholder="例如: 一楼"></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<u-button type="success" @click="updateFloor">保存</u-button>
				</view>
			</view>
		</u-mask>
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
				addMaskShow: false,
				modifyMaskShow: false,
				floorName: '',
				modifyFloorData: {}
			}
		},
		created() {
			this.loadData()
		},
		methods: {
			closeMarsk() {
				this.addMaskShow = false
				this.floorName = ''
			},
			loadData() {
				this.$u.api.floorListByFamilyIApi({
					familyId: this.$store.state.selectedFamily.id
				}).then(res => {
					if (res.status) {
						this.$store.commit('saveFloorList', res.data)
						if (res.data.length > 0) {
							if (!this.$store.state.selectedFloor) {
								this.$store.commit('saveSelectedFloor', res.data[0])
							}
						}
					}
				})
			},
			saveFloor() {
				if (this.floorName && this.$u.trim(this.floorName) != '') {
					this.$u.api.floorAddOrUpdateApi({
						name: this.floorName,
						familyId: this.$store.state.selectedFamily.id
					}).then(res => {
						if (res.status) {
							this.addMaskShow = false
							this.floorName = ''
							this.loadData()
						}
					})
				}
			},
			updateFloor() {
				this.$u.api.floorAddOrUpdateApi(this.modifyFloorData).then(res => {
					if (res.status) {
						this.loadData()
						this.modifyMaskShow = false
					}
				})

			},
			/**
			 * 显示修改楼层
			 * @param {Object} floorData 楼层数据
			 */
			showModify(floorData) {
				this.modifyFloorData = floorData
				this.modifyMaskShow = true
			}
		}
	}
</script>

<style lang="scss">
	.floor-body {
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
