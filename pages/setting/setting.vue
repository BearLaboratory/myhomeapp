<template>
	<view class="main-container">
		<normal-header pageName="更多设置"></normal-header>
		<!-- 体 -->
		<u-cell-group>
			<!-- 有新版本时提示升级 -->
			<u-cell-item icon="info-circle-fill" title="应用信息" @click="gotoSystemInfo"></u-cell-item>
			<u-cell-item icon="server-man" title="帮助与反馈"></u-cell-item>
			<u-cell-item title="退出" @click="confirmLogoutShow=true">
				<u-icon name="../../static/icons/logout.png" slot="icon" size="34" style="margin-right: 10rpx;">
				</u-icon>
			</u-cell-item>
		</u-cell-group>
		<u-modal v-model="confirmLogoutShow" content="是否确认退出" :show-cancel-button="true"
			@cancel="confirmLogoutShow=false" @confirm="doLogOut"></u-modal>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import NormalHeader from '../../components/NormalHeader.vue'
	export default {
		components: {
			NormalHeader
		},
		data() {
			return {
				confirmLogoutShow: false
			}
		},
		methods: {
			/**
			 * 跳转系统信息页
			 */
			gotoSystemInfo() {
				uni.navigateTo({
					url: '../systeminfo/systeminfo'
				})
			},
			/**
			 * 退出系统
			 */
			doLogOut() {
				uni.clearStorageSync()
				//跳转到登录页
				uni.reLaunch({
					url: '../login/login'
				})
			}
		}
	}
</script>

<style lang="scss">
	.header-box {
		background-color: #FFFFFF;
		padding-top: 35px;
		padding-bottom: 20px;
		padding-left: 30rpx;
		padding-right: 30rpx;
		align-items: center;

		.header-info-box {
			display: flex;
			justify-content: space-between;

			.mail-box {
				display: flex;
				align-items: center;
			}

			.slogan-box {
				display: flex;
				align-items: center;
				font-size: 35rpx;
				font-weight: bold;
				color: #303030;
			}

			.setting-box {
				display: flex;
				align-items: center;
			}
		}

	}
</style>
