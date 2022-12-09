/*
 * @Author: XiaoJun
 * @Date: 2022-07-11 22:19:41
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-09 15:47:28
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/store/piniaSystem/index.ts
 */
import { defineStore } from 'pinia'
import { reactive, toRefs, computed } from 'vue'

interface State {
  userInfo: UserInfo
  count: number
  age: number
  token: string
}
interface UserInfo {
  userName: string
  password: string
}
export default defineStore('system', () => {
  const state = reactive<State>({
    userInfo: {
      userName: '',
      password: '',
    },
    count: 123,
    age: 333,
    token: '',
  })

  /** 设置登录token */
  const setToken = (token: string) => {
    state.token = `Bearer ${token}`
  }

  //#region ****** userInfo相关 start **********/
  //#endregion *** userInfo相关 end   **********/
  return {
    ...toRefs(state),
    setToken,
  }
})
