// 兼容隐私模式localStorage == null
export class LocalStorage {
    constructor () {
      //
      this.support = true
      this.detect()
    }
    detect () {
      try {
        window.localStorage.setItem('_detect_support', 1)
        window.localStorage.removeItem('_detect_support')
      } catch (e) {
        this.support = false
        window.alert('请退出浏览器隐私模式')
      }
    }
    getItem (itemKey) {
      let itemValue = ''
      if (this.support) {
        itemValue = window.localStorage.getItem(itemKey)
      } else if (this[itemKey] === undefined) {
        itemValue = null
      } else {
        itemValue = this[itemKey]
      }
      try {
        itemValue = window.JSON.parse(itemValue)
      } catch (e) {
        // eslint-disable-next-line
      }
  
      return itemValue
    }
    setItem (itemKey, itemValue) {
      if (itemValue === undefined) {
        itemValue = null
      }
      if (this.support) {
        if (typeof itemValue === 'object') {
          itemValue = window.JSON.stringify(itemValue)
        }
        window.localStorage.setItem(itemKey, itemValue)
      } else {
        this[itemKey] = itemValue
      }
      return itemValue
    }
    removeItem (itemKey) {
      let v = this[itemKey]
      if (this.support) {
        window.localStorage.removeItem(itemKey)
      } else {
        delete this[itemKey]
      }
      return v
    }
    clear () {
      if (this.support) {
        window.localStorage.clear()
      } else {
        Object.keys(this).map((itemKey) => {
          delete this[itemKey]
        })
      }
    }
  }
//   实例化
  export const storage = new LocalStorage()
  