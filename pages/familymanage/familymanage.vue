<template>
	<view class="main-container">
		<u-toast ref="uToast" />
		<normal-header pageName="家庭管理"></normal-header>
		<view class="add-body">
			<view class="header-box">
				<view class="">
					<text>新增家庭或者添加成员</text>
				</view>
				<view class="action-box">
					<view style="display: flex;align-items: center;margin-right: 30rpx;"
						v-if="$store.state.familyList.length>0">
						<u-icon name="../../static/addfamily-64.png" @click="addUser=true" size="40"></u-icon>
					</view>
					<view class="">
						<u-icon name="plus" @click="addFamily=true" size="40" color="#303030"></u-icon>
					</view>
				</view>
			</view>
			<view class="item-box-wrapper">
				<view class="family-cad-item" v-for="(family,index) in $store.state.familyList" :key="index">
					<view class="card-header-box" @click="showModifyMask(family)">
						<view>
							<text style="font-size: 30rpx;">{{family.name}}</text>
						</view>
						<view style="font-size: 20rpx;">
							{{family.floorCount}}层 | {{family.roomCount}}个房间 | {{family.deviceCount}}个设备
						</view>
					</view>
					<view class="icon-box">
						<view class="icon-wrapper"
							:style="{'background-color':selectedIndex==index?'#18b566':'#c8c9cc'}"
							@click="cardSelected(family,index)">
							<u-icon name="checkmark" size="30" color="#ffffff"></u-icon>
						</view>
					</view>
				</view>
				<!-- 无数据提示 -->
				<u-empty text="暂无家庭数据" mode="data" v-if="$store.state.familyList.length==0"></u-empty>
			</view>
		</view>
		<!-- 添加用户mask -->
		<u-mask :show="addUser">
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="closeAddUserMarsk"></u-icon>
				</view>
				<u-field v-model="userPhone" label="手机号" placeholder="例如: 13000000000"></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<!-- 新增用户时先搜索然后再添加-->
					<u-button type="success" @click="doSearchUser" :disabled="userPhone==''">邀请用户</u-button>
				</view>
			</view>
		</u-mask>
		<!-- 添加家庭mask -->
		<u-mask :show="addFamily">
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="closeMarsk"></u-icon>
				</view>
				<u-field v-model="familyObject.name" label="家庭名" placeholder="例如: 大熊家" clearable></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<u-button type="success" @click="saveData">保存</u-button>
				</view>
			</view>
		</u-mask>
		<!-- 修改mask -->
		<u-mask :show="modifyFamily">
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="modifyFamily=false"></u-icon>
				</view>
				<u-field v-model="familyObject.name" label="家庭名" placeholder="例如: 大熊家"></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<u-button type="success" @click="updateData">保存</u-button>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import NormalHeader from '../../components/NormalHeader.vue'
	export default {
		components: {
			NormalHeader
		},
		data() {
			return {
				selectedIndex: 0,
				addFamily: false,
				modifyFamily: false,
				addUser: false,
				modifyMaskShow: false,
				userPhone: '',
				userExist: false,
				familyObject: {}

			}
		},
		created() {
			this.loadFamilyList()
		},
		watch: {
			userPhone(nv, ov) {
				if (nv == '') {
					this.userExist = false
				}
			}
		},
		methods: {
			/**
			 * 加载家庭信息
			 */
			loadFamilyList() {
				this.$u.api.familyListApi().then(res => {
					if (res.status) {
						console.log('familyList', res.data)
						this.$store.commit('saveFamilyList', res.data)
						//默认选中第一项
						if (res.data.length > 0 && !this.$store.state.selectedFamily) {
							this.$store.commit('saveSelectedFamily', res.data[0])
							this.$u.api.checkIsHolerApi({
								familyId: res.data[0].id
							}).then(res => {
								if (res.status) {
									this.$store.commit('saveIsSelectedFamilyHolder', res.data)
								}
							})
						} else {
							for (var i = 0; i < this.$store.state.familyList.length; i++) {
								if (this.$store.state.familyList[i].id == this.$store.state.selectedFamily.id) {
									this.selectedIndex = i
								}
							}
						}
					}
				})
			},
			cardSelected(family, index) {
				this.$store.commit('saveSelectedFamily', family)
				//查询用户是否是户主
				this.$u.api.checkIsHolerApi({
					familyId: family.id
				}).then(res => {
					if (res.status) {
						this.$store.commit('saveIsSelectedFamilyHolder', res.data)
					}
				})
				//上报选择的家庭
				this.$u.api.uploadSelectedFamilyApi(family).then(res => {
					if (res.status) {
						this.selectedIndex = index
					}
				})
			},
			closeMarsk() {
				this.familyObject = {}
				this.addFamily = false
			},
			closeAddUserMarsk() {
				this.userPhone = ''
				this.addUser = false
				this.userExist = false
			},

			showModifyMask(modifyData) {
				this.familyObject = modifyData
				this.modifyFamily = true
			},
			saveData() {
				this.familyObject.province = this.$store.state.positionInfo.province
				this.familyObject.city = this.$store.state.positionInfo.city
				this.familyObject.district = this.$store.state.positionInfo.district
				this.familyObject.street = this.$store.state.positionInfo.street
				this.familyObject.cityCode = this.$store.state.positionInfo.cityCode

				this.$u.api.familyAddOrUpdateApi(this.familyObject).then(res => {
					if (res.status) {
						this.loadFamilyList()
						this.familyObject = {}
						this.addFamily = false
					} else {
						this.addFamily = false
						this.$refs.uToast.show({
							title: res.message,
							type: 'warning',
							duration: 2000,
							position: 'center'
						})
					}
				})

			},
			updateData() {
				this.$u.api.familyAddOrUpdateApi(this.familyObject).then(res => {
					if (res.status) {
						this.loadFamilyList()
						this.modifyFamily = false
						this.familyObject = {}
					}
				})
			},
			/**
			 * 搜索用户，搜索到以后才能添加，否则提示用户不能添加
			 */
			doSearchUser() {
				//参数校验
				if (this.$u.test.mobile(this.userPhone)) {
					//校验不能搜索自己
					if (this.$store.state.userInfo.phone === this.userPhone) {
						this.$refs.uToast.show({
							title: '不能邀请自己',
							type: 'warning',
							duration: 1500,
							position: 'top'
						})
					} else {
						this.$u.api.searchUserByPhoneApi({
							phone: this.userPhone
						}).then(res => {
							if (!res.data) {
								this.$refs.uToast.show({
									title: '用户不存在',
									type: 'warning',
									duration: 1500,
									position: 'top'
								})
							} else {
								//用户存在立即添加
								this.$u.api.addUser2FamilyApi({
									phone: this.userPhone
								}).then(res => {
									if (res.status) {
										this.addUser = false
										this.$refs.uToast.show({
											title: '邀请信息已发送',
											type: 'success',
											duration: 1500
										})
									}

								}).catch(rr => {
									console.log('异常', rr)
								})
							}
						})
					}
				} else {
					this.$refs.uToast.show({
						title: '手机号格式错误',
						type: 'warning',
						duration: 1500,
						position: 'top'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.add-body {
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

			.family-cad-item {
				display: flex;
				align-items: center;
				padding: 20rpx;
				margin: 20rpx;
				border: dashed 1rpx #C8C9CC;
				border-radius: 20rpx;

				.card-header-box {
					width: 80%;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
				}

				.icon-box {
					width: 20%;
					display: flex;
					justify-content: flex-end;

					.icon-wrapper {
						width: 40rpx;
						height: 40rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 50%;
					}
				}
			}

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
