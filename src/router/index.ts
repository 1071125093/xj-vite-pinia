/*
 * @Author: HuangXiaojun
 * @Date: 2022-04-01 11:09:17
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-12 14:40:29
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/router/index.ts
 */
import { createRouter, RouteRecordRaw, Router, createWebHistory } from 'vue-router'
import useRouterGuard from './useRouterGuard'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/front',
    name: 'front',
    component: () => import('@/views/front/index.vue'),
    redirect: {
      name: 'reborn',
    },
    children: [
      {
        path: 'reborn',
        name: 'reborn',
        component: () => import('@/views/front/reborn/index.vue'),
        meta: {
          title: 'reborn页面',
        },
      },
      {
        path: 'system',
        name: 'system',
        component: () => import('@/views/front/system/index.vue'),
        meta: {
          title: '系统页面',
        },
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/front/login/index.vue'),
        meta: {
          title: '登陆页面',
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/front',
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})
useRouterGuard(router)
export default router
