<template>
	<view class="main-container">
		<u-toast ref="uToast" />
		<view class="header-box-wrapper">
			<view class="header-box">
				<text>MyHome</text>
				<text
					style="margin-top: 30rpx;font-size: 30rpx;color: #C8C9CC;">{{$store.state.appInfo.versionName}}</text>
			</view>
		</view>
		<u-cell-group>
			<u-cell-item icon="order" title="版本信息" @click="gotoVersionInfo"></u-cell-item>
			<!-- <u-cell-item icon="order" title="用户协议" @click="gotoUserProtocol"></u-cell-item> -->
			<u-cell-item icon="question-circle" title="检查新版本" @click="doCheckUpdate"></u-cell-item>
		</u-cell-group>
		<!-- 版权信息 -->
		<company-info></company-info>
	</view>
</template>

<script>
	import CompanyInfo from '../../components/CompanyInfo.vue'
	export default {
		components: {
			CompanyInfo
		},
		data() {
			return {}
		},
		methods: {
			gotoVersionInfo() {
				uni.navigateTo({
					url: '../systeminfo/versioninfo'
				})
			},
			gotoUserProtocol() {
				uni.navigateTo({
					url: '../systeminfo/userprotocol'
				})
			},
			doCheckUpdate() {
				// #ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
					this.$u.api.versionCheckApi({
						oldVersion: widgetInfo.version
					}).then(res => {
						if (res.status) {
							if (res.data.haveUpdate) {
								//判断是否是大版本
								if (res.data.needWholeUpdate) {
									uni.showModal({ //提醒用户更新
										title: "更新提示",
										content: '发现最新版本，请速速更新！',
										success: (modal) => {
											if (modal.confirm) {
												if (plus.os.name == "Android") {
													console.log('====', res.data.wgtUrl)
													plus.runtime.openURL(res.data.wgtUrl)
												} else {
													console.log("ios去商店")
													this.$refs.uToast.show({
														title: '目前不支持ios系统',
														type: 'error',
														duration: 1500
													})
													//app后面可以写上你们软件的拼音~ id可以在苹果商店中分享软件链接中有~
													// id替换成你们自己应用的id
													// plus.runtime.launchApplication({
													// 	action: 'https://itunes.apple.com/cn/app/*****/id******'
													// }, function(e) {
													// 	console.log('Open system default browser failed: ' + e.message);
													// })
												}
											}
										}
									})
								} else {
									uni.showLoading({
										title: '更新下载中',
										mask: true
									})
									uni.downloadFile({
										url: res.data.wgtUrl,
										success: (downloadResult) => {
											if (downloadResult.statusCode === 200) {
												uni.hideLoading()
												uni.showModal({
													title: '安装提示',
													content: '是否立即安装更新并重启APP?',
													success: function(res) {
														if (res.confirm) {
															plus.runtime.install(
																downloadResult
																.tempFilePath, {
																	force: true
																},
																function() {
																	plus.runtime
																		.restart();
																},
																function(e) {
																	console
																		.error(
																			'安装失败...',
																			e);
																})
														}
													}
												})
											}
										}
									})
								}
							} else {
								this.$refs.uToast.show({
									title: '当前已是最新版本',
									type: 'warning',
									duration: 1500
								})
							}
						}
					})
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	.header-box-wrapper {
		height: 200px;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;

		.header-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 200rpx;

			text {
				font-weight: bold;
				font-size: 85rpx;
				color: #303133;
			}
		}
	}
</style>
