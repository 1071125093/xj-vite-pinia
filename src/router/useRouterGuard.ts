/*
 * @Author: XiaoJun
 * @Date: 2022-07-11 22:18:23
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-08-31 11:54:25
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/router/useRouterGuard.ts
 */
import { Router } from 'vue-router'
import { usePiniaSystem } from '@/store/index'
const useRouterGuard = (router: Router) => {
  router.beforeEach(async (to, from) => {
    const store = usePiniaSystem()
    if (!store?.userInfo?.userName && !['login', 'reborn'].includes(to.name as string)) {
      router.push({
        name: 'login',
      })
    }
  })
}
export default useRouterGuard
