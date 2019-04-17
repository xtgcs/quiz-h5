import axios from 'axios'
import { storage } from "./localstorage";
import { confirm } from "../api";
import { concatUri } from "./http";

//定义fetch函数，config为配置
export const fetch = (config) => {
	//返回promise对象
	return new Promise((resolve, reject) => {
		//创建axios实例，把基本的配置放进去
		//  获取本地中的  accessToken
		const access_token = storage.getItem('access_token')
		const instance = axios.create({
			//定义请求文件类型
			headers: {
				'Content-Type': 'application/json',
				'accessToken': access_token
      },
			timeout: 3000,
			//定义请求根目录
			baseURL: 'http://life-comment-api.canskj.cn'
		});
		//请求成功后执行的函数
		instance(config).then(res => {
			// 登陆信息无效
			if (res.data.code == 100028 || res.data.code == 100024) {
				// 微信登陆, 重新授权
				confirm('weixin/info', '', {'sys_id': 3}).then(res => {
					let respones = res.data
					// //拼接微信 appid redirect_uri
					let weixinURl = concatUri(respones.data.appid,'http://life-comment-wap.canskj.cn/');
					location.replace(weixinURl)
				})
			}
			console.log(res);
			resolve(res);
			//失败后执行的函数
		}).catch(err => {
			console.log(err);
			reject(err);
		})
	});
}