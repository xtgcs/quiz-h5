
import qs from 'qs'
import wx from 'weixin-js-sdk'
import { confirm } from "../api.js";

export const parseUrl = (url) => {
    url = url || window.location.href
    const decoder = (v) => {
      return window.decodeURIComponent(v)
    }
    let parts = url.split('?')
    let uri = parts[0]
    let [query, hash] = parts[1] ? parts[1].split('#') : ['', '']
    let params = qs.parse(query, {decoder})
  
    return {uri, hash, params}
  }


function ua() {
  return navigator.userAgent.toLowerCase()
}

export function getPlatform() {
  if (ua().indexOf('micromessenger') != -1) {
    return 'weixin'
  } else {
    return 'app'
  }
}

export function concatUri(appid, redirect_uri){
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=snsapi_userinfo&connect_redirect=1#wechat_redirect`;
}


export const requestWxInit = () => {
  let url = window.encodeURIComponent(window.location.href)
  confirm('message/share', "", {'url': window.encodeURIComponent(url) }).then(res => {
    let respoens = res.data.data

    wx.ready(() => {
      console.log('ready')
    })
    wx.error(() => {
      console.log('error')
    })
    console.log('respones', respoens)
    wx.config({
      debug: true,
      appId: respoens.appId,
      timestamp: respoens.timestamp,
      nonceStr: respoens.nonceStr,
      signature: respoens.signature,
      jsApiList: respoens.jsApiList
    })
  })
  
}


export const share = () => {
  wx.onMenuShareTimeline({
    title: '10W积分等你来战', // 分享标题
    desc: '一起来做少数派，瓜分海量积分', // 分享描述
    link: 'http://life-comment-wap.canskj.cn', // 分享链接
    imgUrl: 'http://life-comment-wap.canskj.cn/img/jc_share.jpg', // 分享图标
    type: 'link', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
      console.log("success__one")
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
  });
  wx.onMenuShareAppMessage({
    title: '10W积分等你来战', // 分享标题
    desc: '一起来做少数派，瓜分海量积分', // 分享描述
    link: 'http://life-comment-wap.canskj.cn', // 分享链接
    imgUrl: 'http://life-comment-wap.canskj.cn/img/jc_share.jpg', // 分享图标
    type: 'link', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
      console.log('success__two')
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
  });
}
