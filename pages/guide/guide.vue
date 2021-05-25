<template>
	<view>
		<u-swiper :list="list" :height="systemInfo.screenHeight/(systemInfo.screenWidth/750)" img-mode="aspectFit"
			:autoplay="false" :circular="false" mode="dot" @change="swiperChanged">
		</u-swiper>
		<view class="btn-box" v-show="currentIndex==2">
			<u-button @click="gotoIndex" type="success" size="medium">开启智能生活</u-button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				list: [{
					image: '../../static/guide/1.png'
				}, {
					image: '../../static/guide/2.png'
				}, {
					image: '../../static/guide/3.png'
				}],
				currentIndex: 0
			}

		},
		computed: {
			...mapState(['systemInfo'])
		},
		methods: {
			...mapMutations(['saveOpenedApp']),
			gotoIndex() {
				this.saveOpenedApp()
				uni.reLaunch({
					url: '../index/index'
				})
			},
			swiperChanged(index) {
				this.currentIndex = index
			}
		}
	}
</script>

<style lang="scss">
	.btn-box {
		position: absolute;
		top: 80%;
		left: 50%;
		transform: translate(-50%, 80%);
	}
</style>
