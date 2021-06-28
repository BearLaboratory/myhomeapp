<template>
	<view class="header-box" :style="{'padding-top':$store.state.systemInfo.statusBarHeight+'px'}">
		<view class="header-wrapper">
			<!-- 设备搜索框 -->
			<view class="search-box-wrapper" :style="{'width':(searchShow?'100%':'20%')}">
				<view class="search-box" v-show="$store.state.deviceList.length!=0">
					<u-icon name="search" size="35" @click="searchShow = !searchShow"></u-icon>
					<view style="width: 80%;margin-left: 20rpx;" v-show="searchShow">
						<u-input v-model="searchInput" type="text" placeholder="请输入设备名" maxlength="10" :border="true"
							height="50" :trim="true" :focus="searchShow" confirm-type="search" @confirm="searchConfirm"
							@clear="clearConfirm"></u-input>
					</view>
					<u-icon name="close" size="30" @click="searchShow = !searchShow" style="margin-left: 20rpx;"
						v-if="searchShow"></u-icon>
				</view>
			</view>
			<!-- slogan框 -->
			<view class="slogan-box" v-show="!searchShow">
				<text>MyHome</text>
			</view>
			<!-- 家庭选择框 -->
			<view class="select-box-wrapper">
				<view class="select-box" v-show="$store.state.floorList.length!=0">
					<text
						style="font-size: 25rpx;margin-right: 10rpx;">{{$store.state.selectedFloor?$store.state.selectedFloor.name:'选择楼层'}}</text>
					<u-icon name="arrow-down-fill" size="30" color="#c8c9cc" @click="selectFloorSelectShow"></u-icon>
					<u-select v-model="selectFloorShow" :list="$store.state.floorList" value-name="id" label-name="name"
						@confirm="selectConfirm" :default-value="[selectedFloorIndex]"></u-select>
				</view>
			</view>
		</view>
		<view class="list-wrapper">
			<!-- 房间选择标签 -->
			<u-tabs ref="tabs" :list="$store.state.roomList" active-color="#303030" inactive-color="#c8c9cc"
				:current="selectedRoomIndex" bar-width="60" :show-bar="false" @change="roomChange" height="80"></u-tabs>
		</view>

	</view>
</template>
<script>
	export default {
		computed: {
			/**
			 * 被选中楼层的ID
			 */
			selectedFloorIndex() {
				for (var i = 0; i < this.$store.state.floorList.length; i++) {
					if (this.$store.state.floorList[i].id === this.$store.state.selectedFloor.id) {
						return i
					}
				}
			},
			/**
			 * 被选中房间的ID
			 */
			selectedRoomIndex() {
				for (var i = 0; i < this.$store.state.roomList.length; i++) {
					if (this.$store.state.roomList[i].id === this.$store.state.selectedRoom.id) {
						return i
					}
				}
			}

		},
		data() {
			return {
				selectFloorShow: false,
				searchShow: false,
				searchInput: ''
			}
		},
		methods: {
			/** 
			 * 楼层选择确认
			 * @param {Object} e 数组，被选择的.value label
			 */
			selectConfirm(e) {
				//先遍历整个集合
				this.$store.state.floorList.forEach(item => {
					if (item.id === e[0].value && this.$store.state.selectedFloor.id != e[0].value) {
						this.$store.commit('saveSelectedFloor', item)
						this.$emit('floorSelect', {})
					}
				})

			},
			/**
			 * 房间选择确认
			 * @param {Object} e index从0开始
			 */
			roomChange(e) {
				for (var i = 0; i < this.$store.state.roomList.length; i++) {
					if (i === e && this.$store.state.selectedRoom.id != this.$store.state.roomList[i].id) {
						this.$store.commit('saveSelectedRoom', this.$store.state.roomList[i])
						this.$emit('roomSelect', {})
					}
				}
			},
			selectFloorSelectShow() {
				this.selectFloorShow = true

			},
			searchConfirm() {
				this.$emit('searchConfirm', this.searchInput)
				this.searchShow = false
			},
			clearConfirm() {
				this.$emit('searchConfirm', '')
				this.searchInput = ''
				this.searchShow = false
			}
		}
	}
</script>

<style lang="scss">
	.header-box {
		position: fixed;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 1000;

		.header-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			height: 40rpx;

			.search-box-wrapper {
				width: 20%;

				.search-box {
					display: flex;
					align-items: center;
				}
			}

			.slogan-box {
				display: flex;
				justify-content: center;
				font-size: 40rpx;
				font-weight: bold;
				color: #303030;
				width: 60%;
			}

			.select-box-wrapper {
				width: 20%;

				.select-box {
					display: flex;
					align-items: center;
					justify-content: flex-end;
				}
			}


		}

		.list-wrapper {
			margin-top: 20rpx;


		}

	}
</style>
