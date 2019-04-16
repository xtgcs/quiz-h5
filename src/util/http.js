
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