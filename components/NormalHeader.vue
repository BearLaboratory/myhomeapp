<template>
	<view class="normal-header-box" :style="{'padding-top':$store.state.systemInfo.statusBarHeight+'px'}">
		<view class="header-box-wrapper">
			<view class="left-box">

			</view>
			<view class="center-box">
				<text>{{pageName}}</text>
			</view>
			<view class="right-box">

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			pageName: {
				type: String,
				require: true
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	.normal-header-box {
		background-color: #FFFFFF;

		.header-box-wrapper {
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 20rpx;

			.center-box {
				display: flex;
				align-items: center;
				font-size: 40rpx;
				font-weight: bold;
				color: #303030;
			}

		}




	}
</style>
