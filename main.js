import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import uView from "uview-ui"
Vue.use(uView)

import GoEasy from 'goeasy'
Vue.prototype.goEasy = GoEasy.getInstance({
	host: 'hangzhou.goeasy.io',
	appkey: "BS-0caadcc4d28449dfba6e5d50cc6e1ef8"
})

App.mpType = 'app'

import store from './store/index.js'

const app = new Vue({
	...App,
	store
})

import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()



let main = plus.android.runtimeMainActivity()
//为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台
plus.runtime.quit = function() {
	main.moveTaskToBack(false)
};
//重写toast方法如果内容为 ‘再按一次退出应用’ 就隐藏应用，其他正常toast
plus.nativeUI.toast = (function(str) {
	if (str == '再按一次退出应用') {
		main.moveTaskToBack(false);
		return false;
	} else {
		uni.showToast({
			title: '再按一次退出MyHome',
			icon: 'none',
		})
	}
});
