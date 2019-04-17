<template></template>

<script>
import { storage } from "../util/localstorage";
import { confirm } from "../api";
import { parseUrl } from "../util/http.js";

export default {
  created() {
    // 页面参数
    let param = parseUrl().params;
    // 地址栏没有code && 本地存储没有life_token
    if (param.code) {
      console.log("回掉到授权页面");
      confirm("weixin/callback", "", {'code': param.code, 'sys_id': 3}).then(res => {
        let respones = res.data;
				storage.setItem('access_token', respones.accessToken)
				console.log(storage.getItem('access_token'))
				// 跳转到首页
				// this.$router.push({path:'/',query:{}})
      });
    }
  }
};
</script>