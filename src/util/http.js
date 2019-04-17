
import qs from 'qs'
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

