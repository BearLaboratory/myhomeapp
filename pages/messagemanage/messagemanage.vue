<template>
	<view class="main-container">
		<normal-header pageName="消息"></normal-header>
		<view class="message-item" @click="gotoMessageDetail(message)" v-for="message in messageList" :key="message.id">
			<view class="item-header-box">
				<u-tag :text="message.hasRead?'已读':'未读'" :type="message.hasRead?'info':'warning'" size="mini" shape="circle" />
			</view>
			<view class="item-body-box">
				<text>【{{message.fromUserName}}】邀请您加入 【{{message.familyName}}】</text>
			</view>
			<view class="item-bottom-box">
				<text style="font-size: 20rpx;">{{message.createTime}}</text>
			</view>
		</view>
		<!-- 无数据提示 -->
		<u-empty text="暂无消息" mode="data" v-if="messageList.length==0" class="empty-class"></u-empty>

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
				messageList: []
			}
		},
		onShow() {
			this.loadMessage()
		},
		methods: {
			loadMessage() {
				this.$u.api.getAllMessageApi().then(res => {
					if (res.status) {
						this.messageList = res.data
					}
				})
			},
			/**
			 * 读取信息后跳转详情页
			 * @param {Object} messageData
			 */
			gotoMessageDetail(messageData) {
				if (messageData.hasRead) {
					uni.navigateTo({
						url: './messagedetail?id=' + messageData.id + '&hasRead=' + messageData.hasRead + '&type=' + messageData.type +
							'&createTime=' + messageData.createTime + '&familyName=' + messageData.familyName + '&fromUserName=' +
							messageData.fromUserName
					})
				} else {
					this.$u.api.readMessageApi({
						messageId: messageData.id
					}).then(res => {
						if (res.status) {
							uni.navigateTo({
								url: './messagedetail?id=' + messageData.id + '&hasRead=' + messageData.hasRead + '&type=' + messageData.type +
									'&createTime=' + messageData.createTime + '&familyName=' + messageData.familyName + '&fromUserName=' +
									messageData.fromUserName
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.message-item {
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		border-radius: 20rpx;

		.item-header-box {
			display: flex;
			justify-content: flex-end;
		}

		.item-body-box {
			color: #303030;
		}

		.item-bottom-box {
			margin-top: 20rpx;
		}
	}

	.empty-class {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
