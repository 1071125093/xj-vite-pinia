/*
 * @Author: XiaoJun
 * @Date: 2022-07-11 22:18:23
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-08 19:24:01
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/router/useRouterGuard.ts
 */
import { Router } from 'vue-router'
import { piniaSystem } from '@/store'
const useRouterGuard = (router: Router) => {
  router.beforeEach(async (to, from) => {
    if (!piniaSystem?.userInfo?.userName && !['login', 'reborn'].includes(to.name as string)) {
      router.push({
        name: 'login',
      })
    }
  })
}
export default useRouterGuard
