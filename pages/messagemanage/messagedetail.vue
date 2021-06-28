<template>
	<view class="main-container">
		<normal-header pageName="消息详情"></normal-header>
		<view
			style="padding: 20rpx;background-color: #FFFFFF;margin-top: 30rpx;margin-left: 30rpx;margin-right: 30rpx;">
			<view style="padding: 20rpx;">
				<text>{{message.content}}</text>
			</view>

			<view style="padding: 30rpx;" v-if="message.type==1">
				<u-button type="success" @click="comfirmJoinFamily">同意加入</u-button>
			</view>
		</view>

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
				message: {}
			}
		},
		onLoad(param) {
			this.message = param
			this.doLoadMessage()
		},
		methods: {
			doLoadMessage() {
				this.$u.api.getMessageByIdApi({
					messageId: this.message.id
				}).then(res => {
					this.message = res.data
				})
			},
			comfirmJoinFamily() {
				this.$u.api.confirmJoinApi({
					messageId: this.message.id
				}).then(res => {
					console.log(res)
					if (res.status) {
						this.message.hasRead = 'true'

					}
				})

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
	}
</style>
