<template>
	<view class="main-container">
		<normal-header pageName="个人信息"></normal-header>
		<u-cell-group title="基础信息">
			<u-cell-item icon="photo-fill" title="头像" @click="openSelectImg" :arrow="false">
				<u-row justify="end">
					<u-col span="6" style="display: flex;justify-content: flex-end;align-items: center;">
						<image :src="userInfo.avatar" mode="aspectFill" style="width: 50rpx;height: 50rpx;" />
					</u-col>
				</u-row>

			</u-cell-item>
			<u-cell-item icon="account-fill" title="昵称" :arrow="false">
				<u-row justify="end">
					<u-col span="6">
						<u-input height="30"
							:custom-style="{'text-align':' right','font-size':'26rpx','color':'#909399'}"
							v-model="userInfo.name" type="text" :clearable="false" maxlength="10" />
					</u-col>
				</u-row>
			</u-cell-item>
			<!-- 手机号暂时不放开修改 -->
			<u-cell-item icon="phone-fill" title="手机号" :arrow="false">
				<u-row justify="end">
					<u-col span="6">
						<u-input height="30"
							:custom-style="{'text-align':' right','font-size':'26rpx','color':'#909399'}"
							v-model="userInfo.phone" type="number" :clearable="false" :disabled="true" />
					</u-col>
				</u-row>
			</u-cell-item>
			<u-cell-item icon="email-fill" title="邮箱" :arrow="false">
				<u-row justify="end">
					<u-col span="6">
						<u-input height="30"
							:custom-style="{'text-align':' right','font-size':'26rpx','color':'#909399'}"
							v-model="userInfo.email" type="text" :clearable="false" placeholder="请填写邮箱" />
					</u-col>
				</u-row>
			</u-cell-item>
		</u-cell-group>
		<u-cell-group title="健康信息">
			<u-cell-item icon="heart-fill" title="性别" :arrow="false" @click="selectShow = true"
				:value="userInfo.sex?userInfo.sex==1?'男':'女':'请选择性别'">

			</u-cell-item>
			<u-cell-item icon="question-circle-fill" title="身高(cm)" :arrow="false">
				<u-row justify="end">
					<u-col span="6">
						<u-input height="30"
							:custom-style="{'text-align':' right','font-size':'26rpx','color':'#909399'}"
							v-model="userInfo.height" type="number" :clearable="false" placeholder="请填写身高"
							maxlength="3" />
					</u-col>
				</u-row>
			</u-cell-item>
			<u-cell-item icon="question-circle" title="体重(kg)" :arrow="false">
				<u-row justify="end">
					<u-col span="6">
						<u-input height="30"
							:custom-style="{'text-align':' right','font-size':'26rpx','color':'#909399'}"
							v-model="userInfo.weight" type="number" :clearable="false" placeholder="请填写体重"
							:cursor-spacing="80" maxlength="3" />
					</u-col>
				</u-row>
			</u-cell-item>
			<u-cell-item icon="question" title="年龄" :arrow="false">
				<u-row justify="end">
					<u-col span="6">
						<u-input height="30"
							:custom-style="{'text-align':' right','font-size':'26rpx','color':'#909399'}"
							v-model="userInfo.age" type="number" :clearable="false" placeholder="请填写年龄" maxlength="3" />
					</u-col>
				</u-row>
			</u-cell-item>
		</u-cell-group>

		<view class="update-btn-box">
			<u-button type="success" @click="doUpdateUserInfo">更新信息</u-button>
		</view>

		<!-- 选择性别 -->
		<u-select v-model="selectShow" :list="sexList" @confirm="selectConfirm" :default-value="activeIndex" />
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
				selectShow: false,
				userInfo: {},
				sexList: [{
						value: '1',
						label: '男'
					},
					{
						value: '2',
						label: '女'
					}
				]
			}
		},
		created() {
			this.userInfo = this.$store.state.userInfo
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				// 可以在此上传到服务端
				uni.uploadFile({
					url: 'http://ayilink2019.eicp.vip/frontend/file/uploadImg',
					header: {
						token: this.$store.state.loginInfo.token
					},
					filePath: path,
					name: 'file',
					complete: (res) => {
						let resObj = JSON.parse(res.data)
						if (resObj.status) {
							this.userInfo.avatar = resObj.data
						}
					}
				})
			})
		},

		computed: {
			activeIndex() {
				const activeArray = []
				for (var i = 0; i < this.sexList.length; i++) {
					if (this.sexList[i].value === this.userInfo.sex) {
						activeArray[0] = i
						return activeArray
					}
				}
			}
		},
		methods: {
			selectConfirm(e) {
				this.userInfo.sex = e[0].value
			},
			/**
			 * 更新用户信息
			 */
			doUpdateUserInfo() {
				//唯一校验手机号
				if (this.userInfo.name != '' && this.$u.test.mobile(this.userInfo.phone)) {
					this.$u.api.updateUserInfoApi(this.userInfo).then(res => {
						if (res.status) {
							this.$u.toast('更新个人信息成功')
							this.$store.commit('saveUserInfo', this.userInfo)
						}
					})
				}

			},
			openSelectImg() {
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 100,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 100,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			}
		},

	}
</script>

<style lang="scss">
	.add-box {
		background-color: #FFFFFF;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 500rpx;
		padding: 20rpx;
	}

	.update-btn-box {
		padding: 40rpx 30rpx;
	}
</style>
