/*
 * @Author: XiaoJun
 * @Date: 2022-07-11 22:18:23
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-12 00:15:06
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/router/useRouterGuard.ts
 */
import { Router } from 'vue-router'
import { getStore } from '@/store/index'
const useRouterGuard = (router: Router) => {
  router.beforeEach(async (to, from) => {
    const store = getStore('system')
    if (!store?.userInfo?.userName && to.name !== 'login') {
      router.push({
        name: 'login',
      })
    }
  })
}
export default useRouterGuard
