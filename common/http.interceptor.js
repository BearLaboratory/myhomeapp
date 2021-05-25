const install = (Vue, vm) => {
	//本地开发环境时自行修改
	if (process.env.NODE_ENV === 'development') {
		Vue.prototype.$u.http.setConfig({
			baseUrl: 'http://ayilink2019.eicp.vip',
		})
	} else {
		Vue.prototype.$u.http.setConfig({
			baseUrl: 'https://myhomeapi.dengyi.pro',
		})
	}
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		if (!vm.$store.state.netWork.connect) {
			return vm.$u.toast('请连接网络')
		} else {
			config.header.token = vm.$store.state.token;
			return config;
		}

	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.status) {
			return res
		} else {
			//登录过期需要重新登录
			if (res.code == 11008) {
				vm.$u.route('/pages/login/login')
			} else {
				return res
			}
		}
	}
}

export default {
	install
}
