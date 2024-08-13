import { defineStore } from 'pinia'
import utils from '@/utils/utils'
import http from '@/api/user'
import yunpanMenu from "../model/menu"

const userInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      userInfo: {},
      menuList: [],
      whiteList: [],
    }
  },
  getters: {

  },
  actions: {
    getUserInfo() {
      this.setMenuList(yunpanMenu)
      http.userInfo().then(res => {
        this.userInfo = res.data
        this.setMenuList(yunpanMenu)
      })
    },
    setMenuList(menuList) {
      this.menuList = menuList
      this.whiteList = utils.flatten(this.menuList)
    },
    clearInfo() {
      this.userInfo = {}
      this.whiteList = []
      this.menuList = []
    },
  },
  persist: {
    enabled: true, // 开启缓存  默认会存储在本地localstorage
    storage: sessionStorage, // 缓存使用方式
    paths:[] // 需要缓存键 
  }
})

export default userInfoStore