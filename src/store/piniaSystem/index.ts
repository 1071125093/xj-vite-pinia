/*
 * @Author: XiaoJun
 * @Date: 2022-07-11 22:19:41
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-08-29 17:27:29
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/store/system/index.ts
 */
import { defineStore } from 'pinia'
import { reactive, toRefs, computed } from 'vue'

interface State {
  userInfo: UserInfo
  count: number
  age: number
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
  })
  //#region ****** userInfo相关 start **********/
  //#endregion *** userInfo相关 end   **********/
  return {
    ...toRefs(state),
  }
})
