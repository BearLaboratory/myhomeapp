import {
	getToken
} from 'utils/usertoken.js'
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://ayilink2019.eicp.vip/',
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		const token = getToken();
		config.header.token = token;
		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.status) {
			return res;
		} else {
			return res;
		}
	}
}

export default {
	install
}
